
"use client"
import Image from "next/image";
import { IoClose } from "react-icons/io5";
const AddAccountCard = ({data}) => {

    


    const handleClick = (platformName)=>{

        if(platformName === "LinkedIn"){
            window.location.href = '/api/auth/linkedin';
        }

    }

    return (
        <>
            <div className="addCard w-[31%] p-[0.1rem] flex justify-center items-center rounded-[.5rem]" style={{
                background: "#B1B9F8",
                background: "linear-gradient(189deg, rgba(177, 185, 248, 1) 0%, rgba(176, 248, 255, 1) 85%)"
            }}>
                <div className="innerCard w-[100%] p-[1rem] bg-[#fff] rounded-[.5rem]">

                    <div className="platformDetail flex items-center justify-between ">

                        {/* Left Container */}
                        <div className='leftContainer'>

                            {/* Upper Container */}
                            <div className='upperContainer mb-[.5rem]'>
                                <p className="platformName font-bold text-[0.9rem]">{data?.name}</p>
                            </div>

                            {/* Lower Container */}
                            <div className='lowerContainer w-[11rem] overflow-hidden'>
                                <p className="platformName text-[0.9rem] leading-tight">{data?.description}</p>
                            </div>

                        </div>

                        {/* Right Container */}
                        <div className='rightContainer'>
                            <div className="imageContainer w-[3.5rem] h-[3.5rem] rounded-[50%]">
                                <Image src={data?.icon} width={40} height={40} alt={"facebook_logo"} className="w-[100%] h-[100%]" />
                            </div>
                        </div>

                    </div>

                    <div className="buttonContainer w-[100%] mt-[1.5rem]">
                        <button onClick={()=>handleClick(data?.name)} disabled={!data?.enable} className={`${data?.enable ? "bg-[#007BFF] hover:bg-[#2c92ff] text-[#ffffff]" : "bg-[#f2f2f2] text-[#111111]"} w-[100%] py-[0.4rem] rounded-[.5rem] ${data?.enable ? "cursor-pointer" : "cursor-not-allowed"}`}>{data?.enable ? "Connect":"Coming soon"}</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default AddAccountCard