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

  for (const org of organizations) {
    const orgUrn = org.organizationalTarget;
    const accessToken = org.token;

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
        const shareIds = elements.map((el) => el.id);
        if (shareIds.length === 0) break;

        // Correctly format multiple 'shares' parameters without indexing
        const statsParams = shareIds.map(id => `shares=urn:li:share:${id}`).join('&');
        const statsUrl = `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=${orgUrn}&${statsParams}`;

        const statsRes = await axios.get(statsUrl, { headers: getHeaders() });

        for (let i = 0; i < elements.length; i++) {
          const post = elements[i];
          const stat = statsRes.data.elements.find((e) => e.share.endsWith(post.id));
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
            impressions,
            clicks: s.clickCount,
            likes: s.likeCount,
            comments: s.commentCount,
            shares: s.shareCount,
            engagementRate,
            performanceScore: score,
          });
        }
        
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

  const top5 = allPosts.sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5);

  return new Response(JSON.stringify({ topPosts: top5 }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}