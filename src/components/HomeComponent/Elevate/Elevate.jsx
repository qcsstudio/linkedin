import React from 'react'
import Heading from '../Heading/Heading'
import Link from 'next/link'

const Elevate = () => {
    
    return (
        <>
            <div id='getStarted' className="aboutSection w-[100%] bg-[#5E788F]/85 px-[3.37rem] text-[#D8DFE5]  py-[2.8rem] z-[10]">

                {/* Inner Container */}
                <div className="innerAboutContainer w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] px-[3.12rem] py-[2.8rem] z-[10]">

                    {/* Lower Container */}
                    <div className="lowerContainer w-[100%] z-[10] flex gap-7 justify-between align-middle items-center">

                        {/* Left Container */}

                        <div className="leftAboutContainer w-[50%] z-[10]">

                            <div className="headingContainer">
                                <p className="heading text-[2.25rem] leading-tight  text-[#0E1C29]">Ready to Elevate Your Social Media Game?</p>
                            </div>
                            

                            <div className="descriptionContainer max-w-xl text-[1.12rem] tracking-wide mt-[1rem] text-[#212121]">Join thousands of marketers, creators, and businesses who are revolutionizing their social media presence with ElevatrX. Experience firsthand how our AI-driven tools effortlessly streamline your content creation, scheduling, and analytics—giving you the freedom to focus on growing your business.</div>

                            <div className="buttonContainer flex gap-[1rem] mt-[1.8rem]">
                                <Link href='/register'><button className="px-[2.37rem] py-[.70rem] flex justify-center items-center bg-[rgb(14,28,41)] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white w-[320px] rounded-lg text-[.93rem] cursor-pointer">Start Your Free 14-Day Trial Now</button></Link>
                                <Link href='/register'><button className="px-[2.37rem] py-[.70rem] w-[236px] flex justify-center items-center bg-[#FFFFFF]/20 border border-[#ffffff] text-white  rounded-lg text-[.93rem] cursor-pointer">Explore Pricing Plans</button></Link>
                            </div>
                        </div>

                        {/* Right Container */}
                        <div className=" flex gap-2 w-[50%] rounded-lg bg-[#FF7171]">
                            <div className=' w-[70%] rounded-[10px] bg-[#9B9B9BCC]'></div>
                            <div className='flex w-[40%] flex-col gap-3'>
                                <div className='w-[100%] h-[130px] rounded-lg bg-[#9B9B9BCC]'></div>
                                <div className='w-[100%] h-[179px] rounded-lg bg-[#9B9B9BCC]'></div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Elevate