import React from 'react'
import { BsGraphUpArrow } from "react-icons/bs";
import { FaUsers } from "react-icons/fa"; // Import followers icon
import { AiFillHeart, AiFillEye, AiOutlineShareAlt } from "react-icons/ai"; 
import { FaCommentDots, FaBookmark, FaMousePointer } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";


const TotalOverview = () => {
  
    const engagementData = [
        { name: "Followers", value: 1450,engagement:'2.1%', color: "text-blue-500", icon: <FaUsers /> },
        { name: "Likes", value: 1450,engagement:'2.1%', color: "text-red-500", icon: <AiFillHeart /> },
        { name: "Comments", value: 1450,engagement:'2.1%', color: "text-purple-500", icon: <FaCommentDots /> },
        { name: "Saved", value: 1450,engagement:'2.1%', color: "text-blue-500", icon: <FaBookmark /> },
        { name: "Engagement",engagement:'2.1%', value: 1450, color: "text-orange-500", icon: <MdOutlineAnalytics /> },
        { name: "Views",engagement:'2.1%', value: 1450, color: "text-black", icon: <AiFillEye /> },
        { name: "Clicks",engagement:'2.1%', value: 1450, color: "text-gray-500", icon: <FaMousePointer /> },
        { name: "Shares",engagement:'2.1%', value: 1450, color: "text-green-500", icon: <AiOutlineShareAlt /> },

      ];
  return (
    <div className='bg-white/50 flex flex-col gap-2 rounded-lg p-5'>
     <h1 className='font-bold text-lg'>Total Overview</h1> 
     <div className="grid grid-cols-4 gap-4">
      {engagementData.map((item, index) => (
        <div key={index} className="p-4 bg-white/60 flex flex-col gap-3 rounded-lg shadow-md text-center">
<div className='flex items-center gap-3 justify-start '>
    <div className='bg-blue-500/15 p-2 rounded-full '>
    <span className={`${item.color} bg-red text-xl`}>{item.icon}</span>
    </div>

          <h3 className={` text-lg `}>{item.name}</h3>
</div>
          <div className='flex items-center justify-around'>
          <p className="text-xl text-blue-500">{item.value}</p>
          <div className='flex items-center gap-1  justify-center'>
          <BsGraphUpArrow className={`${item.color}  text-sm `} />
          <p className='text-gray-500 text-sm'>{item.engagement}</p>
          </div>
          </div>
          
        </div>
      ))}
    </div>
    </div>
  )
}

export default TotalOverview
