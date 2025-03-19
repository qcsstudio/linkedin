'use client'
import React from 'react'
import Image from 'next/image'
import cloud from '../../../../public/images/homeImages/cloud.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import profile from '../../../../public/images/homeImages/profile.png'

const SuccessStories = () => {
    const testimonials = [
        {
            image: profile,
            name: "Rahul Sharma",
            position: "CEO, BrandHive Agency",
            review:
                "ElevatrX completely changed our agency’s workflow. We're saving countless hours every week, and the results speak for themselves! Highly recommended!",
        },
        {
            image: profile,
            name: "Neha Desai",
            position: "Content Marketing Specialist",
            review:
                "I've tried many automation tools before, but ElevatrX’s AI-driven content creation is next-level. It literally doubled our LinkedIn engagement in a month!",
        },
        {
            image: profile,
            name: "Vibhor Malhotra",
            position: "Social Media Manager, TechSolutions",
            review: "With ElevatrX, managing multiple social profiles is effortless. It's like having an extra team member dedicated solely to social media!",
        },
        {
            image: profile,
            name: "Priya Kapoor",
            position: "Digital Strategist",
            review:
                "The analytics provided by ElevatrX are phenomenal. We finally understand our audience deeply and create consistent, high-performing content!",
        },
        {
            image: profile,
            name: "Priya Kapoor",
            position: "Digital Strategist",
            review:
                "The analytics provided by ElevatrX are phenomenal. We finally understand our audience deeply and create consistent, high-performing content!",
        },
        {
            image: profile,
            name: "Priya Kapoor",
            position: "Digital Strategist",
            review:
                "The analytics provided by ElevatrX are phenomenal. We finally understand our audience deeply and create consistent, high-performing content!",
        },
    ];

  return (
     <div className=" w-[100%]  bg-[#5E788F]/85 px-[3.3rem] pb-[1.87rem] relative   z-10">
                <div className="cloudContainer h-full w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] ">
                    <Image src={cloud} alt="cloud" className="w-full h-[100%] imageDrag" />
                </div>
                <div className="innerContainer flex flex-col gap-12 justify-center items-center w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10]  pb-[3rem] px-[7.0625rem]">
    
    
                    <div>
                        <p className="aboutHeading text-[6.25rem] text-center opacity-30">
                        Success Stories
                        </p>
                        <div className="upperContainer w-[100%] gap-3 z-[10] flex flex-col justify-center items-center">
                            <p className="text-[3rem] font-semibold text-center text-white/50">
                            See Why Thousands of Users Love ElevatrX
                            </p>
                            <p className="text-white/50 text-xl text-center max-w-6xl leading-8">Welcome to the ElevatrX Blog—your go-to resource for mastering social media automation, content strategy, and analytics. Explore expert tips, case studies, and AI-powered insights to grow your brand effortlessly.</p>
                           
                        </div>
    
                    </div>
                    <div className="w-full ">
                    <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 2000 }}
                // pagination={{ clickable: true }}
                // navigation
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 10 },  
                    1024: { slidesPerView: 3, spaceBetween: 10 }, 
                }}
                className="pb-10"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index} className="flex items-stretch">
                    <div className="p-6 w-full min-h-[300px] bg-white/50 rounded-xl gap-2 text-white shadow-lg flex flex-col justify-between items-start">
                        <Image src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mb-4" />
                        <p className=" text-xl flex-grow">{testimonial.review}</p>
                        <h4 className="mt-4 text-xl font-semibold">{testimonial.name}</h4>
                        <p className="text-xl opacity-75">{testimonial.position}</p>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>

                    </div>
            </div>
           
            </div>
  )
}

export default SuccessStories
