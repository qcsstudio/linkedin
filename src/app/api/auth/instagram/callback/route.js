
// app/api/auth/instagram/callback/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  const cookieStore = cookies();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const baseURL = "http://localhost:3000";  // Or your production URL

  if (error) {
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent(error)}`, baseURL)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/?error=Missing%20authorization%20code", baseURL)
    );
  }

  try {
    // 1. Exchange authorization code for access token
    const tokenResponse = await fetch("https://graph.facebook.com/v19.0/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: 528207910301806,
        client_secret: "ae2e62004bcb03d1ed25944b56dc2f67",
        redirect_uri: "http://localhost:3000/api/auth/instagram/callback",
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to obtain Instagram access token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    const expiresIn = tokenData.expires_in;

    console.log("✅ Access Token:", accessToken);

    // 2. (Optional) Fetch user Facebook Pages and Instagram account
    const pagesResponse = await fetch(`https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`);
    const pagesData = await pagesResponse.json();

    let instagramBusinessAccount = null;

    for (const page of pagesData.data || []) {
      const igAccountRes = await fetch(
        `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${accessToken}`
      );
      const igData = await igAccountRes.json();
      if (igData.instagram_business_account) {
        instagramBusinessAccount = igData.instagram_business_account.id;
        break;
      }
    }

    console.log("✅ Instagram Business ID:", instagramBusinessAccount || "Not Linked");

    // 3. Store Access Token in Secure HTTP-only Cookie
    cookieStore.set("instagram_access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn, // seconds
      // secure: process.env.NODE_ENV === 'production',
    });

    if (instagramBusinessAccount) {
      cookieStore.set("instagram_business_account", instagramBusinessAccount, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        // secure: process.env.NODE_ENV === 'production',
      });
    }

    // 4. (Optional) Update User in Your Database
    const userId = cookieStore.get("user_id")?.value;  // Assuming user_id stored in login session

    if (userId) {
      const updateResponse = await fetch(`${baseURL}/api/auth/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: userId,
          platformName: "instagram",
          accessToken: accessToken,
          instagramBusinessId: instagramBusinessAccount || null,
        }),
      });

      if (!updateResponse.ok) {
        console.error("⚠️ Failed to update user with Instagram token");
      }
    }

    // 5. Redirect to homepage (or dashboard) with success
    const response = NextResponse.redirect(new URL("/", baseURL));
    return response;
  } catch (err) {
    console.error("❌ Instagram auth failed:", err.message);
    return NextResponse.redirect(
      new URL(`/?error=Authentication%20failed&details=${encodeURIComponent(err.message)}`, baseURL)
    );
  }
}

