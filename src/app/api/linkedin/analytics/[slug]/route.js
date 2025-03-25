export async function GET(request, { params }) {
    try {
        const { slug } = await params;

        if (!slug) {
            return Response.json(
                { message: "Organization ID is required" },
                { status: 400 }
            );
        }

        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return Response.json(
                { message: "Authorization token required" },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];

        // LinkedIn Analytics API
        const analyticsURL = `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${slug}`;

        const [analyticsResponse, followersResponse] = await Promise.all([
            fetch(analyticsURL, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }),
            fetch(`https://api.linkedin.com/v2/networkSizes/urn:li:organization:${slug}?edgeType=CompanyFollowedByMember`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
        ]);

        if (!analyticsResponse.ok || !followersResponse.ok) {
            const errorData = {
                analyticsError: !analyticsResponse.ok ? await analyticsResponse.json() : null,
                followersError: !followersResponse.ok ? await followersResponse.json() : null,
            };
            throw new Error(`LinkedIn API error: ${JSON.stringify(errorData)}`);
        }

        const analyticData = await analyticsResponse.json();
        const followersData = await followersResponse.json();

        // Extracting the total follower count
        const totalFollowers = followersData?.firstDegreeSize || 0;

        return Response.json(
            {
                analyticsData: analyticData,
                followers: totalFollowers,  // New key with total followers
                message: "Organization Analytics and Followers fetched successfully"
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("LinkedIn API error /linkedin/analytics:", error);
        return Response.json(
            {
                message: "Unable to fetch Analytics and Followers",
                error: error.message
            },
            { status: 500 }
        );
    }
}
