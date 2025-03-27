// src/app/api/linkedin/linkedin-followers/route.js

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");
  
    const accessToken = "AQUiuxOcGlVFGu_0lbZ68YyBg_3cpM6dvrzU4fY-cuzpCZHwMu6P9XJg0VAGnoY4zwXcl5iWwA9Co3sGoSyhx9hqTsPGT9daWWV8AdscgRSUgNO3Y9-27DNcGzWgvu8C_FyVkLSTluIgOAL6NmWX7ga0-CwQq6BPqi07SbmYyHxcxGp-9dupUO8D9haLkzStT6VEMMYumgzyiVSEickWav_JcsFVouDcpUP24tURBXygqVrqqPeEIYZGaMqPhvFrdQ7_O93ccc2uHz3javYUBrFcgEY8vRpqHktu1CwFpEtxiMQ6ZDx09dWf2g1oyqEJ8sy0rRrW7UT8JNLfKIoz4Od2qMjZAA"; 
    const orgId = "13740206";
  
    const url = `https://api.linkedin.com/rest/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${orgId}&timeIntervals.timeGranularityType=DAY&timeIntervals.timeRange.start=${start}&timeIntervals.timeRange.end=${end}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "LinkedIn-Version": "202411",
        },
        cache: "no-store", // optional: avoid caching in dev
      });
  
      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch from LinkedIn API" }),
          { status: response.status }
        );
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("LinkedIn API error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
      });
    }
  }
  