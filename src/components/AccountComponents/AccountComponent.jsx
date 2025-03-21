"use client";
import React, { useState, useContext, useEffect } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import CreateAccount from "./CreateAccount";
import { userContext } from "@/Context/user.context";

export default function AccountComponent() {
  const { userData, getUserLinkedinProfiles, linkedinProfileData , linkedinAccounts  , getLinkedinOrganizationsProfiles , linkedinOrganizationId} =
    useContext(userContext);
  const [addAccount, setAddAccount] = useState(false);

  console.log("userData", userData);

  useEffect(() => {
    if(linkedinAccounts){
      getUserLinkedinProfiles();
    }
  }, [linkedinAccounts]);

  useEffect(() => {
    if(linkedinOrganizationId){
      getLinkedinOrganizationsProfiles();
    }
  }, [linkedinOrganizationId]);

console.log("linkedinProfileData" ,linkedinProfileData)

if(!linkedinProfileData){
  return <div>...Loading</div>
}
  return (
    // Main Container
    <div className="accountContainer w-[95%] p-6">
      {/* Inner Container */}
      {!addAccount && (
        <div className="innerContainer w-[100%]">
          {/* Upper Container*/}
          <div className="upperContainer w-[100%] my-[1.2rem] py-[.5rem] flex justify-between items-center">
            <p className="heading text-3xl font-semibold">
              Hi, QCS <span className="text-base font-medium text-gray-500"> Keep Moving Forward</span>
            </p>
            <button
              className="px-[3rem] py-[0.5rem] bg-[#007BFF] rounded-[.5rem] text-[#ffffff]"
              onClick={() => setAddAccount(true)}
            >
              + Add Account
            </button>
          </div>

          {/* Lower Container */}
          <div className="lowerContainer bg-[#ffffff]/50 w-[100%] min-h-[65vh] max-h-[65vh] rounded-[.7rem] flex gap-[1.2rem]  flex-wrap p-[1.37rem] overflow-x-hidden overflow-y-scroll right">
         
           {
            linkedinProfileData && linkedinProfileData.map((item , index  )=>{
              console.log("item" ,item);
              return(
              <div key={item.user?.sub || index}>
                 <Card data={item.user} />
              </div>
              );
            })
           }  

            <AddCard setAddAccount={setAddAccount} addAccount={addAccount} />
          </div>
        </div>
      )}

      {addAccount && (
        <CreateAccount setAddAccount={setAddAccount} addAccount={addAccount} />
      )}
    </div>
  );
}
