import axios from 'axios';
import moment from 'moment';

const TIME_SLOTS = [
  { label: '6:00 AM', range: [6, 11] },
  { label: '12:00 PM', range: [12, 16] },
  { label: '6:00 PM', range: [17, 18] },
  { label: '7:30 PM', range: [19, 20] },
  { label: '9:30 PM', range: [21, 23] },
];

function getTimeSlot(hour) {
  for (const slot of TIME_SLOTS) {
    if (hour >= slot.range[0] && hour <= slot.range[1]) {
      return slot.label;
    }
  }
  return 'Other';
}

function getDayLabel(timestamp) {
  return moment(timestamp).format('ddd');
}

// In-memory cache
let cache = {
  timestamp: null,
  orgId: null,
  data: null,
};

export async function POST(req) {
  try {
    const body = await req.json();
    const ORGANIZATION_ID = body?.data?.id;
    const ACCESS_TOKEN = body?.data?.token;

    if (!ORGANIZATION_ID || !ACCESS_TOKEN) {
      return Response.json({ success: false, error: 'Missing organization ID or token' }, { status: 400 });
    }

    // Check cache (valid for 1 hour)
    if (
      cache.timestamp &&
      Date.now() - cache.timestamp < 3600000 &&
      cache.orgId === ORGANIZATION_ID
    ) {
      return Response.json({ success: true, data: cache.data }, { status: 200 });
    }

    const headers = {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };

    const ninetyDaysAgo = moment().subtract(90, 'days').valueOf();

    // Step 1: Paginate & filter posts (only those from last 90 days)
    let allPosts = [];
    let start = 0;
    let hasMore = true;

    while (hasMore) {
      const res = await axios.get(
        `https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:organization:${ORGANIZATION_ID}&start=${start}&count=100`,
        { headers }
      );

      const posts = res.data.elements || [];
      const recentPosts = posts.filter(post => post.created?.time >= ninetyDaysAgo);

      allPosts.push(...recentPosts);

      hasMore = posts.length === 100 && recentPosts.length > 0;
      start += 100;
    }

    // Step 2: Initialize heatmap structure
    const heatmap = {};
    for (let day of ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']) {
      heatmap[day] = {};
      TIME_SLOTS.forEach(slot => {
        heatmap[day][slot.label] = { count: 0, engagement: 0 };
      });
    }

    // Step 3: Fetch stats and classify each post
    for (const post of allPosts) {
      const postId = post.id;
      const createdTime = post.created?.time;

      if (!createdTime) continue;

      const day = getDayLabel(createdTime);
      const hour = moment(createdTime).hour();
      const slot = getTimeSlot(hour);

      try {
        const stats = await axios.get(
          `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${ORGANIZATION_ID}&shares=urn:li:share:${postId}`,
          { headers }
        );

        const stat = stats.data.elements?.[0]?.totalShareStatistics;
        const engagement = stat?.engagement || 0;

        if (heatmap[day] && heatmap[day][slot]) {
          heatmap[day][slot].count += 1;
          heatmap[day][slot].engagement += engagement;
        }
      } catch (err) {
        console.warn(`Stat fetch error for post ${postId}:`, err.message);
        continue;
      }
    }

    // Step 4: Normalize to %
    const allAverages = [];

    for (const day of Object.keys(heatmap)) {
      for (const slot of Object.keys(heatmap[day])) {
        const { count, engagement } = heatmap[day][slot];
        const avg = count > 0 ? engagement / count : 0;
        heatmap[day][slot].average = avg;
        if (count > 0) {
          allAverages.push(avg);
        }
      }
    }

    const baseline =
      allAverages.length > 0
        ? allAverages.reduce((acc, val) => acc + val, 0) / allAverages.length
        : 1;

    // Step 5: Format result for chart
    const formattedHeatmap = Object.entries(heatmap).map(([day, slots]) => {
      const slotData = {};
      Object.entries(slots).forEach(([slot, val]) => {
        const normalized = val.average > 0 ? Math.round((val.average / baseline) * 100) : 0;
        slotData[slot] = normalized;
      });
      return { day, slots: slotData };
    });

    // Step 6: Cache it
    cache = {
      timestamp: Date.now(),
      orgId: ORGANIZATION_ID,
      data: formattedHeatmap,
    };

    return Response.json({ success: true, data: formattedHeatmap }, { status: 200 });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return Response.json({ success: false, error: 'Failed to generate heatmap' }, { status: 500 });
  }
}
