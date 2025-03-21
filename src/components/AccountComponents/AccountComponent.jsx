"use client";
import React, { useState, useContext, useEffect } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import CreateAccount from "./CreateAccount";
import { userContext } from "@/Context/user.context";
import OrganizationCard from "./OrganizationCard";

export default function AccountComponent() {
  const { userData, getUserLinkedinProfiles, linkedinProfileData , linkedinAccounts  , getLinkedinOrganizationsProfiles , linkedinOrganizationId,linkedinOrganizationData} =
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
    <div className="accountContainer w-[100%] z-[100] relative">
  
      {!addAccount && (
        <div className="innerContainer w-[100%] z-[100]">
        
          <div className="upperContainer w-[100%] my-[1.2rem] py-[.5rem] flex justify-between items-center z-[100]">
            <p className="heading text-[1.4rem] font-normal ">
              Hi, QCS <span className="text-[.9rem]">Keep Moving Forward</span>
            </p>
            <button
              className="px-[3rem] py-[0.5rem] bg-[#007BFF] rounded-[.5rem] text-[#ffffff] z-[100]"
              onClick={() => setAddAccount(true)}
            >
              + Add Account
            </button>
          </div>

    
          <div className="lowerContainer bg-[#ffffff]/50 w-[100%] min-h-[65vh] max-h-[65vh] rounded-[.7rem] z-[100] flex gap-[1.2rem]  flex-wrap p-[1.37rem] overflow-x-hidden overflow-y-scroll right">
         
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
          

           {
            linkedinOrganizationData?.map((item , index  )=>{
              console.log("item" ,item);
              return <OrganizationCard key={index} data={item} />
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
