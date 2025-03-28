import Image from "next/image";
import Link from "next/link";
 import logo from '../../../../public/images/homeImages/logo.svg'

export default function Home() {
  return (
    <div className="heroSection w-full h-screen  relative overflow-hidden pt-16 flex flex-col items-center justify-center px-4 ">
      
      {/* Inner Container */}
      <div className="innerHeroContainer w-full h-full flex flex-col  gap-3 md-gap-6 lg:gap-6  justify-center items-center text-center z-[2] select-none">

        {/* Logo Container */}
        <div className="flex flex-col-reverse md:flex-col lg:flex-col gap-3 md-gap-6 lg:gap-6 ">

        
        <div className="logoContainer w-full flex justify-center  ">
          <Image src={logo} width={95} height={95} alt="logo" className="w-14 h-16 lg:w-20 lg:h-20 imageDrag" />
        </div>

        {/* Heading Container */}
        <div className="headingContainer w-full flex justify-center ">
          <h1 className="text-xl md:text-4xl lg:text-6xl font-medium text-[#0E1C29] leading-tight w-[80%] ">
            Transform Your Social Media Presence with AI-Powered Automation
          </h1>
        </div>
        </div>

        {/* Description Container */}
        <div className="descriptionContainer w-full flex justify-center items-center">
          <p className="w-[80%]  text-sm md:text-md lg:text-lg text-[#212121]">
            Intelligently automating content creation, scheduling, and analytics. Effortlessly boost brand visibility, increase audience engagement, and reclaim hours every week.
          </p>
        </div>

        {/* Button Container */}
        <div className="buttonsContainer w-full sm:w-1/2 flex flex-col sm:flex-row justify-center gap-4">
          <Link href='/register' className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#0E1C29] to-[#323D68] text-white rounded-lg text-sm">
              Start 14 Day Free Trial
            </button>
          </Link>
          <button className="w-full sm:w-auto px-6 py-3 bg-white/20 border border-white text-white rounded-lg text-sm">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Background Image */}
      <div className="cloudContainer absolute  transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[900px] opacity-60 sm:opacity-100">
      <Image src="/images/homeImages/cloud.png" width={1024} height={1024} alt="cloud" className="w-full h-auto imageDrag" />
      </div>

    </div>
  );
}
