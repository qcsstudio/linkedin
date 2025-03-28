export async function GET(req) {
    const LINKEDIN_API_URL = 'https://api.linkedin.com/rest/organizationalEntityShareStatistics';
    const ORGANIZATION_URN = 'urn:li:organization:13740206';
  
    // ⛔️ Replace with environment variable in production
    const ACCESS_TOKEN = 'AQUiuxOcGlVFGu_0lbZ68YyBg_3cpM6dvrzU4fY-cuzpCZHwMu6P9XJg0VAGnoY4zwXcl5iWwA9Co3sGoSyhx9hqTsPGT9daWWV8AdscgRSUgNO3Y9-27DNcGzWgvu8C_FyVkLSTluIgOAL6NmWX7ga0-CwQq6BPqi07SbmYyHxcxGp-9dupUO8D9haLkzStT6VEMMYumgzyiVSEickWav_JcsFVouDcpUP24tURBXygqVrqqPeEIYZGaMqPhvFrdQ7_O93ccc2uHz3javYUBrFcgEY8vRpqHktu1CwFpEtxiMQ6ZDx09dWf2g1oyqEJ8sy0rRrW7UT8JNLfKIoz4Od2qMjZAA';
  
    const getPercentageChange = (current, previous) => {
      if (previous === 0) return current === 0 ? 0 : 100;
      return ((current - previous) / previous) * 100;
    };
  
    const summarizeStats = (elements = []) => {
      return elements.reduce(
        (acc, el) => {
          const stats = el.totalShareStatistics || {};
          acc.impressions += stats.impressionCount || 0;
          acc.likes += stats.likeCount || 0;
          acc.clicks += stats.clickCount || 0;
          acc.engagement += stats.engagement || 0;
          acc.comments += stats.commentCount || 0;
          acc.uniqueImpressions += stats.uniqueImpressionsCount || 0;
          return acc;
        },
        {
          impressions: 0,
          likes: 0,
          clicks: 0,
          engagement: 0,
          comments: 0,
          uniqueImpressions: 0,
        }
      );
    };
  
    const now = new Date();
  
    // Current month: 1st to end of this month
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();
  
    // Previous month: 1st to end of last month
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).getTime();
  
    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': '202411',
    };
  
    // Correct LinkedIn format for timeIntervals (must be encoded)
    const buildURL = (start, end) => {
      const encodedTime = encodeURIComponent(
        `(timeRange:(start:${start},end:${end}),timeGranularityType:DAY)`
      );
      return `${LINKEDIN_API_URL}?q=organizationalEntity&organizationalEntity=${ORGANIZATION_URN}&timeIntervals=${encodedTime}`;
    };
  
    try {
      const [prevRes, currRes] = await Promise.all([
        fetch(buildURL(previousMonthStart, previousMonthEnd), { headers }),
        fetch(buildURL(currentMonthStart, currentMonthEnd), { headers })
      ]);
  
      const prevData = await prevRes.json();
      const currData = await currRes.json();
  
      if (!prevData.elements || !currData.elements) {
        return Response.json({
          error: 'Invalid LinkedIn API response',
          prevRaw: prevData,
          currRaw: currData,
        }, { status: 500 });
      }
  
      const prevStats = summarizeStats(prevData.elements);
      const currStats = summarizeStats(currData.elements);
  
      const growth = {
        impressions: `${getPercentageChange(currStats.impressions, prevStats.impressions).toFixed(2)}%`,
        uniqueImpressions: `${getPercentageChange(currStats.uniqueImpressions, prevStats.uniqueImpressions).toFixed(2)}%`,
        likes: `${getPercentageChange(currStats.likes, prevStats.likes).toFixed(2)}%`,
        clicks: `${getPercentageChange(currStats.clicks, prevStats.clicks).toFixed(2)}%`,
        engagement: `${getPercentageChange(currStats.engagement, prevStats.engagement).toFixed(2)}%`,
        comments: `${getPercentageChange(currStats.comments, prevStats.comments).toFixed(2)}%`
      };
  
      return Response.json({
        previousMonth: prevStats,
        currentMonth: currStats,
        growth,
        currentMonthRaw: currData.elements,
        previousMonthRaw: prevData.elements
      }, { status: 200 });
  
    } catch (error) {
      return Response.json({
        error: 'Failed to fetch LinkedIn data',
        message: error.message
      }, { status: 500 });
    }
  }
  