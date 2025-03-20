import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DashboardContextProvider from "@/Context/Dashboard.context";

import { PrimeReactProvider } from "primereact/api";

import { UserContextProvider } from "@/Context/user.context";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ElevatrX | AI-Powered Social Media Automation Platform",
  description: "Automate your social media content creation, scheduling, and analytics with ElevatrX. Enhance your brand visibility effortlessly—Try it free today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

<PrimeReactProvider >
        <UserContextProvider>
          <DashboardContextProvider>{children}</DashboardContextProvider>
        </UserContextProvider>
        </PrimeReactProvider>

      </body>
    </html>
  );
}
