"use client"
import { userContext } from "@/Context/user.context";
import Image from "next/image"
import { useContext } from "react";


const AddCard = ({setAddAccount,addAccount}) => {
    
        const {openAddAccount, setOpenAddAccount} = useContext(userContext);
    return (
        <>
            <div className="card p-[2px] min-w-[31%] max-w-[31%] min-h-[15.3rem] max-h-[15.3rem]
             bg-gradient-to-l from-[rgba(177,185,248,1)] to-[rgba(176,248,255,1)] rounded-[.5rem] 
             overflow-hidden flex justify-center items-center z-10 ">

                {/* Card Inner Container */}
                <div className="innerCard w-[100%] p-[1px] h-[100%] bg-[#ffffff]/80 rounded-[.4rem]">
                    
                    {/* Upper card */}
                    <div className="upperCard w-[100%] h-[70%] flex items-center justify-center ">
                        <Image src={`/images/accountImages/add.png`} alt="addIcon" width={68} height={68} className="w-[4.2rem] h-[4.2rem]"/> 
                    </div>

                    {/* Lower card */}
                    <div className="lowerCard w-[100%] h-[30%] flex items-center justify-center">
                        <button className={`text-[#111111] bg-[#F0F0F0] px-[4.1rem] py-[0.4rem] rounded-[.5rem]`} onClick={()=>setOpenAddAccount(true)}>Add Account</button>
                    </div>

                </div>

            </div>
        </>
    )
}

export default AddCard