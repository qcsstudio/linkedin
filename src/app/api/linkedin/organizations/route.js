export async function POST(req) {
    try {
        const body = await req.json();
        const { organizations } = body;


        if (!Array.isArray(organizations) || organizations.length === 0) {
            return Response.json({ error: "Invalid organization data" }, { status: 400 });
        }

        const fetchPromises = organizations.map(({ organizationalTarget, token }) => {
            const orgID = organizationalTarget.split(":").pop();
            return fetch(`https://api.linkedin.com/v2/organizations/${orgID}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(async (res) => {
                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(`LinkedIn API Error: ${error.message}`);
                }
                
                const data = await res.json();
                data.token = token;
                return data;
            });
        });

        const organizationProfiles = await Promise.all(fetchPromises);
        return Response.json({ organizations: organizationProfiles }, { status: 200 });

    } catch (error) {
        console.error("Failed to fetch organizations:", error.message);
        return Response.json(
            { error: error.message || "Failed to fetch organizations" },
            { status: 500 }
        );
    }
}