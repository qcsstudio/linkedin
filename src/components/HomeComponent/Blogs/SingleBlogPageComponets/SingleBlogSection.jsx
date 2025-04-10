import React from 'react'
import Image from 'next/image'


// const getFirstSentence = (html) => {
//   if (!html) return '';
//   const temp = document.createElement("div");
//   temp.innerHTML = html;
//   const text = temp.textContent || temp.innerText || "";
//   const firstSentence = text.split('. ')[0] + (text.includes('.') ? '.' : '');
//   return firstSentence;
// };

const DetailedBlog = ({ blogData }) => {
  return (
    <div className="chooseUsContainer pt-[25%] md:pt-[15%] xl:pt-[8%] w-full px-4 lg:px-[3.37rem] md:px-[3.12rem] z-[10]">
      <div className="innerContainer w-full h-full bg-[#FFFFFF]/35 rounded-[.5rem] z-[10] px-4 py-4 md:px-[3.12rem]  lg:px-[3.12rem] lg:py-[3.12rem] flex flex-col items-start gap-5">

        {/* Image Placeholder */}
        <div className="w-full flex justify-start items-start">
          <div className="w-full md:w-[80%] lg:w-[60%] aspect-video bg-white rounded-lg shadow-md" />
        </div>

        {/* Heading */}
        <div className="textSection text-[#0E1C29] text-lg md:text-5xl font-semibold">
          {blogData?.heading?.replace(/_/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </div>

        
        {/* <div className="shortDesc text-sm md:text-lg text-[#212121]">
          {getFirstSentence(blogData?.description)}
        </div> */}

       
        <div
          className="fullDesc text-lg md:text-xl text-[#212121]"
          dangerouslySetInnerHTML={{
            __html: blogData?.description || "",
          }}
        ></div>
      </div>
    </div>
  );
};

export default DetailedBlog;
