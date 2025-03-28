import { sliderData } from "@/data/homePageSlider.data"
import BlogCard from "./BlogCard"
import Image from "next/image"
import cloud from "../../../../public/images/blogsImages/Cloud.png"
import Heading from "../Heading/Heading"
import Subheading from '../Subheading/Subheading'
import Description from '../Description/Description'

const Blogs = () => {
    return (
        <>
            <div className="blogsContainer flex justify-center mx-auto relative w-[100%]   px-4 lg:px-[3.37rem] md:px-[3.12rem]   overflow-hidden ">

                {/* Inner Container */}
                <div className="innerContainer w-[100%] px-4 md:px-[3.12rem] lg:px-[3.12rem] py-[1.5rem] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10]">

                    {/* Upper Container */}
                    <Heading heading={"Blog's"}></Heading>

                    {/* Middle Container */}
                    <div className='middleContainer flex flex-col  items-center z-[10]'>

                        
                       

                        <Subheading subHeading={"Insights, Tips, and Trends to Elevate Your Social Media Game"}/>
                        
                        <Description description={"Welcome to the ElevatrX Blog—your go-to resource for mastering social media automation, content strategy, and analytics. Explore expert tips, case studies, and AI-powered insights to grow your brand effortlessly."}/>
                    </div>

                    {/* Lower Container */}
                    <div className="relative justify-center mx-auto  w-full h-[20rem] z-[10] flex items-center">
                        {sliderData.map((item, index) => (
                            <div
                                key={item.id}
                                className={`card peer absolute w-[30.75rem] h-[19.18rem] bg-gradient-to-r from-[rgba(94,120,143,1)] to-[rgba(240,248,255,1)] 
          rounded-[.5rem] p-[0.5rem] transition-transform duration-300 ease-in-out`}
                                style={{ left: `${index * 13}rem` }} // Initial positioning
                            >
                                {/* Hover effect: Moves the next cards to fully uncover */}
                                {sliderData.slice(index + 1).map((_, shiftIndex) => (
                                    <style key={shiftIndex}>
                                        {`
                .peer:hover ~ .card:nth-child(${index + shiftIndex + 2}) {
                  transform: translateX(${(shiftIndex + 1) * 18}rem); /* Move by full card width */
                }
              `}
                                    </style>
                                ))}

                                {/* Card Content */}
                                <div className="borderContainer w-full h-full border-[2px] border-[#D8DFE5] rounded-[.5rem] p-[0.5rem]">
                                    <div className="dottedBorder w-full h-full border-2 border-dashed border-[#D8DFE5] rounded-[.5rem] px-[1.3rem] flex flex-col justify-center">
                                        <div className="upperContainer">
                                            <p className="heading text-[1.87rem] font-bold text-[#ffffff]">
                                                {item.heading}
                                            </p>
                                        </div>
                                        <div className="middleContainer mt-[.5rem] mb-[1rem]">
                                            <p className="description text-[1rem] text-[#FFFFFF] leading-tight">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="lowerContainer">
                                            <button className="bg-[rgb(14,28,41)] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white px-[2.37rem] py-[0.5rem] rounded-[.5rem]">
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