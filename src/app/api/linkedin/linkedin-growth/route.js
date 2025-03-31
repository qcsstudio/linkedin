import axios from 'axios';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, token } = body;

    if (!id || !token) {
      return Response.json({ error: 'Missing organization ID or token' }, { status: 400 });
    }

    const LINKEDIN_ORG_URN = `urn:li:organization:${id}`;
    const ACCESS_TOKEN = token;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const thirtyDays = 30 * oneDay;

    const timeRanges = {
      current: {
        start: now - thirtyDays,
        end: now,
      },
      previous: {
        start: now - 2 * thirtyDays,
        end: now - thirtyDays,
      },
    };

    const fetchShareStats = async ({ start, end }) => {
      const url = `https://api.linkedin.com/rest/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${LINKEDIN_ORG_URN}&timeIntervals.timeGranularityType=DAY&timeIntervals.timeRange.start=${start}&timeIntervals.timeRange.end=${end}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'LinkedIn-Version': '202411',
        },
      });

      const stats = response.data.elements;
      return stats.reduce((acc, day) => {
        const metrics = day.totalShareStatistics;
        for (let key in metrics) {
          acc[key] = (acc[key] || 0) + metrics[key];
        }
        return acc;
      }, {});
    };

    const fetchFollowerStats = async ({ start, end }) => {
      const url = `https://api.linkedin.com/rest/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=${LINKEDIN_ORG_URN}&timeIntervals.timeGranularityType=DAY&timeIntervals.timeRange.start=${start}&timeIntervals.timeRange.end=${end}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'LinkedIn-Version': '202411',
        },
      });

      const stats = response.data.elements;
      return stats.reduce((acc, day) => {
        const { followerGains } = day;
        const organic = followerGains?.organicFollowerGain || 0;
        const paid = followerGains?.paidFollowerGain || 0;
        acc.organicFollowerGain = (acc.organicFollowerGain || 0) + organic;
        acc.paidFollowerGain = (acc.paidFollowerGain || 0) + paid;
        acc.followerGain = (acc.followerGain || 0) + organic + paid;
        return acc;
      }, {});
    };

    const fetchPageViewStats = async ({ start, end }) => {
      const url = `https://api.linkedin.com/rest/organizationPageStatistics?q=organization&organization=${LINKEDIN_ORG_URN}&timeIntervals.timeGranularityType=DAY&timeIntervals.timeRange.start=${start}&timeIntervals.timeRange.end=${end}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          'LinkedIn-Version': '202411',
        },
      });

      const stats = response.data.elements;
      return stats.reduce((acc, day) => {
        const views = day.totalPageStatistics?.views?.allPageViews?.pageViews || 0;
        acc.pageViews = (acc.pageViews || 0) + views;
        return acc;
      }, {});
    };

    const [
      currentShareStats,
      previousShareStats,
      currentFollowerStats,
      previousFollowerStats,
      currentPageViews,
      previousPageViews
    ] = await Promise.all([
      fetchShareStats(timeRanges.current),
      fetchShareStats(timeRanges.previous),
      fetchFollowerStats(timeRanges.current),
      fetchFollowerStats(timeRanges.previous),
      fetchPageViewStats(timeRanges.current),
      fetchPageViewStats(timeRanges.previous),
    ]);

    const calculateDetailedGrowth = (key, currentStats, previousStats) => {
      const current = currentStats[key] || 0;
      const previous = previousStats[key] || 0;

      let growth = '0%';
      if (previous === 0 && current > 0) {
        growth = '+100%';
      } else if (previous > 0) {
        const change = ((current - previous) / previous) * 100;
        const sign = change >= 0 ? '+' : '';
        growth = `${sign}${change.toFixed(2)}%`;
      }

      return { current, previous, growth };
    };

    const shareKeys = [
      'uniqueImpressionsCount',
      'shareCount',
      'engagement',
      'clickCount',
      'likeCount',
      'impressionCount',
      'commentCount',
    ];

    const followerKeys = [
      'followerGain',
      'organicFollowerGain',
      'paidFollowerGain',
    ];

    const growthObject = {};

    shareKeys.forEach((key) => {
      growthObject[key] = calculateDetailedGrowth(key, currentShareStats, previousShareStats);
    });

    followerKeys.forEach((key) => {
      growthObject[key] = calculateDetailedGrowth(key, currentFollowerStats, previousFollowerStats);
    });

    growthObject.pageViews = calculateDetailedGrowth('pageViews', currentPageViews, previousPageViews);

    return Response.json(growthObject, { status: 200 });
  } catch (error) {
    console.error('LinkedIn growth API error:', error.response?.data || error.message);
    return Response.json(
      { error: 'Failed to fetch or process LinkedIn statistics.' },
      { status: 500 }
    );
  }
}
