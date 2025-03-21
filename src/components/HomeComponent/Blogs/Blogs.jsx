import { sliderData } from "@/data/homePageSlider.data"
import BlogCard from "./BlogCard"
import Image from "next/image"
import cloud from "../../../../public/images/blogsImages/Cloud.png"

const Blogs = () => {
    return (
        <>
            <div className="blogsContainer flex justify-center mx-auto relative w-[100%] bg-[#5E788F]/85 py-[.7rem] px-[3.37rem] pb-[5rem] overflow-hidden ">

                {/* Inner Container */}
                <div className="innerContainer w-[100%] px-[3.18rem] pb-[3.19rem] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10]">

                    {/* Upper Container */}
                    <div className='upperContainer z-[10]'>
                        <div className="headingContainer z-[10]">
                            <p className="aboutHeading z-[10] text-[6.25rem] text-center opacity-30">Blog’s</p>
                        </div>
                    </div>

                    {/* Middle Container */}
                    <div className='middleContainer flex flex-col  items-center z-[10]'>

                        {/* Upper Container */}
                        <div className='headingContainer mb-[.5rem] z-[10]'>
                            <p className="heading text-[2.25rem] z-[10] text-center font-semibold text-[#D8DFE5]">Insights, Tips, and Trends to Elevate Your Social Media Game</p>
                        </div>

                        {/* Lower Container */}
                        <div className='descriptionContainer w-[80%] z-[10] mb-[3.12rem]'>
                            <p className="description text-[1.12rem] z-[10] text-center text-[#D8DFE5]">Welcome to the ElevatrX Blog—your go-to resource for mastering social media automation, content strategy, and analytics. Explore expert tips, case studies, and AI-powered insights to grow your brand effortlessly.</p>
                        </div>

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