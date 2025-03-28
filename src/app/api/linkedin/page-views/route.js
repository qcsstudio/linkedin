export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const { token, id } = await req.json(); // <-- Get dynamic values from request

  const orgUrn = `urn:li:organization:${id}`;

  const apiUrl = `https://api.linkedin.com/rest/organizationPageStatistics?q=organization&organization=${orgUrn}&timeIntervals.timeGranularityType=DAY&timeIntervals.timeRange.start=${start}&timeIntervals.timeRange.end=${end}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "LinkedIn-Version": "202411",
      },
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch LinkedIn page views" }),
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error("LinkedIn API error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
