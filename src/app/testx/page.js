"use client";

import React from "react";

function FacebookLoginPage() {

  const INSTAGRAM_OAUTH_URL = "https://www.facebook.com/v19.0/dialog/oauth?client_id=528207910301806&redirect_uri=http://localhost:3000/api/auth/instagram/callback&scope=instagram_basic,instagram_content_publish,instagram_manage_messages,instagram_manage_comments&response_type=code";

  return (
    <div>
      <button
        onClick={() => {
          if (typeof FB !== "undefined") {
            FB.login(    
              function (response) {
                if (response.authResponse) {
                  const accessToken = response.authResponse.accessToken;
                  const userID = response.authResponse.userID;
                  console.log("Access Token:", accessToken);
                  console.log("User ID:", userID);

                  FB.api("/me/permissions", { fields: "name,email" }, function (profile) {
                    console.log("User Profile:", profile.data);
                  });
                } else {
                  console.log("Login failed or cancelled.");
                }
              },
              {
                scope: 'public_profile,email,pages_show_list,pages_read_engagement,user_friends',
                return_scopes: true
              }
            );
          } else {
            console.warn("Facebook SDK not loaded yet.");
          }
        }}
      >
        Login with Facebook
      </button>

      <main style={{ padding: 50 }}>
          <a href={INSTAGRAM_OAUTH_URL}>
            <button >Login with Instagram</button>
          </a>
      </main>
    </div>
  );
}

export default FacebookLoginPage;