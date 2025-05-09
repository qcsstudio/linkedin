"use client";
import React, { useState, useContext, useEffect } from "react";
import AddCard from "./AddCard";
import Card from "./Card";
import CreateAccount from "./CreateAccount";
import { userContext } from "@/Context/user.context";
import OrganizationCard from "./OrganizationCard";
import Loader from "@/containers/Loader/Loader";
import { getLinkedinAccounts } from "@/utils/getLinkedinAccounts";

export default function AccountComponent() {
  const {
    userData,
    getUserLinkedinProfiles,
    linkedinProfileData,
    linkedinAccounts,
    getLinkedinOrganizationsProfiles,
    linkedinOrganizationId,
    linkedinOrganizationData,
    clientData,
    setClientData,
    getClientData,
    openAddAccount,
    setOpenAddAccount
  } = useContext(userContext);
  const [addAccount, setAddAccount] = useState(false);

  if(linkedinProfileData){
    console.log("Linkedin Profile Data: ",linkedinProfileData);
  }

  useEffect(() => {
    getClientData();
    console.log("client Data: +++++++++++++>",clientData);
  }, []);

  if(clientData != null){
    console.log("client Data: +++++++++++++>",clientData);
  }

  useEffect(() => {
    if (linkedinOrganizationId) {
      getLinkedinOrganizationsProfiles();
    }
  }, [linkedinOrganizationId]);

  return (
    <div className="accountContainer w-[95%] mx-auto p-4 z-[100] relative">
      {!addAccount && (
        <div className="innerContainer w-[100%] z-[100]">
          <div className="upperContainer w-[100%] my-[1.2rem] py-[.5rem] flex justify-between items-center z-[100]">
            <p className="heading text-[1.4rem] font-normal sticky">
              Hi, QCS <span className="text-[.9rem]">Keep Moving Forward</span>
            </p>
            {((userData?.role === "admin") || (userData?.role === "brand_manager")) && 
            <button
              className="px-[3rem] py-[0.5rem] bg-[#007BFF] rounded-[.5rem] text-[#ffffff]"
              onClick={() => setOpenAddAccount(true)}
            >
              + Add Account
            </button>}
          </div>

          <div
            className="lowerContainer bg-[#ffffff]/50 w-[100%]  min-h-[67vh] max-h-[67vh] rounded-[.7rem]
           z-[100] flex gap-[1.2rem]  flex-wrap p-[1.37rem] overflow-x-hidden overflow-y-scroll right"
          >
            {clientData ? (
              <>
                {clientData?.platforms?.map((item, index) => {

                  return (
                    <div key={item.userName || index} className="w-[31%]">
                      <Card data={item} />
                    </div>
                  );
                })}

                {/* {linkedinOrganizationData?.map((item, index) => {
                  return (
                    <div key={index} className="w-[31%]">
                      <OrganizationCard data={item} />
                    </div>
                  );
                })} */}

                {((userData?.role === "admin") || (userData?.role === "brand_manager")) &&

                  <AddCard/>
                }
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      )}

      {/* {addAccount && (
        <CreateAccount setAddAccount={setAddAccount} addAccount={addAccount} />
      )} */}
    </div>
  );
}
