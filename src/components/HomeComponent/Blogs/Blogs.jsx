'use client'
import { sliderData } from "@/data/homePageSlider.data"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import BlogCard from "./BlogCard"
import Image from "next/image"
import cloud from "../../../../public/images/blogsImages/Cloud.png"
import Heading from "../Heading/Heading"
import Subheading from '../Subheading/Subheading'
import Description from '../Description/Description'
import CloudSection from "../CloudSection/CloudSection"

const Blogs = () => {
  return (
    <>
      <div id='blog' className="relaive blogsContainer flex justify-center mx-auto relative w-[100%]   px-4 lg:px-[3.37rem] md:px-[3.12rem]   overflow-hidden ">
        <CloudSection bottom={-20} left={0} opacity={0.7} />
        {/* Inner Container */}
        <div className="innerContainer w-[100%] px-4 md:px-[3.12rem] lg:px-[3.12rem] py-[1.5rem] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10]">

          {/* Upper Container */}
          <Heading heading={"Blog's"}></Heading>

          {/* Middle Container */}
          <div className='middleContainer flex flex-col  items-center z-[10]'>




            <Subheading subHeading={"Insights, Tips, and Trends to Elevate Your Social Media Game"} />

            <Description description={"Welcome to the ElevatrX Blog—your go-to resource for mastering social media automation, content strategy, and analytics. Explore expert tips, case studies, and AI-powered insights to grow your brand effortlessly."} />
          </div>

          <div className="w-full  lg:hidden ">
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
              
              {sliderData.map((item, index) => (
                <SwiperSlide key={index} className=" flex  items-stretch   ">
                  <div className="borderContainer  w-full h-full border-[2px] border-[#D8DFE5] rounded-[.5rem] p-[0.5rem]">
                    <div className="dottedBorder min-h-[200px] md:min-h-[280px] p-2 text-sm bg-gradient-to-r from-[rgba(94,120,143,1)] to-[rgba(240,248,255,1) justify-between gap-4 w-full h-full border-2 border-dashed border-[#D8DFE5] rounded-[.5rem] px-[1.3rem] flex flex-col ">
                      <div className="upperContainer">
                        <p className="heading text-[1rem] md:text-[1.2rem] leading-tight lg:text-[1.87rem] font-bold text-[#ffffff]">
                          {item.heading}
                        </p>
                      </div>
                      <div className="middleContainer ">
                        <p className="description text-[.6rem] md:text-[.8rem] text-[#0E1C29] lg:text-[1rem]  leading-tight">
                          {item.description}
                        </p>
                      </div>
                      <div className="lowerContainer">
                        <button className="bg-[rgb(14,28,41)] text-[.5rem] md:text[1rem] lg:text-[1rem] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white px-[2.37rem] py-[0.5rem] rounded-[.5rem]">
                          {item.btnText}
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

          </div>


          {/* Lower Container */}
          <div className="relative justify-center mx-auto w-full z-[10] gap-4 lg:gap-0 flex flex-col lg:flex-row lg:justify-start items-center lg:h-[20rem]">



            {sliderData.map((item, index) => (
              <div
                key={item.id}
                className={`card w-full min-h-[300px] xl:h-full hidden lg:block  lg:w-[30.75rem] h-auto lg:h-[19.18rem] bg-gradient-to-r from-[rgba(94,120,143,1)] to-[rgba(240,248,255,1)] 
        rounded-[.5rem] p-[0.5rem] transition-transform duration-300 ease-in-out peer lg:absolute`} // Peer applies only on large screens
                style={index !== 0 ? { left: `${index * 13}rem` } : {}} // Only for large screens
              >
                {/* Apply hover effect only on large screens */}
                <style>
                  {`
        @media (min-width: 1024px) { 
          .peer:hover ~ .card {
            transform: translateX(18rem); /* Move all next cards when hovering */
          }
        }
        `}
                </style>

                {/* Card Content */}
                <div className="borderContainer  w-full h-full border-[2px] border-[#D8DFE5] rounded-[.5rem] p-[0.5rem]">
                  <div className="dottedBorder justify-between w-full h-full border-2 border-dashed border-[#D8DFE5] p-2 rounded-[.5rem] px-[1.3rem] flex flex-col ">
                    <div className="upperContainer">
                      <p className="heading text-[1rem] md:text-[1.5rem] leading-tight lg:text-[1.87rem] font-bold text-[#ffffff]">
                        {item.heading}
                      </p>
                    </div>
                    <div className="middleContainer ">
                      <p className="description text-[.5rem] md:text-[1rem] text-[#0E1C29] lg:text-[1rem]  leading-tight">
                        {item.description}
                      </p>
                    </div>
                    <div className="lowerContainer">
                      <button className="bg-[rgb(14,28,41)] text-[.5rem] md:text[1rem] lg:text-[1rem] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white px-[2.37rem] py-[0.5rem] rounded-[.5rem]">
                        {item.btnText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>



      </div>
    </>
  )
}

export default Blogs