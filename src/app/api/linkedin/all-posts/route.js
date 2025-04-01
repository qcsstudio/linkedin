// pages/api/linkedin/posts.js

export async function POST(req, res) {
  const body = await req.json();
  const { id, token } = body;

  if (!id || !token) {
    return Response.json({ error: "Missing id or token" }, {status:400});
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "X-Restli-Protocol-Version": "2.0.0",
  };

  try {
    const postsRes = await fetch(
      `https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:${id}&sortBy=LAST_MODIFIED&sharesPerOwner=100`,
      { headers }
    );
    const postData = await postsRes.json();
    const posts = postData.elements || [];

    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const activityUrn = post.activity; 
        const commentsRes = await fetch(
          `https://api.linkedin.com/v2/socialActions/${activityUrn}/comments`,
          { headers }
        );
        const commentsData = await commentsRes.json();
        return {
          ...post,
          comments: commentsData.elements || [],
        };
      })
    );

    return Response.json(postsWithComments,{status:200});
  } catch (error) {
    console.error("LinkedIn API Error:", error);
    return   Response.json({ error: "Failed to fetch LinkedIn posts" },);
  }
}
