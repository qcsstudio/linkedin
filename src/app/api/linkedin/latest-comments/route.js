import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const dataArray = body?.organizations?.data; // Note: Typo fix if needed (organizations vs organiztions)

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Process organization URNs
    const organizations = dataArray
      .filter((item) => item.organizationalTarget?.includes("urn:li:organization:"))
      .map((item) => ({
        orgUrn: item.organizationalTarget,
        orgId: item.organizationalTarget.split(":").pop(),
        token: item.token,
      }));

    let allComments = [];

    // Fetch posts and comments for each organization
    for (const { orgUrn, orgId, token } of organizations) {
      const headers = { Authorization: `Bearer ${token}` };

      try {
        // Fetch recent posts (sorted by last modification time)
        const postsRes = await fetch(
          `https://api.linkedin.com/v2/shares?q=owners&owners=${orgUrn}&sortBy=LAST_MODIFIED&sharesPerOwner=10`, // Increased to 10 posts
          { headers }
        );

        if (!postsRes.ok) {
          console.warn(`Failed to fetch posts for ${orgUrn}: ${postsRes.status}`);
          continue;
        }

        const postsData = await postsRes.json();

        // Process each post
        for (const post of postsData.elements || []) {
          const activityUrn = post.activity;
          if (!activityUrn) continue;

          let commentStart = 0;
          const commentCount = 100; // Max per request
          let hasMoreComments = true;

          // Paginate through all comments
          while (hasMoreComments) {
            const commentsUrl = `https://api.linkedin.com/v2/socialActions/${activityUrn}/comments?start=${commentStart}&count=${commentCount}`;
            const commentsRes = await fetch(commentsUrl, { headers });

            if (!commentsRes.ok) {
              console.warn(`Failed to fetch comments for ${activityUrn}: ${commentsRes.status}`);
              break;
            }

            const commentsData = await commentsRes.json();

            // Store comments with timestamp
            for (const comment of commentsData.elements || []) {
              allComments.push({
                orgId,
                postId: post.urn,
                comment: comment,
                createdAt: comment.created?.time || Date.now(),
              });
            }

            // Check for more comments
            const nextLink = commentsData.paging?.links?.find(
              (link) => link.rel === "next"
            );
            hasMoreComments = !!nextLink;
            if (nextLink) {
              const url = new URL(nextLink.href);
              commentStart = Number(url.searchParams.get("start")) || commentStart + commentCount;
            }
          }
        }
      } catch (error) {
        console.error(`Error processing organization ${orgId}:`, error);
      }
    }

    // Sort all comments by creation time (newest first)
    allComments.sort((a, b) => b.createdAt - a.createdAt);

    return NextResponse.json({ 
      total: allComments.length,
      comments: allComments,
    });
  } catch (error) {
    console.error("Global error handler:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}