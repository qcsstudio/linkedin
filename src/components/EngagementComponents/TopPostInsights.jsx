"use client";
import React, { useState } from "react";
import CountUp from "react-countup";
import { FaLinkedin } from "react-icons/fa";
import Image from "next/image";

function formatToK(value) {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  }
  return value.toString();
}

const TopPostInsights = ({ topPosts, onRowClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleRowClick = (post, index) => {
    setSelectedIndex(index);
    onRowClick(post);
  };

  return (
    <div className="w-full bg-white/50 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3">Top Post Insights</h2>
      <div className="bg-gray-100 rounded-lg">
        <div className="flex justify-between p-4 rounded-t-lg bg-gray-300/50 font-semibold w-full text-lg text-gray-700 pb-2 border-b">
          <span className="w-2/5">Post</span>
          <span className="w-1/5">Platform</span>
          <span className="w-1/5 text-center">Engagement</span>
          <span className="w-1/5 text-center">Performance</span>
        </div>

        {topPosts.map((post, i) => {
          const thumbnail =
            post.content?.contentEntities?.[0]?.thumbnails?.[0]?.resolvedUrl;
          const shortText =
            post.text?.split(" ").slice(0, 4).join(" ") + "...";

          const isSelected = selectedIndex === i;

          return (
            <div
              key={i}
              className={`flex p-4 items-center justify-between py-3 border-b last:border-none cursor-pointer transition ${
                isSelected ? "bg-blue-100 shadow-inner" : "hover:bg-gray-200"
              }`}
              onClick={() => handleRowClick(post, i)}
            >
              <div className="flex gap-2 items-center w-2/5">
                {thumbnail && (
                  <Image
                    src={thumbnail}
                    alt="Post thumbnail"
                    width={56}
                    height={56}
                    className="rounded-md object-cover"
                  />
                )}
                <span className="text-gray-800 text-lg w-1/2">{shortText}</span>
              </div>

              <div className="w-1/5 gap-3 items-center flex">
                <FaLinkedin className="w-6 h-6 text-blue-500" />
                <span className="text-gray-600 text-xl">LinkedIn</span>
              </div>

              <div className="w-1/5 text-center font-semibold text-gray-700">
                {formatToK(post.engagementRate)}
              </div>

              <div className="w-1/5 flex justify-center items-center text-xl text-blue-600">
                <CountUp
                  end={parseFloat(post.performanceScore)}
                  duration={2.5}
                  separator=","
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopPostInsights;
