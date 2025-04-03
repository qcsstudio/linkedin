'use client'
import Heading from "../Heading/Heading"
import Link from "next/link"
import about from '../../../../public/images/homeImages/about.svg'
import Image from "next/image"

const About = () => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="aboutSection w-[100%] px-4 lg:px-[3.37rem] md:px-[3.12rem]   z-[10] flex justify-center">

                {/* Inner Container */}
                <div className="innerAboutContainer w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] px-4 md:px-[3.12rem] lg:px-[3.12rem] py-[1.5rem] z-[10]">

                    {/* Upper Container */}
                    <Heading heading={"About ElevatrX"} />

                    {/* Lower Container */}
                    <div className="lowerContainer w-[100%] z-[10] flex flex-col-reverse gap-4 lg:gap-0 md:gap-0 lg:flex-row justify-between items-center lg:items-start">

                        {/* Left Container */}
                        <div className="leftAboutContainer w-[100%] lg:w-[60%] z-[10] text-center lg:text-left">

                            <div className="headingContainer">
                                <p className="heading text-[1rem] md:text-[2rem] lg:text-[2.25rem] leading-tight text-[#0E1C29] font-semibold">
                                    Smart Social Media Automation Designed for Real Results
                                </p>
                            </div>

                            <div className="descriptionContainer text-[.9rem] md:text-[1.12rem] lg:text-[1.12rem] mt-[1rem] text-[#212121]">
                                ElevatrX is your AI-powered assistant for seamless social media management. Whether you're a solo entrepreneur or a growing business, our intuitive platform automates content creation, scheduling, and analytics. Save time, streamline your strategy, and focus on growth with ElevatrX.
                            </div>

                            <div className="buttonContainer flex flex-col md:flex-row lg:flex-row gap-y-3 sm:gap-x-[1rem] mt-[1.8rem] items-center w-full">
                                <Link href='/register' className="w-full sm:w-auto">
                                    <button className="w-full sm:w-auto px-[2.37rem] py-[.70rem] flex justify-center items-center bg-[rgb(14,28,41)] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white rounded-lg text-[.93rem] cursor-pointer">
                                        Start 14 Day Free Trial
                                    </button>
                                </Link>
                                <button onClick={() => scrollToSection("pricing")}
                                    className="w-full sm:w-auto px-[2.37rem] py-[.70rem] flex justify-center items-center bg-[#FFFFFF]/20 border border-[#ffffff] text-white rounded-lg text-[.93rem] cursor-pointer">
                                    Explore Plans
                                </button>
                            </div>

                        </div>

                        {/* Right Container */}
                        <div className="rightAboutContainer w-[100%] lg:w-[40%] mt-[2rem] lg:mt-0 flex justify-center lg:justify-start">
                            <Image src={about} alt='about image' className="imageContainer object-contain w-[100%] h-[10rem] lg:h-[20rem]  rounded"></Image>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
