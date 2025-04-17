"use client"
import React, { useContext, useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { userContext } from '@/Context/user.context';
import { uiContext } from '@/Context/ui.context';


const PersonalInformation = ({ editOptions }) => {

  const { editMode, setEditMode } = editOptions;
  const { userData } = useContext(userContext);
  const { openEmailPopUp, setEmailOpenPopUp, emailOtpCorrect, setEmailOtpCorrect, emailOtpError, setEmailOtpError, emailChange, setEmailChange, setPasswordDataCorrect, passwordDataCorrect, firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone } = useContext(uiContext);

  const { verifyPassword, generateOTP, updateUserInfo } = useContext(userContext);

  useEffect(() => {
    setEmail(userData?.email);
    setPhone(userData?.phone);
    setFirstName(userData?.firstName);
    setLastName(userData?.lastName);
  }, [userData]);




  const submitHandler = async (e) => {
    e.preventDefault();
    setEmailOpenPopUp(true);
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  const handleEmailChange = async (e) => {

    setEmail(e.target.value);
    if (e.target.value !== userData?.email) {
      const obj = {
        email: e.target.value,
        change: true
      }
      setEmailChange(obj);
    }
  }

  return (
    <>
      <div className="mainContainer">

        {/* Image Container */}

        <div className="w-full h-[140px] rounded-lg border bg-[#ffffff]/40 p-4 flex flex-col sm:flex-row justify-between ">
          {/* Left Side */}
          <div className="w-full sm:w-[50%] flex flex-col justify-between">

            {/* Text Container */}
            <div className="textContainer w-[100%]">
              <h2 className="text-lg font-bold">Avatar</h2>
              <p className="text-gray-500 text-base cursor-pointer">Edit your profile picture</p>
            </div>

            {/* Buttons */}
            {editMode && <div className="buttonsContainer w-[100%] flex gap-[1rem]">
              <button className={`bg-[#38bdf8] hover:bg-[#21aeeb] text-[#fff] px-[2rem] py-[.3rem] rounded-[.3rem] transition-all ease-in-out hover:scale-[.99]`}>Change Image</button>
              <button className={`bg-[#6b7280]/25  text-[#fff] px-[2rem] py-[.3rem] rounded-[.3rem] transition-all ease-in-out hover:scale-[.99]`}>Remove Image</button>
            </div>}

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

        {/* Other Info Container */}
        <div className='w-full  rounded-lg border bg-[#ffffff]/50 p-5 justify-between items-center mt-5'>

          <h2 className="text-lg font-bold">Personal Information</h2>
          <p className="text-gray-500 text-base">Change your identity information</p>

          <div className="w-full mt-5 rounded-lg ">
            {!editMode && <div className='w-[100%] flex flex-col gap-[1rem]' >
              {/* Name Field */}
              <div className="w-[100%] flex justify-between">

                {/* First Name */}
                <div className="customInputField w-[49%] relative z-10  h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]">
                  <label className="absolute -top-3 left-2 bg-white px-1 text-gray-700 ">First Name</label>
                  <p>{userData?.firstName} </p>
                </div>

                {/* Last Name */}
                <div className="customInputField w-[49%] relative z-10  h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]">
                  <label className="absolute -top-3 left-2 bg-white px-1 text-gray-700 ">Last Name</label>
                  <p>{userData?.lastName} </p>
                </div>

              </div>


              <div className="customInputField relative z-10 w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]">
                <label className="absolute -top-3 left-2 bg-white px-1  text-gray-700">Email</label>
                <p>{userData?.email}</p>
              </div>

              <div className="customInputField relative z-10 w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]">
                <label className="absolute -top-3 left-2 bg-white px-1 text-gray-700 ">Phone</label>
                <p>{userData?.phone}</p>
              </div>

            </div>}

            {/* Form To Edit */}
            {editMode && <form className='flex flex-col gap-[1rem]'>
              <div className="w-[100%] flex justify-between">
                {/* first Name */}
                <div className="w-[49%] relative z-10  h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]  ">
                  <label className="absolute -top-3 left-2 bg-white px-1  text-gray-700">First Name</label>
                  <input
                    name='firstName'
                    type="text"
                    className="w-full h-[100%] focus:outline-none "
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                  />
                </div>
                {/* Last Name */}
                <div className="w-[49%] relative z-10  h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]  ">
                  <label className="absolute -top-3 left-2 bg-white px-1  text-gray-700">Last Name</label>
                  <input
                    name='lastName'
                    type="text"
                    className="w-full h-[100%] focus:outline-none "
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative z-10 w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]  ">
                <label className="absolute -top-3 left-2 bg-white px-1  text-gray-700">Email</label>
                <input
                  name='email'
                  type="email"
                  className="w-full h-[100%] focus:outline-none "
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="relative z-10 w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 flex items-center bg-[#fff]  ">
                <label className="absolute -top-3 left-2 bg-white px-1  text-gray-700">Phone</label>
                <input
                  name='phone'
                  type="number"
                  className="w-full h-[100%] focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                />
              </div>

            </form>}
          </div>
        </div>
        <div className="flex justify-center mt-5 h-[2rem]">
          <AnimatePresence>
            {editMode && (
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full h-[33px] rounded-lg text-center bg-sky-400 text-white hover:bg-sky-500"
                onClick={submitHandler}
              >
                Save Changes
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default PersonalInformation;
