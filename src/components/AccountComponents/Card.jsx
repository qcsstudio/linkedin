"use client"
import Image from "next/image"
import Button from "../common/Button"
import { useState } from "react"

const Card = () => {
    const [status,setStatus] = useState('Active')
    return (
        <>
            <div className="card p-[2px] min-w-[32%] max-w-[32% ] min-h-[15.3rem] max-h-[15.3rem] bg-gradient-to-l from-[rgba(177,185,248,1)] to-[rgba(176,248,255,1)] rounded-[.5rem] overflow-hidden flex justify-center items-center z-[100] ">

                {/* Card Inner Container */}
                <div className="innerCard w-[100%] h-[100%] bg-[#ffffff]/60      rounded-[.4rem]">
                    
                    {/* Upper card */}
                    <div className="upperCard w-[100%] h-[50%] flex items-center justify-center ">
                        <Image src={`/images/accountImages/facebook.png`} alt="addIcon" width={68} height={68} className="w-[5.1rem] h-[5.1rem]"/> 
                    </div>

                    {/* Middle card */}
                    <div className="upperCard w-[100%] h-[20%] flex flex-col items-center justify-center ">
                        <p className="headingCard text-[1.1rem]">@Username</p>
                        <p className="descriptionCard text-[0.8rem]">Last Sync: 5 hours ago</p>
                        {/* status container */}
                        <div className="status flex items-center gap-[.5rem]">
                            <div className={`status w-[.5rem] h-[.5rem] ${status === "Active" ? "bg-[#29CE29]"  : "bg-[#FCD53F]"} rounded-[50%] `}></div>
                            <p className="Status text-[0.8rem]">{status}</p>
                        </div>
                    </div>

                    {/* Lower card */}
                    <div className="lowerCard w-[100%] h-[30%] flex items-center justify-center">
                        <Button text={"Retry Connection"} backgroundColor={"#007BFF"} textColor={"#ffffff"} />
                    </div>

                </div>

            </div>
        </>
    )
}

export default Card