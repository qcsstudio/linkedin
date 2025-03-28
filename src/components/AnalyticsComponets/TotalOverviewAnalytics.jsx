import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaUsers, FaCommentDots, FaBookmark, FaMousePointer } from "react-icons/fa";
import { AiFillHeart, AiFillEye, AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";

const AnimatedNumber = ({ value, duration = 0.8 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(10, Math.floor((duration * 1000) / value));  
    const timer = setInterval(() => {
      start += Math.ceil(value / 20);  
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {count}
    </motion.div>
  );
};

const TotalOverview = ({ data, followers }) => {
  const engagementData = [
    { name: "Followers", value: followers || 0, color: "text-blue-500", icon: <FaUsers /> },
    { name: "Likes", value: data?.likeCount || 0, color: "text-red-500", icon: <AiFillHeart /> },
    { name: "Comments", value: data?.commentCount || 0, color: "text-purple-500", icon: <FaCommentDots /> },
    { name: "Saved", value: 1450, color: "text-blue-500", icon: <FaBookmark /> },
    { 
      name: "Engagement", 
      value: `${data?.engagement ? (data.engagement * 100).toFixed(2) : "0.00"}%`, 
      color: "text-orange-500", 
      icon: <MdOutlineAnalytics /> 
    },
    { name: "Views", value: data?.uniqueImpressionsCount || 0, color: "text-black", icon: <AiFillEye /> },
    { name: "Clicks", value: data?.clickCount || 0, color: "text-gray-500", icon: <FaMousePointer /> },
    { name: "Impression", value: data?.impressionCount || 0, color: "text-green-500", icon: <AiOutlineShareAlt /> },
  ];

  return (
    <div className="bg-white/50 flex flex-col gap-4 rounded-lg p-5">
      <h1 className="font-bold text-lg">Total Overview</h1>
      <div className="grid grid-cols-4 gap-4">
        {engagementData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="p-4 bg-white/60 flex flex-col gap-3 rounded-lg shadow-md text-center"
          >
            <div className="flex items-center gap-3 justify-start">
              <div className="bg-blue-500/15 p-2 rounded-full">
                <span className={`${item.color} text-xl`}>
                  {item.icon}
                </span>
              </div>
              <h3 className="text-lg">{item.name}</h3>
            </div>

            <div className="flex items-center justify-around">
              <p className="text-xl text-blue-500">
                {item.name === "Engagement" ? (
                  item.value 
                ) : (
                  <AnimatedNumber value={parseInt(item.value)} duration={0.8} />
                )}
              </p>
              <div className="flex items-center gap-1 justify-center">
                <BsGraphUpArrow className={`${item.color} text-sm`} />
                <p className="text-gray-500 text-sm">2.1%</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TotalOverview;
