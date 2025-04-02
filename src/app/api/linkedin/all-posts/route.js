// pages/api/linkedin/posts.js
export async function POST(req) {
  const body = await req.json();
  const { id, token, start = 0, count = 10 } = body;

  if (!id || !token) {
    return Response.json({ error: "Missing id or token" }, { status: 400 });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const postsRes = await fetch(
      `https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:${id}&count=${count}&start=${start}`,
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

    return Response.json(postsWithComments, { status: 200 });
  } catch (error) {
    console.error("LinkedIn API Error:", error);
    return Response.json({ error: "Failed to fetch LinkedIn posts" });
  }
}
