"use client"
import React, { useState } from "react";
import CurrentPlan from "@/components/Account&Subscription/CurrentPlan";
import UserInformation from "@/components/Account&Subscription/UserInformation";
import CurrentUsage from "@/components/Account&Subscription/CurrentUsage";
import BillingInformation from "@/components/Account&Subscription/BillingInformation";
import PaymentHistory from "@/components/Account&Subscription/PaymentHistory";
import TeamMember from "@/components/Account&Subscription/TeamMember";

const Account = () => {

  
  return (
    <>
      <div className="w-[95%]  mx-auto mt-8 p-6 bg-white/60 rounded-2xl relative z-10">
        <h1 className="text-2xl font-bold text-black  mb-6">
          Account & Subscription
        </h1>
        <UserInformation/>
        <CurrentPlan />
        <CurrentUsage />
        <BillingInformation />
        <PaymentHistory />
        <TeamMember />

        {/* {showPopup && 
        <div className="absolute top-[-5rem] right-0 left-[-10%]  w-[100vw] h-[100vh] bg-[#111]/50  rounded-[1rem] popupShadow z-[120]" style={{zIndex:'120'}}>

        </div>} */}
      </div>
    </>
  );
};

export default Account;
