const About = () => {
    return (
        <>
            <div className="aboutSection w-[100%] bg-[#5E788F]/85 px-[3.37rem] py-[1.87rem] z-[10]">

                {/* Inner Container */}
                <div className="innerAboutContainer w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] px-[3.12rem] py-[1.5rem] z-[10]">

                    {/* Upper Container */}
                    <div className="upperContainer w-[100%] z-[10]">
                        <p className="aboutHeading text-[6.25rem] text-center opacity-30">About ElevatrX</p>
                    </div>
                    
                    {/* Lower Container */}
                    <div className="lowerContainer w-[100%] z-[10] flex justify-between">
                        
                        {/* Left Container */}

                        <div className="leftAboutContainer w-[65%] z-[10]">

                            <div className="headingContainer">
                                <p className="heading text-[2.25rem] leading-tight text-[#000000] font-semibold">Smart Social Media Automation Designed
                                for Real Results</p>
                            </div>

                            <div className="descriptionContainer text-[1.12rem] mt-[1rem]">ElevatrX is your AI-powered assistant for seamless social media management. Whether you're a solo entrepreneur or a growing business, our intuitive platform automates content creation, scheduling, and analytics. Save time, streamline your strategy, and focus on growth with ElevatrX.</div>

                            <div className="buttonContainer flex gap-[1rem] mt-[1.8rem]">
                                <button className="px-[2.37rem] py-[.70rem] flex justify-center items-center bg-[rgb(14,28,41)] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white  rounded-lg text-[.93rem] cursor-pointer">Start 14 Day Free Trial</button>

                                <button className="px-[2.37rem] py-[.70rem] flex justify-center items-center bg-[#FFFFFF]/20 border border-[#ffffff] text-white  rounded-lg text-[.93rem] cursor-pointer">Explore Plans</button>
                            </div>
                        </div>

                        {/* Right Container */}
                        <div className="rightAboutContainer w-[30%]">
                            <div className="imageContainer w-[100%] h-[20rem] bg-[#ffffff]/70 rounded"></div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default About