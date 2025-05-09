"use client";
import Image from "next/image";
import Button from "../common/Button";
import { useContext, useState } from "react";
import icon from "../../../public/images/accountImages/linkdedin.png";
import { userContext } from "@/Context/user.context";
import { CgOrganisation } from "react-icons/cg";

const Card = ({ data }) => {
  console.log("data", data);
  const [status, setStatus] = useState("Active");
  const { userData } = useContext(userContext);
  return (
    <>
      <div className="card  min-w-[100%] max-w-[100%] px-[2px] min-h-[12.5rem] max-h-[15.3rem]   
      bg-gradient-to-l from-[rgba(177,185,248,1)] to-[rgba(176,248,255,1)] 
      rounded-[.5rem]  flex  z-10 ">
        <div className="innerCard w-[100%] h-[100%] mx-[px] my-[2px] p-2 bg-white/80  rounded-[.4rem]">
          <div className="upperCard w-[100%] h-[100%] flex items-center justify-center ">
            {data.avatar === null ? <div className="upperCard w-[100%]  flex items-center justify-center ">
              <CgOrganisation className="w-[4rem] h-[4rem] " />
            </div> : <Image
              src={data.avatar}
              alt="addIcon"
              width={100}
              height={100}
              className=" rounded-full object-fill"
            />}
          </div>

          <div className="upperCard w-[100%] h-[20%] flex flex-col items-center justify-center ">
            <p className="headingCard text-[1.1rem]">@{data.userName}</p>

            <div className="status flex items-center gap-[.5rem]">
              <div
                className={`status w-[.5rem] h-[.5rem] ${status === "Active" ? "bg-[#29CE29]" : "bg-[#FCD53F]"
                  } rounded-[50%] `}
              ></div>
              <p className="Status text-[0.8rem]">{status}</p>
              <Image src={icon} alt="addIcon" width={30} height={30} />
            </div>
          </div>

          <div className="lowerCard w-[100%] h-[30%] gap-2 p-2 flex justify-center">
            <Button
              text={"Connected"}
              backgroundColor={"#007BFF"}
              textColor={"#ffffff"}
            />
            {((userData?.role === "admin") || (userData?.role === "brand_manager")) &&
              <Button
                text={"Disconnect"}
                backgroundColor={"#F0F0F0"}
                textColor={"gray"}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
