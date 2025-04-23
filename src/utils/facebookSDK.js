"use client"
import { useEffect } from 'react';

const useFacebookSDK = () => {
  useEffect(() => {
    // Avoid duplicate script insertions
    if (document.getElementById('facebook-jssdk')) return;

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 'YOUR_APP_ID', // Replace with your real App ID
        cookie: true,
        xfbml: true,
        version: 'v18.0' // or your preferred version
      });

      window.FB.AppEvents.logPageView();
    };

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);
};

export default useFacebookSDK;
