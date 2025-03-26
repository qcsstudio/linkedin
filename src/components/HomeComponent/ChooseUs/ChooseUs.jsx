'use client'
import CardChooseUs from "./CardChooseUs";
import Heading from "../Heading/Heading";
import Subheading from "../Subheading/Subheading";
import Description from "../Description/Description";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaWandMagicSparkles } from "react-icons/fa6";

import { LuCalendarClock } from "react-icons/lu"; 
import { TbChartBar } from "react-icons/tb"; 
import { LuFiles } from "react-icons/lu"; 

const ChooseUs = () => {
    const features = [
        {
            icon: <FaWandMagicSparkles size={40} className="text-[#0E1C29]" />, 
            heading: "AI-Powered Content Creation",
            description: "Instantly generate engaging posts, viral hashtags, and compelling captions tailored perfectly to your audience's preferences."
        },
        {
            icon: <LuCalendarClock size={40} className="font-thin text-[#0E1C29]" />, 
            heading: "Automated Scheduling & Posting",
            description: "Schedule content effortlessly across multiple platforms, and let ElevatrX auto-publish your posts at peak engagement times."
        },
        {
            icon: <TbChartBar size={40} className="text-[#0E1C29]" />, 
            heading: "Real-time Engagement Analytics",
            description: "Get detailed insights into your social media performance, audience behavior, and competitor activities with easy-to-read reports."
        },
        {
            icon: <LuFiles size={40} className="text-[#0E1C29]" />, 
            heading: "Seamless Multi-Platform Management",
            description: "Effortlessly manage all your social media channels, including Facebook, Instagram, Twitter, and LinkedIn, from a single dashboard."
        }
    ];



    return (
        <div className="chooseUsContainer w-[100%] 5 px-[3.3rem]  z-[10]">
            <div className="innerContainer w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10] pt-[1rem] pb-[3rem] px-[7.0625rem]">
                <Heading heading={"Why Choose Us"} />
                <div className="flex flex-col justify-center items-center middleContainer w-[100%] z-[10]">
                    <Subheading subHeading={"Why ElevatrX is the Ultimate AI-Driven Social Media Solution"} />
                    <Description description={"Social media marketing shouldn’t feel like rocket science. With ElevatrX, experience smarter, easier, and stress-free social media management powered by cutting-edge AI. Here’s why leading marketers choose ElevatrX every day."} />
                </div>
                <div className="w-full z-[10]">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        autoplay={{ delay: 2000 }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 10 },  
                            1024: { slidesPerView: 3, spaceBetween: 10 }, 
                        }}
                        className="pb-10"
                    >
                        {features.map((feature, index) => (
                            <SwiperSlide key={index} className="flex items-center justify-center rounded-lg">
                                <div className="p-6 w-full min-h-[270px] bg-white/50 rounded-xl shadow-lg flex flex-col justify-between items-start ">
                                   {feature.icon}
                                    <h4 className="text-xl text-start tracking-wider font-semibold text-[#0E1C29] ">{feature.heading}</h4>
                                    <p className="text-start text-[#0E1C29]/75 ">{feature.description}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;
