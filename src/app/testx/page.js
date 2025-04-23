// "use client";

// import React, { useEffect, useState } from "react";

// function FacebookLoginPage() {
//   const [isSdkLoaded, setIsSdkLoaded] = useState(false);

//   useEffect(() => {
//     // Initialize Facebook SDK
//     window.fbAsyncInit = function() {
//       FB.init({
//         appId: 1235953594766978,
//         cookie: true,
//         xfbml: true,
//         version: "v18.0"
//       });
//       setIsSdkLoaded(true);
//     };

//     // Load SDK script
//     (function(d, s, id) {
//       var js, fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) return;
//       js = d.createElement(s); js.id = id;
//       js.src = "https://connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     }(document, "script", "facebook-jssdk"));
//   }, []);

//   const handleLogin = () => {
//     if (!isSdkLoaded) {
//       console.warn("Facebook SDK not loaded yet");
//       return;
//     }

//     FB.login(response => {
//       if (response.authResponse) {
//         console.log("Access Token:", response.authResponse.accessToken);
//         console.log("User ID:", response.authResponse.userID);
        
//         // Verify granted permissions
//         FB.api("/me/permissions", permissionsRes => {
//           if (!permissionsRes.error) {
//             console.log("Granted Permissions:", permissionsRes.data);
            
//             // Check if user_friends permission was granted
//             const hasFriendsPermission = permissionsRes.data.some(
//               perm => perm.permission === "user_friends" && perm.status === "granted"
//             );
            
//             if (!hasFriendsPermission) {
//               console.warn("user_friends permission not granted");
//             }
//           }
//         });

//         // Get user profile
//         FB.api("/me", { fields: "name,email" }, profileRes => {
//           if (!profileRes.error) {
//             console.log("User Profile:", profileRes);
//           } else {
//             console.error("Profile fetch failed:", profileRes.error);
//           }
//         });

//       } else {
//         console.log("Login cancelled or failed:", response.status);
//       }
//     }, {
//       scope: "public_profile,email,pages_show_list,instagram_basic,instagram_content_publish,pages_read_engagement,user_posts",
//       return_scopes: true
//     });
//   };
  
  
//   return (
//     <div>
//       <button 
//         onClick={handleLogin}
//         disabled={!isSdkLoaded}
//         style={{ opacity: isSdkLoaded ? 1 : 0.7 }}
//       >
//         {isSdkLoaded ? "Login with Facebook" : "Loading Facebook..."}
//       </button>
//     </div>
//   );
// }

// export default FacebookLoginPage;

"use client";

import React, { useEffect, useState } from "react";

function FacebookLoginPage() {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: 1235953594766978,
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
      setIsSdkLoaded(true);
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const handleLogin = () => {
    if (!isSdkLoaded) {
      console.warn("Facebook SDK not loaded yet");
      return;
    }

    FB.login(
      (response) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          const userID = response.authResponse.userID;
          console.log("Access Token:", accessToken);
          console.log("User ID:", userID);

          // 1. Permissions
          FB.api("/me/permissions", (permissionsRes) => {
            console.log("Granted Permissions:", permissionsRes);
          });

          // 2. User Profile
          FB.api("/me", { fields: "id,name,email" }, (profileRes) => {
            console.log("User Profile:", profileRes);
          });

          // 3. Managed Pages
          FB.api("/me/accounts", async (pagesRes) => {
            console.log("Managed Pages:", pagesRes);

            if (pagesRes?.data?.length > 0) {
              const page = pagesRes.data[0];
              const pageId = page.id;
              const pageToken = page.access_token;

              // 4. Page Insights
              FB.api(
                `/${pageId}/insights?metric=page_impressions,page_engaged_users`,
                "GET",
                { access_token: pageToken },
                (insightsRes) => {
                  console.log("Page Insights:", insightsRes);
                }
              );

              // 5. IG Business Account
              FB.api(
                `/${pageId}?fields=instagram_business_account`,
                "GET",
                { access_token: pageToken },
                (igAccountRes) => {
                  console.log("Instagram Business Account:", igAccountRes);
                  const igUserId = igAccountRes.instagram_business_account?.id;

                  if (igUserId) {
                    // 6. IG Profile Details
                    FB.api(
                      `/${igUserId}?fields=username,biography,followers_count,follows_count,media_count,profile_picture_url`,
                      "GET",
                      { access_token: pageToken },
                      (igProfileRes) => {
                        console.log("IG Profile:", igProfileRes);
                      }
                    );

                    // 7. IG Media
                    FB.api(
                      `/${igUserId}/media`,
                      "GET",
                      { access_token: pageToken },
                      (mediaRes) => {
                        console.log("IG Media:", mediaRes);
                      }
                    );
                  }
                }
              );
            }
          });

          // 8. User Feed Posts
          FB.api("/me/posts", { fields: "message,created_time" }, (postsRes) => {
            console.log("User Feed Posts:", postsRes);
          });

        } else {
          console.log("Login cancelled or failed:", response.status);
        }
      },
      {
        scope:
          "public_profile,email,pages_show_list,instagram_basic,instagram_content_publish,pages_read_engagement,user_posts",
        return_scopes: true,
      }
    );
  };

  return (
    <div>
      <button
        onClick={handleLogin}
        disabled={!isSdkLoaded}
        style={{ opacity: isSdkLoaded ? 1 : 0.7 }}
      >
        {isSdkLoaded ? "Login with Facebook" : "Loading Facebook..."}
      </button>
    </div>
  );
}

export default FacebookLoginPage;
