"use client"
import React, { useState } from "react";
import CurrentPlan from "@/components/Account&Subscription/CurrentPlan";
import UserInformation from "@/components/Account&Subscription/UserInformation";
import CurrentUsage from "@/components/Account&Subscription/CurrentUsage";
import BillingInformation from "@/components/Account&Subscription/BillingInformation";
import PaymentHistory from "@/components/Account&Subscription/PaymentHistory";
import TeamMember from "@/components/Account&Subscription/TeamMember";

const Account = () => {

  const [showPopup,setShowPopup] = useState(false);
  
  return (
    <>
      <div className="w-[95%]  mx-auto mt-8 p-6 bg-white/60 rounded-2xl relative z-10">
        <h1 className="text-2xl font-bold text-black  mb-6">
          Account & Subscription
        </h1>
        <UserInformation setShowPopup={setShowPopup} showPopup={showPopup} />
        <CurrentPlan />
        <CurrentUsage />
        <BillingInformation />
        <PaymentHistory />
        <TeamMember />

        {showPopup && 
        <div className="absolute top-[10%] left-[10%]  w-[40vw] h-[40vh] bg-[#fff] z-20 rounded-[1rem] popupShadow">

        </div>}
      </div>
    </>
  );
};

export default Account;
