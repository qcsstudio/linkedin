import About from "@/components/HomeComponent/AboutSection/About";
import Blogs from "@/components/HomeComponent/Blogs/Blogs";
import ChooseUs from "@/components/HomeComponent/ChooseUs/ChooseUs";
import FaqSection from "@/components/HomeComponent/FaqSection/FaqSection";
import Footer from "@/components/HomeComponent/Footer/Footer";
import HeroSection from "@/components/HomeComponent/HeroSection/HeroSection";
import Integration from "@/components/HomeComponent/Integration/Integration";

import Plans from "@/components/HomeComponent/Plans/Plans";
import SuccessStories from "@/components/HomeComponent/SuccessStories/SuccessStories";
import Image from "next/image";
import cloud from "../../../public/images/blogsImages/Cloud.png";
import KeyFeatureSection from "@/components/HomeComponent/KeyFeature/KeyFeatureSection";
import Elevate from "@/components/HomeComponent/Elevate/Elevate";
import Navbar from "@/components/HomeComponent/NavbarHome/NavbarHome";
import ContactUsSection from "@/components/HomeComponent/ContactUsSection/ContactUsSection";
import CloudSection from "@/components/HomeComponent/CloudSection/CloudSection";

const HomeContainer = () => {
  return (
    <>
      <div className="mainContainer relative bg-[url(/images/homeImages/grain.png)] bg-cover  bg-no-repeat  w-[100%] min-h-[100vh] overflow-hidden">
        <div className="bg-[#5E788F]/85 flex flex-col gap-3 md:gap-6 lg:gap-10">
          <Navbar />
          <HeroSection />
          <div className="relative flex flex-col gap-3 md:gap-6 lg:gap-10 overflow-hidden ">
            <About />
            <ChooseUs />
            <CloudSection
              bottom={85}
              left={0}
              width="90vw"
              className="animate-cloudMove"
              style={{
                "--cloud-speed": "120s",
                "--cloud-opacity": "0.9",
                animationDelay: "0s",
              }}
            />
            <CloudSection
              bottom={60}
              left={60}
              width="80vw"
              className="animate-cloudMove"
              style={{
                "--cloud-speed": "110s",
                "--cloud-opacity": "0.85",
                animationDelay: "15s",
              }}
            />

            {/* Second Layer - Medium Clouds, Faster */}
            <CloudSection
              bottom={65}
              left={-30}
              width="70vw"
              className="animate-cloudMove"
              style={{
                "--cloud-speed": "90s",
                "--cloud-opacity": "0.75",
                animationDelay: "5s",
              }}
            />
            <CloudSection
              bottom={40}
              left={60}
              width="65vw"
              className="animate-cloudMove"
              style={{
                "--cloud-speed": "85s",
                "--cloud-opacity": "0.7",
                animationDelay: "10s",
              }}
            />

            {/* Third Layer - Small, Fast Clouds for Depth */}
            <CloudSection
              bottom={40}
              left={0}
              width="55vw"
              className="animate-cloudMove"
              style={{
                "--cloud-speed": "70s",
                "--cloud-opacity": "0.6",
                animationDelay: "8s",
              }}
            />
            <CloudSection
              bottom={25}
              left={60}
              width="50vw"
              className="animate-cloudMove"
              style={{
                "--cloud-speed": "65s",
                "--cloud-opacity": "0.55",
                animationDelay: "12s",
              }}
            />

            {/* Extra Clouds to Ensure Continuous Flow */}
            <CloudSection
              bottom={55}
              left={20}
              width="60vw"
              className="animate-cloudMove"
              style={{
                "--cloud-speed": "75s",
                "--cloud-opacity": "0.55",
                animationDelay: "18s",
              }}
            />
            <CloudSection
              bottom={30}
              left={-20}
              width="45vw"
              className="animate-cloudMove"
              style={{
                "--cloud-speed": "60s",
                "--cloud-opacity": "0.5",
                animationDelay: "20s",
              }}
            />
          </div>

          <Integration />
          <Elevate />
          <KeyFeatureSection />
          <Plans />
          <SuccessStories />
          <Blogs />

          <FaqSection />
          <ContactUsSection />
          <Footer />
        </div>

        {/* Rays */}
        <div className="w-[100%] h-[117.5rem] absolute top-[0rem] left-[0rem] z-[1] ">
          <Image
            src="/images/homeImages/rays.png"
            width={1024}
            height={1024}
            alt="logo"
            className="w-[100%] h-[100%] imageDrag opacity-80 z-[1] "
          />
        </div>
      </div>
    </>
  );
};

export default HomeContainer;
