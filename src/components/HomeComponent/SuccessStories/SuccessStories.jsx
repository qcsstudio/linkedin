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
import Heading from '../Heading/Heading';
import Subheading from '../Subheading/Subheading'
import Description from '../Description/Description'
import CloudSection from '../CloudSection/CloudSection';

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
     <div className=" w-[100%]  px-4 lg:px-[3.37rem] md:px-[3.12rem]  relative   z-10">
               <CloudSection bottom={1} left={0} opacity={0.7} />
                <div className="innerContainer   md:px-[3.12rem] lg:px-[3.12rem] flex flex-col gap-12 justify-center items-center w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10] px-4  pb-[3rem] ">
    
    
                    <div>
                    <Heading heading={"Success Stories"}/>
                        <div className="upperContainer w-[100%] gap-3 z-[10] flex flex-col justify-center items-center">
                            
                            <Subheading subHeading={" See Why Thousands of Users Love ElevatrX"}/>
                        
                        <Description description={"Welcome to the ElevatrX Blog—your go-to resource for mastering social media automation, content strategy, and analytics. Explore expert tips, case studies, and AI-powered insights to grow your brand effortlessly."}/>
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
                    <SwiperSlide key={index} className="flex items-stretch ">
                    <div className="success-stories p-6 w-full min-h-[400px] bg-white/60  rounded-xl gap-2  shadow-lg flex flex-col justify-center items-start">
                        <Image src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mb-4" />
                        <p className="text-md lg:text-xl text-start  text-[#0E1C29]">{testimonial.review}</p>
                        <h4 className="text-xl text-start font-semibold text-white">{testimonial.name}</h4>
                        <p className="text-xl text-start opacity-75 text-[#0E1C29]">{testimonial.position}</p>
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
