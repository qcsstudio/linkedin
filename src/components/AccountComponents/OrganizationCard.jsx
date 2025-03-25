"use client";
import Image from "next/image";
import Button from "../common/Button";
import { useState } from "react";
import icon from "../../../public/images/accountImages/linkdedin.png";
import { CgOrganisation } from "react-icons/cg";

const OrganizationCard = ({ data }) => {
  console.log("data", data);
  const [status, setStatus] = useState("Active");
  return (
    <>
       <div className="card w-[100%] h-[100%] px-[2px] 
       
       bg-gradient-to-l from-[rgba(177,185,248,1)] to-[rgba(176,248,255,1)] 
       rounded-[.5rem] overflow-hidden flex  z-[100] ">
        <div className="innerCard w-[100%]  mx-[px] my-[2px] p-2 bg-white/80  rounded-[.4rem]">
        <div className="upperCard w-[100%]  flex items-center justify-center ">
        <CgOrganisation className="w-[4rem] h-[4rem] " />
            {/* <Image
              src={data.picture}
              alt="addIcon"
              width={100}
              height={100}
              className=" rounded-full object-fill"
            /> */}
          </div>

          <div className="upperCard w-[100%]  flex flex-col items-center justify-center  ">
            <p className="headingCard w-[100%] p-[1px] text-center text-wrap break-words
             overflow-hidden text-[1.1rem]">@{data.localizedName}</p>

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

          <div className="lowerCard w-[100%] h-[30%]  gap-2 p-2 flex justify-center">
            <Button
              text={"Connected"}
              backgroundColor={"#007BFF"}
              textColor={"#ffffff"}
            />
            <Button
              text={"Disconnected"}
              backgroundColor={"#F0F0F0"}
              textColor={"gray"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationCard;
