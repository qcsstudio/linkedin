export async function GET(request, { params }) {
    try {
      const { slug } = params;
  
      if (!slug) {
        return Response.json(
          { message: "Organization ID is required" },
          { status: 400 }
        );
      }
  
      const authHeader = request.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Response.json(
          { message: "Authorization token required" },
          { status: 401 }
        );
      }
  
      const token = authHeader.split(" ")[1];
  
      const ORG_URN = `urn:li:organization:${slug}`;
      const now = Date.now();
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  
      // API Endpoints
      const analyticsURL = `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${ORG_URN}`;
  
      const followersURL = `https://api.linkedin.com/v2/networkSizes/${ORG_URN}?edgeType=CompanyFollowedByMember`;
  
      const pageViewsURL = `https://api.linkedin.com/rest/organizationPageStatistics?q=organization&organization=${ORG_URN}`;
  
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "LinkedIn-Version": "202411",
      };
  
      const [analyticsResponse, followersResponse, pageViewsResponse] =
        await Promise.all([
          fetch(analyticsURL, { method: "GET", headers }),
          fetch(followersURL, { method: "GET", headers }),
          fetch(pageViewsURL, { method: "GET", headers }),
        ]);
  
      if (
        !analyticsResponse.ok ||
        !followersResponse.ok ||
        !pageViewsResponse.ok
      ) {
        const errorData = {
          analyticsError: !analyticsResponse.ok
            ? await analyticsResponse.json()
            : null,
          followersError: !followersResponse.ok
            ? await followersResponse.json()
            : null,
          pageViewsError: !pageViewsResponse.ok
            ? await pageViewsResponse.json()
            : null,
        };
        throw new Error(`LinkedIn API error: ${JSON.stringify(errorData)}`);
      }
  
      const analyticData = await analyticsResponse.json();
      const followersData = await followersResponse.json();
      const pageViewsData = await pageViewsResponse.json();
  
      // Total follower count
      const totalFollowers = followersData?.firstDegreeSize || 0;
  
      // Aggregate total page views from the last 30 days
      const totalPageViews = pageViewsData.elements.reduce((sum, day) => {
        return sum + (day.totalPageStatistics?.views?.allPageViews?.pageViews || 0);
      }, 0);
  
      return Response.json(
        {
          analyticsData: analyticData,
          followers: totalFollowers,
          totalPageViews: totalPageViews,
          message: "Organization analytics, followers, and views fetched successfully",
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("LinkedIn API error /linkedin/analytics:", error);
      return Response.json(
        {
          message: "Unable to fetch analytics, followers, or page views",
          error: error.message,
        },
        { status: 500 }
      );
    }
  }
  