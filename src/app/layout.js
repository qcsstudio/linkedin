import { Syne } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Outfit } from "next/font/google";
import "./globals.css";
import DashboardContextProvider from "@/Context/Dashboard.context";

import { PrimeReactProvider } from "primereact/api";

import { UserContextProvider } from "@/Context/user.context";
import Script from "next/script";
import { PostContextProvider } from "@/Context/post.context";

import { AnalyticsContextProvider } from "@/Context/analytics.context";

import { ContactUsContextProvider } from "@/Context/ContactUs.context";
import "@/utils/cron";
import Link from "next/link";
import { BlogDataContextProvider } from "@/Context/Blogs.context";
import { UiContextProvider } from "@/Context/ui.context";

const syne = Syne({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syne",
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "ElevatrX | AI-Powered Social Media Automation Platform",
  description:
    "Automate your social media content creation, scheduling, and analytics with ElevatrX. Enhance your brand visibility effortlessly—Try it free today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="FE1jcS7Gi8yAWxnnLZ-lweGrna3FI5zh61v14-5q1Og"
      />
      <Link
        href="https://fonts.googleapis.com/css2?family=NATS&display=swap"
        rel="stylesheet"
      />
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
             'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KLNTT48L');
            `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-KLP5Q5MWRF"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KLP5Q5MWRF');
        `}
      </Script>

      
      <Script id="facebook-sdk" strategy="afterInteractive">
        {`
          window.fbAsyncInit = function() {
            FB.init({
              appId      : '528207910301806', 
              cookie     : true,
              xfbml      : true,
              version    : 'v18.0'
            });
            FB.AppEvents.logPageView();   
          };
          (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "https://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
           }(document, 'script', 'facebook-jssdk'));
        `}
      </Script>

      <body className={outfit.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KLNTT48L"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <BlogDataContextProvider>
          <PrimeReactProvider>
            <UiContextProvider>
              <ContactUsContextProvider>
                <AnalyticsContextProvider>
                  <PostContextProvider>
                    <UserContextProvider>
                      <DashboardContextProvider>
                        {children}
                      </DashboardContextProvider>
                    </UserContextProvider>
                  </PostContextProvider>
                </AnalyticsContextProvider>
              </ContactUsContextProvider>
            </UiContextProvider>
          </PrimeReactProvider>
        </BlogDataContextProvider>
      </body>
    </html>
  );
}
