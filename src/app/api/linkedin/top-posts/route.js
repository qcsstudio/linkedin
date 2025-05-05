// app/api/linkedin/top-posts/route.js

import axios from 'axios';

export async function POST(req) {
  const body = await req.json();
  const { organizations } = body;

  if (!organizations || !Array.isArray(organizations)) {
    return new Response(JSON.stringify({ message: 'Invalid request body. Provide `organizations` array.' }), {
      status: 400,
    });
  }

  const allPosts = [];
  const now = Date.now();
  const threeMonthsAgo = now - 90 * 24 * 60 * 60 * 1000;
  console.log("================================================================================================")
  for (const org of organizations) {

    console.log("Organization from TOP POST :",org);
    const uniqueId = org?.uniqueId;
    const accessTokenData = org?.accessToken;
    const orgUrn = `urn:li:organization:${uniqueId}`;
    const accessToken = accessTokenData;

    const getHeaders = () => ({
      Authorization: `Bearer ${accessToken}`
    });

    let start = 0;
    let hasMore = true;

    while (hasMore) {
      try {
        const sharesUrl = `https://api.linkedin.com/v2/shares?q=owners&owners=${orgUrn}&count=50&start=${start}`;
        const shareRes = await axios.get(sharesUrl, { headers: getHeaders() });

        const elements = shareRes.data.elements;

        // Filter out posts older than 3 months
        const recentElements = elements.filter(post => post.created?.time > threeMonthsAgo);

        // If all posts in this batch are older, stop pagination
        if (recentElements.length === 0) break;

        const shareIds = recentElements.map(el => el.id);
        if (shareIds.length === 0) break;

        const statsParams = shareIds.map(id => `shares=urn:li:share:${id}`).join('&');
        const statsUrl = `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${orgUrn}&${statsParams}`;

        const statsRes = await axios.get(statsUrl, { headers: getHeaders() });

        for (let i = 0; i < recentElements.length; i++) {
          const post = recentElements[i];
          const stat = statsRes.data.elements.find(e => e.share.endsWith(post.id));
          if (!stat) continue;

          const s = stat.totalShareStatistics;
          const impressions = s.impressionCount || 1;

          const engagementNumerator = s.clickCount + s.likeCount + s.commentCount + s.shareCount;
          const engagementRate = parseFloat(((engagementNumerator / impressions) * 100).toFixed(2));

          const score = (
            (s.engagement * 0.4 +
              (s.clickCount / impressions) * 0.3 +
              ((s.likeCount + s.commentCount + s.shareCount) / impressions) * 0.3) *
            100
          ).toFixed(2);

          allPosts.push({
            organization: orgUrn,
            postId: post.id,
            text: post.text?.text || '',
            createdAt: post.created?.time || null,
            content: post.content || null,
            distribution: post.distribution || null,
            lifecycleState: post.lifecycleState || '',
            visibility: post.visibility || '',
            lastModified: post.lastModified?.time || null,

            impressions,
            clicks: s.clickCount,
            likes: s.likeCount,
            comments: s.commentCount,
            shares: s.shareCount,
            engagementRate,
            performanceScore: score,
            engagement: s.engagement
          });
        }

        const olderThan3Months = elements.some(post => post.created?.time <= threeMonthsAgo);
        if (olderThan3Months) break;

        const total = shareRes.data.paging.total;
        start += 50;
        hasMore = start < total;
      } catch (error) {
        console.error(`Error for ${orgUrn}:`, {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        break;
      }
    }
  }

  const top5 = allPosts
    .sort((a, b) => b.performanceScore - a.performanceScore)
    .slice(0, 5);

  return new Response(JSON.stringify({ topPosts: top5 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
