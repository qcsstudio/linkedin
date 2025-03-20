import React from 'react'
import { FiPhoneIncoming } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";






const NeedHelp = () => {
    const helpOptions = [
        {
            title: "Request a callback",
            description: "Our team will contact you soon",
            icon: <FiPhoneIncoming />
            ,
        },
        {
            title: "FAQs",
            description: "Get your doubts cleared",
            icon: <IoMdInformationCircleOutline />
            ,
        },
        {
            title: "Mail us",
            description: "Reach out to us",
            icon: <MdOutlineEmail />

            ,
        },
    ];
  return ( 
  <div className=" w-[100%] bg-[#5E788F]/85 px-[3.3rem] pb-[1.87rem] z-[10]">

    <div className="innerContainer flex flex-col gap-1 justify-center items-start w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10]  py-[2rem] px-[7.0625rem]">
    <h2 className="text-4xl font-semibold text-white/50 mb-6">Need help?</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full ">
        {helpOptions.map((option, index) => (
            <div
                key={index}
                className="flex items-center p-5 bg-gray-300/50 justify-between  rounded-lg text-white cursor-pointer  transition"
            >
                <div className='flex items-center gap-5'>

               
                <span className="text-4xl text-gray-700  ">{option.icon}</span>
                <div className='leading-3'>
                    <h3 className="font-semibold text-2xl leading-4">{option.title}</h3>
                    <p className=" text-lg">{option.description}</p>
                </div>
                </div>
                <FaChevronRight className='text-gray-700 ' />

            </div>
        ))}
    </div>
</div>
</div>
  )
}

export default NeedHelp
