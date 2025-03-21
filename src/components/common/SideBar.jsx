"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sideBarData } from "@/data/sideBar.data"
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";


const SideBar = () => {
  const pathname = usePathname(); // Get current route
  const [openDropdown, setOpenDropdown] = useState(false); 
  const [sidebarVisible, setSidebarVisible] = useState(true); 

  const isSettingActive = pathname === "/dashboard/settings";

  const setting = {
    activeImage: "/images/sideBarLogoImages/settingWhite.svg",
    inActiveImage: "/images/sideBarLogoImages/settingsBlack.svg",
    heading: "Settings",
  };

  const pathOption = [
    { 
      path: "/dashboard/settings/profile", 
      label: "Profile" ,
      logo:"/images/settinglogos/profile.png" ,
    
  },
    {
     path: "/dashboard/settings/account",
     label: "Account",
     logo:"/images/settinglogos/account&subscription.png"
   },
   { 
    path: "/dashboard/settings/privacy", 
    label: "Privacy",
    logo:"/images/settinglogos/privacyLogo.png" ,
    
  },
    { 
      path: "/dashboard/settings/notification", 
      label: "Notification",
      logo:"/images/settinglogos/notification.png" ,
    },
    
    
  ];

  
  const handleSettingsClick = () => {
    setOpenDropdown(!openDropdown); 
  };
  
  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible); 
    setOpenDropdown(!openDropdown)
   
  };
 

  return (
    <div className="flex flex-col w-[100%] gap-3 py-[2rem]">
      {/* Upper Dropdown */}
      <div className="flex justify-center gap-3 items-center rounded-2xl py-5 w-full min-w-[200px] bg-[#ffffff]/60">
        <h6 className="font-bold text-[20px]">QUANTUM</h6>
      </div>

      {/* Sidebar */}
      {sidebarVisible && ( // Conditionally render the sidebar based on the state
        <div className="w-[100%] min-w-[241px] min-h-[600px] bg-white/50 rounded-xl p-5 z-[100]">
          {/* Regular Sidebar Links */}
          {sideBarData.map((data, index) => {
            const isActive = pathname === data.path; // Check if the link is active
            return (
              <div key={index}>
                {/* Render the link for each sidebar item */}
                <Link href={data.path}>
                  <div
                    className={`border-[#D8CFE8] py-1 hover:bg-[#B4F2FC]/70 hover:rounded-[1rem] transition cursor-pointer 
                      ${isActive ? "bg-[#B4F2FC]/70 rounded-[1rem] text-[#ffffff]" : "bg-transparent"}`}
                  >
                    <div className="flex items-center space-x-3 w-full h-[53px] rounded-xl p-2 py-4">
                      <Image
                        src={isActive ? data.activeImage : data.inActiveImage}
                        alt={data?.heading}
                        width={1024}
                        height={1024}
                        className="w-[1.8rem]"
                      />
                      <h4
                        className={`text-left text-md font-semibold select-none ${isActive ? "text-[#ffffff]" : "text-[#9E9E9E]"}`}
                      >
                        {data.heading}
                      </h4>
                    </div>
                  </div>
                </Link>

                <hr className="border border-[#dadada]/70 my-[2px]" />
              </div>
            );
          })}

          {/* Settings Link */}
          <div
            className={`py-1 hover:bg-[#B4F2FC]/70 hover:rounded-[1rem] transition cursor-pointer 
              ${isSettingActive ? "bg-[#B4F2FC]/70 rounded-[1rem] text-[#ffffff]" : "bg-transparent"}`}
            onClick={() => {
              handleSettingsClick(); // Toggle dropdown when Settings is clicked
              handleSidebarToggle(); // Hide the sidebar when Settings is clicked
            }}
          >
            <div className="flex items-center space-x-3 w-full h-[53px] rounded-xl p-2 py-4">
              <Image
                src={isSettingActive ? setting.activeImage : setting.inActiveImage}
                alt={setting?.heading}
                width={1024}
                height={1024}
                className="w-[1.8rem]"
              />
              <h4
                className={`text-left text-md font-semibold select-none ${isSettingActive ? "text-[#ffffff]" : "text-[#9E9E9E]"}`}
              >
                {setting.heading}
              </h4>
            </div>
          </div>

        
        </div>
      )}
      
      {/* Settings Sidebar (when sidebar is hidden) */}
      <div className="w-[100%] min-w-[241px] min-h-[600px] bg-white/40 rounded-xl z-[100]">

      {!sidebarVisible && (
        <div className="w-[100%] min-w-[241px] min-h-[600px]  rounded-xl p-2 z-[100]">
          {/* Render Settings Panel */}
          <div className="text-center flex font-semibold  gap-x-14 text-xl">
            <span
            className="float-left"
            >
            <button 
              className="ms-4 p-1 text-gray-500"
              onClick={handleSidebarToggle}><FaArrowLeftLong  className="text-2xl"/>
            </button>
            </span>
            <h5 className=" text-2xl">Settings</h5>
            </div>

          {/* Dropdown Options for Settings */}
          {openDropdown && (
            <div className="ml-8 mt-2">
              {pathOption.map((option, optionIndex) => (
                <div key={optionIndex}>

                <Link href={option.path}>
                      <div
                    className={`border-[#D8CFE8] py-1 hover:bg-[#B4F2FC]/70 hover:rounded-[1rem] transition cursor-pointer 
                       rounded-[1rem] text-[#ffffff] bg-transparent}`}
                  >
                    <div className="flex items-center space-x-3 w-full h-[53px] rounded-xl p-2 py-4">
                      <Image
                        src={option.logo}
                        alt={option?.label}
                        width={1024}
                        height={1024}
                        className="w-[1.8rem]"
                      />
                      <h4
                        className="text-left text-base font-semibold select-none text-[#9E9E9E] "
                      >
                        {option.label}
                      </h4>
                    </div>
                  </div>
                  
                </Link>

              <hr className="border border-[#dadada]/70 my-[2px]" />
                </div>


                
              ))}

            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default SideBar;
