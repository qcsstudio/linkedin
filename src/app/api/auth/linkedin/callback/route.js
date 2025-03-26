// app/api/auth/linkedin/callback/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");
  const baseURL = "http://localhost:3000";

  // Handle LinkedIn errors
  if (error) {
    return NextResponse.redirect(
      new URL(
        `/?error=${encodeURIComponent(error)}&description=${encodeURIComponent(
          searchParams.get("error_description")
        )}`,
        baseURL
      )
    );
  }

  // Validate state parameter
  const storedState = cookieStore.get("linkedin_oauth_state")?.value;


  if (!state || state !== storedState) {
    return NextResponse.redirect(
      new URL("/?error=Invalid%20state%20parameter", baseURL)
    );
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to obtain access token");
    }

    const tokenData = await tokenResponse.json();


    // Fetch user information
    const userInfoResponse = await fetch(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    
    if (!userInfoResponse.ok) {
      throw new Error("Failed to fetch user information");
    }

    const userInfo = await userInfoResponse.json();

    // Set secure HTTP-only cookies
    cookieStore.set("linkedin_access_token", tokenData.access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      path: "/",
      maxAge: tokenData.expires_in,
    });

    cookieStore.set("linkedin_user_id", userInfo.sub, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    const test = cookieStore.getAll();
  
    
    const userId = cookieStore.get("user_id")?.value; // Get the logged-in user ID

    if (userId) {
      const updateResponse = await fetch(`${baseURL}/api/auth/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id:userId,
          platformName: "linkedin",
          accessToken: tokenData.access_token,
        }),
      });

      if (!updateResponse.ok) {
        console.error("Failed to update user with LinkedIn token");
      }
    }

    // Redirect to homepage with success state
    const response = NextResponse.redirect(new URL("/", baseURL));

    // Set non-sensitive user data in session cookie
    response.cookies.set({
      name: "user_session",
      value: JSON.stringify({
        name: userInfo.name,
        picture: userInfo.picture,
      }),
      // secure: process.env.NODE_ENV === 'production',
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    return NextResponse.redirect(
      new URL(
        `/?error=Authentication%20failed&details=${encodeURIComponent(
          error.message
        )}`,
        baseURL
      )
    );
  }
}
