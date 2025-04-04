export async function POST(req) {
    try {
        const organizations = await req.json();
        console.log("Received organizations:", organizations);

        if (!Array.isArray(organizations) || organizations.length === 0) {
            return Response.json(
                { message: "Invalid or empty organization data provided" },
                { status: 400 }
            );
        }

        // Aggregated result object
        let aggregatedData = {
            analyticsData: {
                paging: {
                    start: 0,
                    count: 10,
                    links: [],
                    total: 1
                },
                elements: [
                    {
                        totalShareStatistics: {
                            uniqueImpressionsCount: 0,
                            shareCount: 0,
                            shareMentionsCount: 0,
                            engagement: 0,
                            clickCount: 0,
                            likeCount: 0,
                            impressionCount: 0,
                            commentMentionsCount: 0,
                            commentCount: 0,
                            views: 0 // For aggregated views within analytics
                        },
                        organizationalEntity: "urn:li:organization:all"
                    }
                ]
            },
            followers: 0,
            views: 0, // <-- Add a top-level views property here
            message: "Aggregated organization analytics and followers fetched successfully"
        };

        const fetchPromises = organizations.map(async (org) => {
            const { id, token } = org;

            const analyticsURL = `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${id}`;
            const followersURL = `https://api.linkedin.com/v2/networkSizes/urn:li:organization:${id}?edgeType=CompanyFollowedByMember`;
            const pageViewsURL = `https://api.linkedin.com/v2/organizationPageStatistics?q=organization&organization=urn:li:organization:${id}`;

            console.log("pageViewsURL:", pageViewsURL);

            try {
                const [analyticsResponse, followersResponse, pageViewsResponse] = await Promise.all([
                    fetch(analyticsURL, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }),
                    fetch(followersURL, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }),
                    fetch(pageViewsURL, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    })
                ]);

                if (!analyticsResponse.ok || !followersResponse.ok || !pageViewsResponse.ok) {
                    console.error(`Error fetching data for organization: ${id}`);
                    throw new Error(`Failed to fetch data for org ${id}`);
                }

                const [analyticData, followersData, pageViewsData] = await Promise.all([
                    analyticsResponse.json(),
                    followersResponse.json(),
                    pageViewsResponse.json()
                ]);

                console.log("pageViewsData:", pageViewsData);

                // Extract share stats
                const stats = analyticData?.elements?.[0]?.totalShareStatistics || {};

                // Extract followers
                const followers = followersData?.firstDegreeSize || 0;

                // Extract total views from the allPageViews field
                let views = 0;
                if (
                    Array.isArray(pageViewsData?.elements) &&
                    pageViewsData.elements.length > 0
                ) {
                    const firstElement = pageViewsData.elements[0];
                    if (
                        firstElement?.totalPageStatistics?.views &&
                        typeof firstElement.totalPageStatistics.views === "object"
                    ) {
                        views = firstElement.totalPageStatistics.views.allPageViews?.pageViews || 0;
                    }
                }

                // Aggregate analytics values
                const aggStats = aggregatedData.analyticsData.elements[0].totalShareStatistics;
                aggStats.uniqueImpressionsCount += stats.uniqueImpressionsCount || 0;
                aggStats.shareCount += stats.shareCount || 0;
                aggStats.shareMentionsCount += stats.shareMentionsCount || 0;
                aggStats.engagement += stats.engagement || 0;
                aggStats.clickCount += stats.clickCount || 0;
                aggStats.likeCount += stats.likeCount || 0;
                aggStats.impressionCount += stats.impressionCount || 0;
                aggStats.commentMentionsCount += stats.commentMentionsCount || 0;
                aggStats.commentCount += stats.commentCount || 0;
                aggStats.views += views;

                // Add followers and views at the top level
                aggregatedData.followers += followers;
                aggregatedData.views += views;

            } catch (error) {
                console.error(`Error processing organization ${org.id}:`, error.message);
            }
        });

        await Promise.allSettled(fetchPromises);

        // Average engagement per org
        const orgCount = organizations.length;
        if (orgCount > 0) {
            aggregatedData.analyticsData.elements[0].totalShareStatistics.engagement /= orgCount;
        }

        // Return aggregated result
        return Response.json(
            {
                message: "Aggregated organization analytics and followers fetched successfully",
                data: aggregatedData
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error:", error);
        return Response.json(
            {
                message: "Failed to fetch analytics data",
                error: error.message
            },
            { status: 500 }
        );
    }
}
