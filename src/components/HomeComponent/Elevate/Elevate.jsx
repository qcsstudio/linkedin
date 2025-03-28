'use client'
import React from 'react'
import Heading from '../Heading/Heading'
import Link from 'next/link'

const Elevate = () => {
    
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      };
    return (
        <>
            <div id='getStarted' className="aboutSection w-[100%] px-4 lg:px-[3.37rem] md:px-[3.12rem] text-[#D8DFE5] z-[10]">

                {/* Inner Container */}
                <div className="innerAboutContainer w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem]  px-4 md:px-[3.12rem] lg:px-[3.12rem] py-[1.5rem] z-[10]">

                    {/* Lower Container */}
                    <div className="lowerContainer w-[100%] z-[10] flex flex-col-reverse lg:flex-row  gap-7 justify-between align-middle items-center">

                        {/* Left Container */}

                        <div className="leftAboutContainer w-[100%]  lg:w-[50%] z-[10]">

                            <div className="headingContainer">
                                <p className="heading text-[1.5rem] lg:text-[2.25rem] leading-tight  text-[#0E1C29]">Ready to Elevate Your Social Media Game?</p>
                            </div>
                            

                            <div className="descriptionContainer max-w-xl text-[.8rem] lg:text-[1.12rem] md:text-[1.12rem] tracking-wide mt-[1rem] text-[#212121]">Join thousands of marketers, creators, and businesses who are revolutionizing their social media presence with ElevatrX. Experience firsthand how our AI-driven tools effortlessly streamline your content creation, scheduling, and analytics—giving you the freedom to focus on growing your business.</div>

                            <div className="buttonContainer flex flex-col md:flex-row lg:flex-row gap-y-3 sm:gap-x-[1rem] mt-[1.8rem] items-center w-full">
                                                            <Link href='/register' className="w-full sm:w-auto">
                                                                <button className="w-full sm:w-auto px-[2.37rem] py-[.70rem] flex justify-center items-center bg-[rgb(14,28,41)] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white rounded-lg text-[.93rem] cursor-pointer">
                                                                    Start 14 Day Free Trial
                                                                </button>
                                                            </Link>
                                                            <button onClick={() => scrollToSection("pricing")}
                                                                className="w-full sm:w-auto px-[1rem] py-[.70rem] flex justify-center items-center bg-[#FFFFFF]/20 border border-[#ffffff] text-white rounded-lg text-[.93rem] cursor-pointer">
                                                                Explore Plans
                                                            </button>
                                                        </div>

                        </div>

                        {/* Right Container */}
                        <div className=" flex gap-2 w-[100%]  lg:w-[50%] rounded-lg bg-[#FF7171]">
                            <div className=' w-[70%] rounded-[10px] bg-[#9B9B9BCC]'></div>
                            <div className='flex w-[40%] flex-col gap-3'>
                                <div className='w-[100%] h-[4rem] lg:h-[7rem] rounded-lg bg-[#9B9B9BCC]'></div>
                                <div className='w-[100%] h-[6rem] lg:h-[12rem] rounded-lg bg-[#9B9B9BCC]'></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Elevate