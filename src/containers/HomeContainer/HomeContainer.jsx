import About from "@/components/HomeComponent/AboutSection/About"
import Blogs from "@/components/HomeComponent/Blogs/Blogs"
import ChooseUs from "@/components/HomeComponent/ChooseUs/ChooseUs"
import Footer from "@/components/HomeComponent/Footer/Footer"
import HeroSection from "@/components/HomeComponent/HeroSection/HeroSection"
import Integration from "@/components/HomeComponent/Integration/Integration"
import NeedHelp from "@/components/HomeComponent/NeedHelp/NeedHelp"
import Plans from "@/components/HomeComponent/Plans/Plans"
import SuccessStories from "@/components/HomeComponent/SuccessStories/SuccessStories"
import Image from "next/image"
import cloud from "../../../public/images/blogsImages/Cloud.png"
import KeyFeatureSection from "@/components/HomeComponent/KeyFeature/KeyFeatureSection"
import Elevate from "@/components/HomeComponent/Elevate/Elevate"

const HomeContainer = () => {
    return (
        <>
            <div className="mainContainer relative bg-[url(/images/homeImages/grain.png)]  w-[100%] min-h-[100vh] overflow-hidden">
                <HeroSection />
                <About />
                <Integration/>
                <ChooseUs/>
                <KeyFeatureSection />
                <Elevate />
                <Plans/>
                <SuccessStories/>
                <Blogs/>
               <NeedHelp/>

 

               <Footer/>
                {/* Rays */}

                <div className="w-[100%] h-[117.5rem] absolute top-[0rem] left-[0rem] z-[1]" >
                    <Image src="/images/homeImages/rays.png" width={1024} height={1024} alt="logo" className="w-[100%] h-[100%] imageDrag opacity-80 z-[1]" />
                </div>

                {/* cloud */}
                <div className="clouds w-[100vw] h-[65.3rem] absolute bottom-[5%] left-[0%] z-0">
                    <Image src={cloud} width={1024} height={1024} alt="cloud" className="w-[100%] h-[100%] z-20"  />
                </div>

                <div className="clouds w-[100vw] h-[65.3rem] absolute bottom-[48%] left-[0%] z-0 ">
                    <Image src={cloud} width={1024} height={1024} alt="cloud" className="w-[100%] h-[100%] z-20 opacity-70"  />
                </div>

            </div>

        </>
    )
}

export default HomeContainer