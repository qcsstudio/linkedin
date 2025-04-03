import Image from "next/image"
import Description from "../Description/Description"

// Images Import ---------------------------------------------
import logo from "../../../../public/images/integrationImages/logo.svg"
import instagram from "../../../../public/images/integrationImages/instagram.svg"
import linkedin from "../../../../public/images/integrationImages/linkedin.svg"
import facebook from "../../../../public/images/integrationImages/facebook.svg"
import pintrest from "../../../../public/images/integrationImages/pintrest.svg"
import youtube from "../../../../public/images/integrationImages/youtube.svg"
import x from "../../../../public/images/integrationImages/x.svg"
import leftLine from "../../../../public/images/integrationImages/left.png"
import rightLine from "../../../../public/images/integrationImages/right.png"
import Heading from "../Heading/Heading"
import Subheading from "../Subheading/Subheading"
import CloudSection from "../CloudSection/CloudSection"

const Integration = () => {
    return (
        <>
            {/* Main Container */}

            <div id="integration" className="relative mainContainer w-[100%]  px-4 lg:px-[3.37rem] md:px-[3.12rem] ">

            <CloudSection bottom={-20} left={0} opacity={0.7} />
                {/* Inner Container */}
                <div className=" innerContainer bg-[#FFFFFF]/35 w-[100%] rounded-[.5rem] px-4 md:px-[3.12rem] lg:px-[3.12rem] py-[1.5rem] z-20">

                    {/* Upper Container */}

                    
                  
                    <Heading heading={"Integrations"}/>

                    {/* Middle Container */}
                    <div className='middleContainer w-[100%] flex flex-col items-center z-20'>
                        <Subheading subHeading={"Seamless Integrations That Power Your Social Media Strategy"}/>
                        
                        <Description description={"ElevatrX is your AI-powered assistant for seamless social media management. Whether you're a solo entrepreneur or a growing business, our intuitive platform automates content creation, scheduling, and analytics. Save time, streamline your strategy, and focus on growth with ElevatrX."}/>
                            <div className="buttonContainer flex gap-[1rem] "></div>
                    </div>

                    {/* Lower Container */}
                    <div className='lowerContainer w-[100%]  flex justify-center items-center z-20'>

                        <div className="innerLowerContainer relative w-[70%] md:w-[90%] lg:w-[90%] h-[15rem] md:h-[29.18rem]  lg:h-[29.18rem] z-20">

                            {/* Middle Icon */}
                            <div className="middleIcon hidden md:block lg:block w-[6rem] h-[6rem] bg-[#ffffff] rounded-[1.2rem] p-[.4rem] absolute left-1/2 top-1/2 transfrom -translate-x-1/2 -translate-y-1/2 shadow-[0px_28px_56px_-31px_rgba(218,235,248,1)] z-20">

                                <div className="middleIcon w-[100%] h-[100%] bg-[#0E1C29] rounded-[1.2rem] p-[.5rem] shadow-[0px_15px_42px_-24px_rgba(0,0,0,1)] z-20">
                                    <Image src={logo} width={1024} height={1024} alt="logo"  className=" w-[100%] h-[100%] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] z-20" />
                                </div>

                            </div>

                            {/* Left line Images */}
                            <div className=" hidden md:block lg:block leftLines w-[40%] h-[24.25rem] absolute top-1/2 transform  -translate-y-1/2 left-[10%] z-10">

                                <Image src={leftLine} width={1024} height={1024} alt="logo"  className=" w-[100%] h-[100%] z-20" />

                            </div>

                            {/* Right line Images */}
                            <div className="hidden md:block lg:block rightLines w-[40%] h-[24.25rem] absolute top-1/2 transform -translate-y-1/2 right-[10%] z-10">

                                <Image src={rightLine} width={1024} height={1024} alt="logo"  className=" w-[100%] h-[100%] z-20" />

                            </div>

                            {/* left Social logos */}
                            {/* linkedin */}
                            <div className="middleIcon w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[6rem] lg:h-[6rem] bg-[#ffffff] rounded-[1.2rem] p-[.4rem] absolute top-1/8 transfrom  -translate-y-1/8  border-t border-[4px] border-[rgba(218,235,248,1)]/50 flex justify-center items-center z-20">

                                <Image src={linkedin} width={1024} height={1024} alt="logo"  className=" w-[70%] h-[70%] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] z-20" />

                            </div>

                            {/* linkedin logos */}
                            <div className="middleIcon w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[6rem] lg:h-[6rem] bg-[#ffffff] rounded-[1.2rem] p-[.4rem] absolute bottom-[0%] transfrom  border-t border-[4px] border-[rgba(218,235,248,1)]/50 flex justify-center items-center z-20">

                                <Image src={instagram} width={1024} height={1024} alt="logo"  className=" w-[70%] h-[70%] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] z-20" />

                            </div>

                            {/* facebook logos */}
                            <div className="middleIcon w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[6rem] lg:h-[6rem] bg-[#ffffff] rounded-[1.2rem] p-[.4rem] absolute top-1/2 transfrom -translate-y-1/2 left-[0%] md:left-[5%] lg:left-[5%]  border-t border-[4px] border-[rgba(218,235,248,1)]/70 flex justify-center items-center z-20">

                                <Image src={facebook} width={1024} height={1024} alt="logo"  className=" w-[70%] h-[70%] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] z-20" />

                            </div>

                            {/* right Social logos */}
                            {/* x */}
                            <div className="middleIcon w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[6rem] lg:h-[6rem] bg-[#ffffff] rounded-[1.2rem] p-[.4rem] absolute top-1/8 transfrom  -translate-y-1/8 right-[0%]  border-t border-[4px] border-[rgba(218,235,248,1)]/50 flex justify-center items-center z-20">

                                <Image src={x} width={1024} height={1024} alt="logo"  className=" w-[70%] h-[70%] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] z-20" />

                            </div>

                            {/* pintrest logos */}
                            <div className="middleIcon w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[6rem] lg:h-[6rem] bg-[#ffffff] rounded-[1.2rem] p-[.4rem] absolute bottom-[0%] right-[0%] transfrom  border-t border-[4px] border-[rgba(218,235,248,1)]/50 flex justify-center items-center z-20">

                                <Image src={youtube} width={1024} height={1024} alt="logo"  className=" w-[70%] h-[70%] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] z-20" />

                            </div>

                            {/* youtube logos */}
                            <div className="middleIcon w-[4rem] h-[4rem] md:w-[6rem] md:h-[6rem] lg:w-[6rem] lg:h-[6rem] bg-[#ffffff] rounded-[1.2rem] p-[.4rem] absolute top-1/2 transfrom -translate-y-1/2 right-[0%] md:right-[5%] lg:right-[5%]  border-t border-[4px] border-[rgba(218,235,248,1)]/70 flex justify-center items-center z-20">

                                <Image src={pintrest} width={1024} height={1024} alt="logo"  className=" w-[70%] h-[70%] drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] z-20" />

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Integration