"use client";

import React from "react";

function FacebookLoginPage() {
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

                  FB.api("/me", { fields: "name,email" }, function (profile) {
                    console.log("User Profile:", profile);
                  });
                } else {
                  console.log("Login failed or cancelled.");
                }
              },
              {
                scope: "public_profile,email,pages_show_list,pages_read_engagement",
              }
            );
          } else {
            console.warn("Facebook SDK not loaded yet.");
          }
        }}
      >
        Login with Facebook
      </button>
    </div>
  );
}

export default FacebookLoginPage;
