import CardChooseUs from "./CardChooseUs"

const ChooseUs = () => {
    return (
        <>
            <div className="chooseUsContainer w-[100%] min-h-[120vh] bg-[#5E788F]/85 px-[3.3rem] py-[.5rem] z-[10]">

                {/* Inner Container */}
                <div className="innerContainer w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10] pt-[1rem] pb-[3rem] px-[7.0625rem]">

                    {/* Upper Container */}
                    <div className="upperContainer w-[100%] z-[10]">
                        <p className="aboutHeading text-[6.25rem] text-center opacity-30">Why Choose Us</p>
                    </div>

                    {/* Middle Container */}
                    <div className="middleContainer w-[100%] z-[10] mb-[3rem]">

                        <div className="headingContainer w-[100%]">
                            <p className="heading text-[2.25rem] font-semibold text-center mb-[1rem]">Why ElevatrX is the Ultimate AI-Driven Social Media Solution</p>
                        </div>

                        <div className="descriptionContainer w-[100%]">
                            <p className="description text-[1.12rem] text-center">Social media marketing shouldn’t feel like rocket science. With ElevatrX, experience smarter, easier, and stress-free social media management powered by cutting-edge AI. Here’s why leading marketers choose ElevatrX every day.</p>
                        </div>

                    </div>

                    {/* Lower Container */}
                    <div className="lowerContainer w-[100%] z-[10] flex gap-[.5rem] ">
                        <CardChooseUs text={"Automated Scheduling & Posting"}/>
                        <CardChooseUs text={"Real-time Engagement Analytics"}/>
                        <CardChooseUs text={"Seamless Multi-Platform Management"}/>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ChooseUs