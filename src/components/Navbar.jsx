'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { IoIosSearch } from "react-icons/io";
import { FaQuestionCircle, FaBell } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import userImage from '../../public/images/dashboardImages/userImage.png'
import mainLogo from '../../public/images/mainLogo.png'

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className=' bg-gradient-to-r border border-gray-500 from-purple-100 to-blue-200'>
      <div className='flex py-2 max-w-[1440px] h-[90px] md:py-4 lg:py-4 px-2 md:px-10 lg:px-[96px] mx-auto w-full justify-between items-center relative'>

        
          <Image src={mainLogo} className='object-contain w-[20%]'  alt='' />
        

        <div className='font-medium md:hidden lg:hidden flex items-center justify-between relative z-10'>
          <button className='flex flex-col justify-center items-center' onClick={handleClick}>
            <span className={`bg-black/90 block transition-all duration-300 ease-out h-[2.5px] w-7 rounded-sm ${show ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
            <span className={`bg-black/90 block transition-all duration-300 ease-out h-[2.5px] w-7 rounded-sm my-0.5 ${show ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`bg-black/90 block transition-all duration-300 ease-out h-[2.5px] w-7 rounded-sm ${show ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
          </button>
        </div>


        <div className='lg:flex md:flex hidden w-1/3 h-[43px] justify-between items-center  gap-3 bg-[#FFFFFF] rounded-lg  px-4'>
          <input type="text" className='text-sm w-full  tracking-tight focus:outline-none bg-[#FFFFFF]' placeholder='Search Across Your Dashboard' />
          <div className='p-1 font-thin text-white bg-[#9E9E9E] rounded-full'>
            <IoIosSearch />
          </div>
        </div>


        <div className='lg:flex md:flex hidden justify-between gap-5 items-center'>
          <div className='relative'>
            <FaBell className='w-5 h-5 lg:w-[32px] lg:h-[31px] ' />
            <span className='absolute -top-1 left-4 bg-white text-black text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full'>
              3
            </span>
          </div>

          <div className='flex justify-between gap-2'>
            <div className='leading-tight flex flex-col items-end'>
              <p className='font-semi-bold lg:text-lg md:text-sm'>QCSStudio</p>
              <p className='text-sm text-[#9E9E9E] '>QCS Qa</p>
            </div>
            <div className='w-[40px] h-[40px] bg-white rounded-full'>
              <Image src={userImage} alt="alt"/>
            </div>
          </div>
        </div>


        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='fixed top-[90px] right-0 h-screen rounded-md w-[90%] bg-[#F6FBFF]/80= shadow- p-4 flex flex-col gap-4 z-50'
            >

              <div className='flex items-center gap-2'>
                <FaQuestionCircle className='w-6 h-7' />
                <span>Help</span>
              </div>
              <div className='flex items-center gap-2 relative'>
                <FaBell className='relative w-5 h-7'></FaBell>
                <span>Notifications</span>

                <span className='absolute -top-1 left-2 bg-red-600 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full'>
                  3
                </span>

              </div>

              <div className='flex items-center gap-2'>
                <div className='w-[40px] h-[40px] bg-white rounded-full'></div>
                <div className='leading-tight flex flex-col'>
                  <p className='font-semi-bold text-md'>QCSStudio</p>
                  <p className='text-sm text-[#9E9E9E] '>QCS Qa</p>
                </div>
              </div>
              <div className='flex bg-gray-100 rounded-lg p-2 items-center'>
                <input type="text" className='text-sm w-full bg-gray-100 focus:outline-none' placeholder='Search Across Your Dashboard' />
                <div className='p-1 font-thin text-white bg-[#9E9E9E] rounded-full'>
                  <IoIosSearch />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Navbar;
