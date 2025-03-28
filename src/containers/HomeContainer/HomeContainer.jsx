import About from "@/components/HomeComponent/AboutSection/About"
import Blogs from "@/components/HomeComponent/Blogs/Blogs"
import ChooseUs from "@/components/HomeComponent/ChooseUs/ChooseUs"
import FaqSection from "@/components/HomeComponent/FaqSection/FaqSection"
import Footer from "@/components/HomeComponent/Footer/Footer"
import HeroSection from "@/components/HomeComponent/HeroSection/HeroSection"
import Integration from "@/components/HomeComponent/Integration/Integration"

import Plans from "@/components/HomeComponent/Plans/Plans"
import SuccessStories from "@/components/HomeComponent/SuccessStories/SuccessStories"
import Image from "next/image"
import cloud from "../../../public/images/blogsImages/Cloud.png"
import KeyFeatureSection from "@/components/HomeComponent/KeyFeature/KeyFeatureSection"
import Elevate from "@/components/HomeComponent/Elevate/Elevate"
import Navbar from "@/components/HomeComponent/NavbarHome/NavbarHome"
import ContactUsSection from "@/components/HomeComponent/ContactUsSection/ContactUsSection"
import CloudSection from "@/components/HomeComponent/CloudSection/CloudSection"


const HomeContainer = () => {
    return (
        <>
            <div className="mainContainer relative bg-[url(/images/homeImages/grain.png)]  w-[100%] min-h-[100vh] overflow-hidden">
              <div className="bg-[#5E788F]/85 flex flex-col gap-3 md:gap-6 lg:gap-10">
              <Navbar/>
                <HeroSection />
                <div className="relative flex flex-col gap-3 md:gap-6 lg:gap-10">
  <About />
  <ChooseUs />

 
  <CloudSection bottom={70} left={-15} width="60vw" />  
<CloudSection bottom={70} left={50} width="60vw" />   
<CloudSection bottom={50} left={-10} width="60vw" />  
<CloudSection bottom={50} left={40} width="60vw" />   
<CloudSection bottom={30} left={-5} width="60vw" />  
<CloudSection bottom={30} left={35} width="60vw" /> 
</div>
                <Integration/>
                <KeyFeatureSection />
                <Elevate />
                <Plans/>
                <SuccessStories/>
                <Blogs/>
             
               <FaqSection/>
               <ContactUsSection/>
             <Footer/>
              </div>
              
                {/* Rays */}
                <div className="w-[100%] h-[117.5rem] absolute top-[0rem] left-[0rem] z-[1] animate-cloudMove" >
                    <Image src="/images/homeImages/rays.png" width={1024} height={1024} alt="logo" className="w-[100%] h-[100%] imageDrag opacity-80 z-[1]" />
                </div>

<CloudSection bottom={20} left={0} />
<CloudSection bottom={57} left={0} opacity={0.7} />
<CloudSection bottom={65} left={0} opacity={0.7} />
<CloudSection bottom={8} left={0} opacity={0.5} />

            </div>

        </>
    )
}

export default HomeContainer