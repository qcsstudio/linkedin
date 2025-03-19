import Image from "next/image";

export default function Home() {
  return <>
        <div className="heroSection w-[100%] bg-[#5E788F]/85 h-[100vh] relative overflow-x-hidden ">

            {/* Inner Container */}
            <div className="innerHeroContainer w-[100%] h-[100%] flex flex-col justify-center items-center z-[2] select-none">

                {/* Logo Container   */}
                <div className="logoContainer w-[100%] flex justify-center mb-[2.81rem] z-[2]">
                    <Image src="/images/homeImages/logo.svg" width={95} height={95} alt="logo" className="w-[5.93rem] h-[5.93rem] imageDrag" />
                </div>

                {/* heading Container   */}
                <div className="headingContainer w-[100%] flex justify-center mb-[2.18rem] z-[2]">
                    <h1 className="heading text-[3.43rem] w-[70%] font-medium text-center text-[#000000] leading-tight">Transform Your Social Media Presence with AI-Powered Automation</h1>
                </div>

                {/* description Container   */}
                <div className="descriptionContainer w-[100%] flex justify-center items-center mb-[1.87rem] z-[2]">
                    <p className="w-[70%] text-[1.12rem] text-center" >Intelligently automating content creation, scheduling, and analytics. Effortlessly boost brand visibility, increase audience engagement, and reclaim hours every week</p>
                </div>

                {/* button Container   */}
                <div className="buttonsContainer w-[40%] flex justify-center  gap-[1.25rem] z-[2]">
                    <button className="px-[2.37rem] py-[.70rem] flex justify-center items-center bg-[rgb(14,28,41)] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white  rounded-lg text-[.93rem] ">Start 14 Day Free Trial</button>

                    <button className="px-[2.37rem] py-[.70rem] flex justify-center items-center bg-[#FFFFFF]/20 border border-[#ffffff] text-white  rounded-lg text-[.93rem]">Watch Demo</button>
                </div>

            </div>

            {/* BG IMAGES */}
            <div className="cloudContainer h-[36.43rem] w-[56.25rem] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] ">
                <Image src="/images/homeImages/cloud.png" width={1024} height={1024} alt="cloud" className="w-[100%] h-[100%] imageDrag" />
            </div>


        </div>  
  </>
}
