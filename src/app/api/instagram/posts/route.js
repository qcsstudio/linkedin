// app/api/instagram/posts/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const accessToken = "EAAHgZAvzccG4BOyrBZAZAvUBZCgGZBpQOEfs9sZADdNlOAxIe7ax0qZAkCTqkEiHDZCojFZCunedsqvxRBvSdoBz6tdAMDTkiKxzhnOgrq0tDtvfPwlegbVWiy0VffrncsmFemxVVOUmT5fHxNXQYULK4K046h28O7qNcPUSksUEWThVRUuZB2HZBE1BdJtEMje7AD5fLdPfcS8qtqblFZCiEzZC4esnigIrXHRkCkQldxeJoN793E2FZBWeYN";

    // Step 1: Fetch pages linked to user
    const pagesResponse = await axios.get(
      `https://graph.facebook.com/v19.0/me/accounts`,
      {
        params: {
          access_token: accessToken,
        },
      }
    );

    const pages = pagesResponse.data.data;

    if (!pages.length) {
      throw new Error("No Facebook Pages connected to your account.");
    }

    let instagramBusinessAccountId = null;

    // Step 2: Loop through pages and find one linked to Instagram
    for (const page of pages) {
      const pageInfo = await axios.get(
        `https://graph.facebook.com/v19.0/${page.id}`,
        {
          params: {
            fields: "instagram_business_account",
            access_token: accessToken,
          },
        }
      );

      if (pageInfo.data.instagram_business_account) {
        instagramBusinessAccountId = pageInfo.data.instagram_business_account.id;
        break;
      }
    }

    if (!instagramBusinessAccountId) {
      throw new Error("No Instagram Business Account linked to any Page.");
    }

    // Step 3: Fetch Instagram Profile Info
    const profileResponse = await axios.get(
      `https://graph.facebook.com/v19.0/${instagramBusinessAccountId}`,
      {
        params: {
          fields: "id,username,profile_picture_url,followers_count,media_count",
          access_token: accessToken,
        },
      }
    );

    const profileData = profileResponse.data;

    // Step 4: Fetch Instagram Media (Posts, Reels, etc.)
    const mediaResponse = await axios.get(
      `https://graph.facebook.com/v19.0/${instagramBusinessAccountId}/media`,
      {
        params: {
          fields: "id,caption,media_type,media_url,permalink,timestamp,thumbnail_url",
          access_token: accessToken,
        },
      }
    );

    const mediaData = mediaResponse.data.data;

    // Step 5: Final Combined Response
    return NextResponse.json({
      success: true,
      profile: profileData,
      posts: mediaData,
    });

  } catch (error) {
    console.error("❌ Instagram Fetch Error:", error.response?.data || error.message);

    return NextResponse.json({
      success: false,
      error: error.response?.data || error.message,
    }, { status: 500 });
  }
}
