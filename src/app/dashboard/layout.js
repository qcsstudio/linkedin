"use client"
import PasswordChangePopUp from "@/components/common/PasswordChangePopUp";
import SideBar from "@/components/common/SideBar";
import Navbar from "@/components/Navbar";
import { uiContext } from "@/Context/ui.context";
import Image from "next/image";
import { useContext } from "react";


const layout = ({ children }) => {

  const { openPopUp, setOpenPopUp } = useContext(uiContext);

  return (
    <>
    {/* main Container */}
      <div className="mainContainer relative flex flex-col w-[100vw] h-[100vh] overflow-y-hidden bg-gradient-to-r from-purple-200 to-blue-300">
        <Navbar />

        {/* Lower Container */}
        <div className="lower w-[100%] h-[100%] flex justify-center overflow-y-hidden px-[5.6rem]">

          {/* Sidebar Conatiner */}
          <div className="left w-[20%] h-[100%]">
            <SideBar/>
          </div>

          {/* Dashboard Container */}
          <div className="right w-[80%] h-[100%] overflow-y-scroll overflow-x-hidden no-scrollbar">{children}</div>
        </div>

        {/* Background Images */}
        <Image className='bgImageFloating absolute z-0 top-16 left-36 select-none' src={`/images/dashboardImages/instagram.png`} height={350} width={350} alt='ad' />
        <Image className='bgImageFloating absolute z-0  top-[21rem] right-36 select-none' src={`/images/dashboardImages/linkedin.png`} height={300} width={300} alt='dwa' />
        <Image className='bgImageFloating absolute z-0  bottom-0 left-96 select-none' src={`/images/dashboardImages/pinterest.png`} height={250} width={250} alt='dwa' />
        <Image className='bgImageFloating absolute z-0 right-32 bottom-0 select-none' src={`/images/dashboardImages/facebook.png`} height={200} width={200} alt='wda' />

        {/* POP-UP */}

        {openPopUp == true && <PasswordChangePopUp/>}
      </div>
    </>
  );
};

export default layout;
