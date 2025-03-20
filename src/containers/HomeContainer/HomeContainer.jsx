import About from "@/components/HomeComponent/AboutSection/About"
import ChooseUs from "@/components/HomeComponent/ChooseUs/ChooseUs"
import FaqSection from "@/components/HomeComponent/FaqSection/FaqSection"
import Footer from "@/components/HomeComponent/Footer/Footer"
import HeroSection from "@/components/HomeComponent/HeroSection/HeroSection"
import NeedHelp from "@/components/HomeComponent/NeedHelp/NeedHelp"
import Plans from "@/components/HomeComponent/Plans/Plans"
import SuccessStories from "@/components/HomeComponent/SuccessStories/SuccessStories"
import Image from "next/image"

const HomeContainer = () => {
    return (
        <>
            <div className="mainContainer bg-[url(/images/homeImages/grain.png)]  w-[100%] min-h-[100vh]">
                <HeroSection />
                <About />
                <ChooseUs/>
                <Plans/>
               <NeedHelp/>
               <SuccessStories/>
               <FaqSection/>
               <Footer/>

                {/* Rays */}

                <div className="w-[100%] h-[117.5rem] absolute top-[0rem] left-[0rem] z-[1]" >
                    <Image src="/images/homeImages/rays.png" width={1024} height={1024} alt="logo" className="w-[100%] h-[100%] imageDrag opacity-80 z-[1]" />
                </div>

            </div>
        </>
    )
}

export default HomeContainer