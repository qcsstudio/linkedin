export async function GET(request, { params }) {
    try {
        // 1. Validate required parameters
        const {slug} = await params
        if (!slug) {
            return Response.json(
                { message: "Organization ID is required" },
                { status: 400 }
            );
        }

        // 2. Get authorization token from headers
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return Response.json(
                { message: "Authorization token required" },
                { status: 401 }
            );
        }
        const token = authHeader.split(' ')[1];
 
        const analyticsURL = `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${slug}`;

        // 4. Make request to LinkedIn API
        const analyticsResponse = await fetch(analyticsURL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        // 5. Handle LinkedIn API response
        if (!analyticsResponse.ok) {
            const errorData = await analyticsResponse.json();
            throw new Error(`LinkedIn API error: ${errorData.message}`);
        }

        const analyticData = await analyticsResponse.json();

        // 6. Return successful response
        return Response.json(
            { 
                analyticsData: analyticData,
                message: "Organization Analytics fetched successfully" 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("LinkedIn Analytics error /linkedin/analytics:", error);
        return Response.json(
            { 
                message: "Unable to fetch Analytics",
                error: error.message 
            },
            { status: 500 }
        );
    }
}