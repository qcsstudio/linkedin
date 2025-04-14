export async function POST(req) {
    try {
      const body = await req.json();
      const organizations = body.organizations;
      const start = body.start || Date.now() - 7 * 24 * 60 * 60 * 1000; // default: last 7 days
      const end = body.end || Date.now();
  
      if (!Array.isArray(organizations) || organizations.length === 0) {
        return Response.json({ error: "Missing organization data" }, { status: 400 });
      }
  
      const allResults = [];
  
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
  
        const headers = {
          Authorization: `Bearer ${token}`,
          'LinkedIn-Version': '202411', // required for REST API
        };
  
        try {
          // Fetch latest 2 posts
          const postsRes = await fetch(
            `https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:${orgId}&count=2&sortBy=LAST_MODIFIED`,
            { headers }
          );
  
          if (!postsRes.ok) {
            throw new Error(`Failed to fetch posts for org ${orgId}`);
          }
  
          const postData = await postsRes.json();
          const posts = postData.elements || [];
  
          const enrichedPosts = [];
  
          for (const post of posts) {
            const activityUrn = post.activity;
            const shareId = post.urn?.split(":").pop();
  
            // Fetch comments
            const commentsRes = await fetch(
              `https://api.linkedin.com/v2/socialActions/${activityUrn}/comments`,
              { headers }
            );
            const commentsData = await commentsRes.json();
  
            // Fetch analytics using REST API with time range
            let analytics = {};
            const orgUrn = `urn:li:organization:${orgId}`;
            const statsUrl = `https://api.linkedin.com/rest/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${orgUrn}`;
  
            const analyticsRes = await fetch(statsUrl, { headers });
            const analyticsData = await analyticsRes.json();
            analytics = analyticsData.elements || [];
  
            enrichedPosts.push({
              organizationId: orgId,
              ...post,
              comments: commentsData.elements || [],
              analytics,
            });
          }
  
          allResults.push({
            status: "success",
            organizationId: orgId,
            posts: enrichedPosts,
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
  
      return Response.json({ data: allResults }, { status: 200 });
  
    } catch (error) {
      console.error("API route error:", error);
      return Response.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  