export async function POST(req) {
  try {
    const body = await req.json();
    const { linkedinAccounts } = body;

    if (!linkedinAccounts || linkedinAccounts.length === 0) {
      return new Response(JSON.stringify({ message: "No LinkedIn accounts provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const requests = linkedinAccounts.map(async (account) => {
      try {
        // Fetch user info
        const userResponse = await fetch(`https://api.linkedin.com/v2/userinfo`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!userResponse.ok) {
          throw new Error(`User API failed: ${userResponse.status}`);
        }

        const userData = await userResponse.json();

        // Fetch organization info
        const orgResponse = await fetch(`https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${account.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!orgResponse.ok) {
          throw new Error(`Org API failed: ${orgResponse.status}`);
        }

        const orgData = await orgResponse.json();
        const filteredOrgs = orgData.elements.filter((org) => org.state !== "REVOKED");

        return {
          success: true,
          data: {
            user: userData,
            organizations: filteredOrgs || [],
            token: account.accessToken,
          },
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          token: account.accessToken,
        };
      }
    });

    const results = await Promise.allSettled(requests);

    // console.log("USER  Data Result : ==========> ",results[0].value.data);

    const successful = results
      .filter((r) => r.status === "fulfilled" && r.value.success)
      .map((r) => r.value.data);

    const failed = results
      .filter((r) => r.status === "fulfilled" && !r.value.success)
      .map((r) => ({
        error: r.value.error,
        token: r.value.token,
      }));

    const headers = new Headers({
      "Cache-Control": "s-maxage=300, stale-while-revalidate",
      "Content-Type": "application/json",
    });

    return new Response(JSON.stringify({ successful, failed }), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
