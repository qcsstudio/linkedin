import React from 'react';
import { FaCamera } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const Avatar = () => {
  return (
    <>
    
  <div className="w-full h-[140px] rounded-lg border bg-[#ffffff]/40 p-4 flex flex-col sm:flex-row justify-between ">
    <div className="w-full sm:w-[50%]">
      <h2 className="text-lg font-bold">Avatar</h2>
      <p className="text-gray-500 text-base cursor-pointer">Edit your profile picture</p>
    </div>
    <div className="w-full  sm:w-[50%] flex justify-center sm:justify-end z-[100]">
     
    <div className="w-28 h-28 relative">
      {/* Plus Icon */}
      <IoIosAddCircle className="absolute top-3 right-3 text-sky-500 z-10" />

      {/* File Upload Trigger */}
      <label htmlFor="fileInput" className="w-[100px] h-[100px] bg-[#ECECEE] rounded-full cursor-pointer flex justify-center items-center relative">
        <FaCamera className="w-8 h-8" />
      </label>

      {/* Hidden File Input */}
      <input type="file" id="fileInput" className="hidden" />
    </div>
      
    </div>
  </div>
    </>
  )
}

export default Avatar