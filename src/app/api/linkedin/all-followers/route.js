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

    // We'll store each organization's stats + track grand totals
    const allResults = [];
    let grandTotalOrganic = 0;
    let grandTotalPaid = 0;

    // Daily aggregator for combined follower gains
    const dailyTotals = {};

    // 2. Loop over each organization
    console.log(" ============================================================================================ ")
    for (const org of organizations) {
      console.log("All organization in Followers",org);
      const {uniqueId, accessToken } = org;

      if (!uniqueId || !accessToken) {
        allResults.push({
          status: "error",
          organizationId: uniqueId || "unknown",
          error: "Missing ID or token",
        });
        continue;
      }

      // 3. Prepare headers and build the LinkedIn API URL
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "LinkedIn-Version": "202411", // required version for REST
      };
      const orgUrn = `urn:li:organization:${uniqueId}`;

      // Endpoint for follower statistics:
      const followersUrl = `https://api.linkedin.com/rest/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=${orgUrn}&timeIntervals.timeRange.start=${start}&timeIntervals.timeRange.end=${end}`;

      try {
        // 4. Fetch the organization's follower statistics
        const followersRes = await fetch(followersUrl, { headers });
        if (!followersRes.ok) {
          throw new Error(
            `Failed to fetch followers for org ${uniqueId}. Status: ${followersRes.status}`
          );
        }

        const followersData = await followersRes.json();
        const elements = followersData?.elements || [];

        // 5. Summation logic for organic and paid followers
        let orgTotalOrganic = 0;
        let orgTotalPaid = 0;

        elements.forEach((stat) => {
          const organic = stat?.followerGains?.organicFollowerGain || 0;
          const paid = stat?.followerGains?.paidFollowerGain || 0;
          
          orgTotalOrganic += organic;
          orgTotalPaid += paid;

          // Track daily totals
          const dateMs = stat?.timeRange?.start;
          if (dateMs) {
            const date = new Date(dateMs).toISOString().split('T')[0];
            
            if (!dailyTotals[date]) {
              dailyTotals[date] = { organic: 0, paid: 0 };
            }
            
            dailyTotals[date].organic += organic;
            dailyTotals[date].paid += paid;
          }
        });

        // Add to grand totals
        grandTotalOrganic += orgTotalOrganic;
        grandTotalPaid += orgTotalPaid;

        // 6. Push the org-specific result
        allResults.push({
          status: "success",
          organizationId: uniqueId,
          totalOrganic: orgTotalOrganic,
          totalPaid: orgTotalPaid,
          totalFollowers: orgTotalOrganic + orgTotalPaid,
          rawData: followersData // optional
        });
      } catch (orgError) {
        console.error(`Error fetching followers for org ${uniqueId}:`, orgError);
        allResults.push({
          status: "error",
          organizationId: uniqueId,
          error: orgError.message,
        });
      }
    }

    // Convert dailyTotals object into a sorted array
    const combinedDailyFollowers = Object.entries(dailyTotals)
      .map(([date, { organic, paid }]) => ({ 
        date, 
        organic,
        paid,
        total: organic + paid 
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // 7. Return the results with aggregated data
    return Response.json(
      {
        totalOrganicAllOrgs: grandTotalOrganic,
        totalPaidAllOrgs: grandTotalPaid,
        totalFollowersAllOrgs: grandTotalOrganic + grandTotalPaid,
        dailyCombinedFollowers: combinedDailyFollowers,
        data: allResults,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API route error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}