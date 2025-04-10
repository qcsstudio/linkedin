import React, { useContext } from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { BlogDataContext } from '@/Context/Blogs.context';
import { useEffect } from 'react';
import Link from 'next/link';


const stripHtmlAndNormalize = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || "";
    return text.replace(/\s+/g, " ").trim();
};
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const numberOfWords = stripHtmlAndNormalize(text).split(/\s+/).length;
    const minutes = Math.ceil(numberOfWords / wordsPerMinute);
    return `${minutes} Minute${minutes > 1 ? "s" : ""} Read`;
}


const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const BlogsSlider = () => {
    const { multipleBlogData, GetBlogData } = useContext(BlogDataContext);

    useEffect(() => {
        if (multipleBlogData.length === 0) {
            GetBlogData();
        }
    }, []);

    return (
        <div className="chooseUsContainer  w-full px-4 lg:px-[3.37rem] md:px-[3.12rem] z-[10]">
            <div className="innerContainer w-full h-full bg-[#FFFFFF]/35 rounded-[.5rem] z-[10] px-4 py-4 md:px-[3.12rem] lg:px-[3.12rem] lg:py-[3.12rem] flex flex-col items-start gap-5">


                <div className="w-full ">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{ delay: 2000 }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 10 },
                            1024: { slidesPerView: 3, spaceBetween: 10 },
                        }}
                        className="pb-10"
                    >
                        {multipleBlogData && multipleBlogData.map((item, index) => (
                          <Link key={item._id} href={`/blogs/${item.heading}`}>  
                          <SwiperSlide key={index} className="flex items-stretch">
                                <div className="w-full h-full bg-[#FFFFFF]/35 border border-[#D8DFE5] rounded-xl p-4 shadow-sm transition-transform hover:scale-[1.01]">
                                    <div className="flex flex-col gap-4 justify-between h-full">


                                        <div className="w-full ">
                                            <div className="w-full  aspect-video bg-white rounded-lg shadow-md" />
                                        </div>


                                      <div>

                                      
                                        <h3 className="text-[#0E1C29] text-lg lg:text-xl font-bold leading-snug mb-2">
                                            {item.heading
                                                .replace(/_/g, " ")
                                                .split(" ")
                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(" ")}
                                        </h3>


                                        <p
                                            className="text-[#212121] text-sm lg:text-base mb-4 line-clamp-3"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    stripHtmlAndNormalize(item.description)
                                                        .split(" ")
                                                        .slice(0, 18)
                                                        .join(" ") + "...",
                                            }}
                                        />


                                        <div className="flex items-center justify-between text-sm text-[#5E788F]">
                                            <span>{formatDate(item.date || new Date())}</span>
                                            <Link key={item._id} href={`/blogs/${item.heading}`}>        <span >{calculateReadingTime(item.description)}</span> </Link>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </SwiperSlide>
                            </Link>
                        ))}
                    </Swiper>
                </div>

            </div>
        </div>
    );
};

export default BlogsSlider;
