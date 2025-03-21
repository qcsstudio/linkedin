"use client";
import Image from "next/image";
import Button from "../common/Button";
import { useState } from "react";
import icon from "../../../public/images/accountImages/linkdedin.png";

const Card = ({ data }) => {
  console.log("data", data);
  const [status, setStatus] = useState("Active");
  return (
    <>
      <div className="card  min-w-[32%] max-w-[32% ] min-h-[12.5rem] max-h-[15.3rem]
       
      bg-gradient-to-l from-[rgba(177,185,248,1)] to-[rgba(176,248,255,1)] 
      rounded-[.5rem] overflow-hidden flex  z-[100] ">
        <div className="innerCard w-[100%] h-[100%] mx-[2px] my-[1px] bg-white/80  rounded-[.4rem]">
          <div className="upperCard w-[100%] h-[100%] flex items-center justify-center ">
            <Image
              src={data.picture}
              alt="addIcon"
              width={100}
              height={100}
              className=" rounded-full object-fill"
            />
          </div>

          <div className="upperCard w-[100%] h-[20%] flex flex-col items-center justify-center ">
            <p className="headingCard text-[1.1rem]">@{data.name}</p>

            <div className="status flex items-center gap-[.5rem]">
              <div
                className={`status w-[.5rem] h-[.5rem] ${
                  status === "Active" ? "bg-[#29CE29]" : "bg-[#FCD53F]"
                } rounded-[50%] `}
              ></div>
              <p className="Status text-[0.8rem]">{status}</p>
              <Image src={icon} alt="addIcon" width={30} height={30} />
            </div>
          </div>

          <div className="lowerCard w-[100%] h-[30%] flex items-center justify-center">
            <Button
              text={"Connected"}
              backgroundColor={"#007BFF"}
              textColor={"#ffffff"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
