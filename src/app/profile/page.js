import React from 'react'
import Image from 'next/image';
import { FaCamera } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

const Profile = () => {
  return (
    <>
<div className="w-[95%] h-[600px]  sm:w-[95%] border shadow p-6 m-auto mt-8 rounded-2xl bg-[#ffffff]/30">
  <h1 className="text-2xl font-bold xl:text-black md:text-white dark:text-white mb-6">Manage Profile</h1>
  
  <div className="w-full h-[140px] rounded-lg border bg-[#ffffff]/40 p-4 flex flex-col sm:flex-row justify-between ">
    <div className="w-full sm:w-[50%]">
      <h2 className="text-lg font-bold">Avatar</h2>
      <p className="text-gray-500 text-sm cursor-pointer">Edit your profile picture</p>
    </div>
    <div className="w-full  sm:w-[50%] flex justify-center sm:justify-end z-[100]">
     
      <div className='w-28 h-28 relative '>
      <IoIosAddCircle className='absolute top-3 right-3 text-sky-500' />
        <div className="w-[100px] bg-[#ECECEE] h-[100px] rounded-full z-[100] cursor-pointer justify-center items-center">
          <FaCamera className='w-8 h-8 absolute top-8 left-8'/>
        </div>
      </div>
      
    </div>
  </div>

  <div className='w-full h-[297px] rounded-lg border bg-[#ffffff]/50 p-4 justify-between items-center mt-5' >
    <h2 className="text-lg font-bold">Personal Information</h2>
    <p className="text-gray-500 text-sm">Change your identify information</p>

   
    <div className="w-full mt-5 rounded-lg shadow-md ">
 
          <form>
            <div className="relative mb-4">
              <label className="absolute -top-2 left-2 bg-[#ffffff]/10 px-1  text-gray-700 ">Full Name</label>
              <input type="text" className="w-full h-[52px] border rounded-md p-2 focus:outline-none " />
            </div>
            <div className="relative mb-4">
              <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700">Email</label>
              <input type="email" className="w-full  h-[52px] border rounded-md p-2 focus:outline-none" />
            </div>
            <div className="relative mb-4">
              <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700">Phone</label>
              <input type="tel" className="w-full  h-[52px] border rounded-md p-2 focus:outline-none"  />
            </div>
            
            
            
          </form>
    </div>

   

  </div>
  <div className="flex justify-center mt-5">
  <button className="w-full h-[33px] rounded-lg text-center bg-sky-500 text-white">Save Changes</button>
</div>

</div>

    </>
  )
}

export default Profile