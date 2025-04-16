export async function POST(req) {
  try {
    // 1. Parse request body
    const body = await req.json();
    const organizations = body.organizations;
    const start = body.start || Date.now() - 7 * 24 * 60 * 60 * 1000; // default: last 7 days
    const end = body.end || Date.now();

    if (!Array.isArray(organizations) || organizations.length === 0) {
      return Response.json(
        { error: "Missing organization data" },
        { status: 400 }
      );
    }

    // We'll store each organization's stats + track a grand total
    const allResults = [];
    let grandTotalViews = 0;

    // New: daily totals aggregator
    // Structure: { "YYYY-MM-DD": sumOfViewsAcrossAllOrgsForThisDate, ... }
    const dailyTotals = {};

    // 2. Loop over each organization
    for (const org of organizations) {
      const { id: orgId, token } = org;

      if (!orgId || !token) {
        allResults.push({
          status: "error",
          organizationId: orgId || "unknown",
          error: "Missing ID or token",
        });
        continue;
      }

      // 3. Prepare headers and build the LinkedIn API URL
      const headers = {
        Authorization: `Bearer ${token}`,
        "LinkedIn-Version": "202411", // required version for REST
      };
      const orgUrn = `urn:li:organization:${orgId}`;

      // Endpoint for page views:
      const pageViewsUrl = `https://api.linkedin.com/rest/organizationPageStatistics?q=organization&organization=${orgUrn}&timeIntervals.timeGranularityType=DAY&timeIntervals.timeRange.start=${start}&timeIntervals.timeRange.end=${end}`;

      try {
        // 4. Fetch the organization’s page view statistics
        const pageViewsRes = await fetch(pageViewsUrl, { headers });
        if (!pageViewsRes.ok) {
          throw new Error(
            `Failed to fetch page views for org ${orgId}. Status: ${pageViewsRes.status}`
          );
        }

        const pageViewsData = await pageViewsRes.json();
        const elements = pageViewsData?.elements || [];

        // 5. Summation logic
        let orgTotalViews = 0;

        elements.forEach((dayStat) => {
          // The actual field is in dayStat.totalPageStatistics.views.allPageViews.pageViews
          // Adjust if you want a different subfield or sum of all subfields
          const views = dayStat?.totalPageStatistics?.views?.allPageViews?.pageViews || 0;
          orgTotalViews += views;

          // Identify the date associated with this "dayStat".
          // LinkedIn often provides a timeRange.start for each day. Adjust as needed.
          const dateMs = dayStat?.timeRange?.start;
          if (dateMs) {
            // Convert to a "YYYY-MM-DD" string, or whatever format you prefer
            const date = new Date(dateMs).toISOString().split("T")[0];

            // Update dailyTotals aggregator
            dailyTotals[date] = (dailyTotals[date] || 0) + views;
          }
        });

        // Add to the grand total
        grandTotalViews += orgTotalViews;

        // 6. Push the org-specific result
        allResults.push({
          status: "success",
          organizationId: orgId,
          totalViews: orgTotalViews,
          rawData: pageViewsData, // optional
        });
      } catch (orgError) {
        console.error(`Error fetching data for org ${orgId}:`, orgError);
        allResults.push({
          status: "error",
          organizationId: orgId,
          error: orgError.message,
        });
      }
    }

    // Convert dailyTotals object into a sorted array of { date, views } if you’d like
    const combinedDailyViews = Object.entries(dailyTotals)
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // 7. Return the per-org results + aggregated totals
    return Response.json(
      {
        totalViewsAllOrgs: grandTotalViews,     // Grand total across all orgs
        dailyCombinedViews: combinedDailyViews, // Summed daily time series
        data: allResults,                       // Per-organization breakdown
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API route error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
