"use client"
import { uiContext } from '@/Context/ui.context';
import { userContext } from '@/Context/user.context';
import React, { useContext, useEffect, useState } from 'react'
import { FaLock } from "react-icons/fa";

const UserInformation = () => {

  const { userData } = useContext(userContext);
  const { openPopUp, setOpenPopUp } = useContext(uiContext);

  console.log("User Data:", userData);

  if (!userData) {
    return <p>Loading...</p>
  }

  // handle click
  const handleClick = (e) => {
    setOpenPopUp(true);
  }



  return (
    <>
      {/* User Information Section */}
      <div className="w-full bg-white/40 p-4 rounded-lg border">
        <h2 className="text-xl font-semibold">User Information</h2>
        <div className="mt-5 space-y-4">
          {/* Email Input */}
          <div className="customInputField relative z-10 w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]">
            <label className="absolute -top-3 left-2 bg-white px-1 text-gray-700 ">Email</label>
            <p>{userData?.email}</p>
          </div>

          {/* Phone Number Input */}
          <div className="customInputField relative z-10 w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]">
            <label className="absolute -top-3 left-2 bg-white px-1 text-gray-700 ">Phone</label>
            <p>{userData?.phone}</p>
          </div>

          {/* Change Password Button */}
          <button className=" w-36 text-xs h-8 border border-gray-500 bg-white p-2 z-20 relative rounded flex items-center justify-center space-x-2 mt-4 hover:bg-blue-400 hover:border-none transition duration-300" onClick={handleClick} >
            <FaLock className="text-sm" />
            <span>Change Password</span>
          </button>
        </div>
      </div>

    </>
  );
};

export default UserInformation;