"use client";
import BestToPost2Analytics from "@/components/AnalyticsComponets/BestTimeToPost2Analytics";
import BestTimeToPostAnalytics from "@/components/AnalyticsComponets/BestTimeToPostAnalytics";
import FollowersChart from "@/components/AnalyticsComponets/FollowersChart";
import HeatMapAnalytics from "@/components/AnalyticsComponets/HeatMapAnalytics";
import ImpressionOverviewAnalytics from "@/components/AnalyticsComponets/ImpressionOverviewAnalytics";
import ReadyToScdeduleAnalytics from "@/components/AnalyticsComponets/ReadyToScdeduleAnalytics";
import TotalOverview from "@/components/AnalyticsComponets/TotalOverviewAnalytics";
import { userContext } from "@/Context/user.context";
import React, { useContext, useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { GoPlus } from "react-icons/go";
import { CiCircleRemove } from "react-icons/ci";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Dropdown } from "primereact/dropdown";
import analyticsContext from "@/Context/analytics.context";
import Loader from "../Loader/Loader";
import AllViewsChart from "@/components/AnalyticsComponets/AllViewsChart";

const AnalyticsContianer = () => {
  const [selectedaccount, setSelectedaccount] = useState(null);
  const {
    getUserLinkedinProfiles,
    linkedinAccounts,
    getLinkedinOrganizationsProfiles,
    linkedinOrganizationId,
    getOrganizationAnalyticsData,
    oneOrganizationAnalticsData,
    organizationFollowerCount,
    linkedinProfileData,
    linkedinOrganizationData,
    getAllOrganizationsData,
    views
  } = useContext(userContext);

  const {GetGrowthDataAPI , growthData , GetAllViewsAPI,GetAllFollowersAPI} = useContext(analyticsContext);

  useEffect(() => {
    if (linkedinAccounts) {
      getUserLinkedinProfiles();
    }
  }, [linkedinAccounts]);

  useEffect(() => {
    if (linkedinOrganizationId) {
      getLinkedinOrganizationsProfiles();
    }
  }, [linkedinOrganizationId]);

  useEffect(() => {
    if (selectedaccount) {
      getOrganizationAnalyticsData({
        id: selectedaccount.id,
        token: selectedaccount.token,
      });
      GetGrowthDataAPI({
        id: selectedaccount.id,
        token: selectedaccount.token,
      })
    }
  }, [selectedaccount]);

  useEffect(() => {
    if (linkedinOrganizationData) {
      getAllOrganizationsData(linkedinOrganizationData);
      GetAllViewsAPI(linkedinOrganizationData);
      GetAllFollowersAPI(linkedinOrganizationData);
    }
  }, [linkedinOrganizationData]);

  const accountOptionTemplate = (option) => (
    <div className="flex items-center justify-between w-full px-2 py-1">
      <span className="font-medium">{option.vanityName}</span>
      {/* <img
        src={option.image}
        alt={option.name}
        className="w-5 h-5 rounded-full"
      /> */}
    </div>
  );

  const selectedaccountTemplate = (option) => {
    if (!option) return <span>Select a account</span>;

    return (
      <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">
        <img
          src={"/images/createPostImages/linkdin.png"}
          alt={"linkedin"}
          className="w-5 h-5 rounded-full"
        />
        <span className="font-medium">{option.vanityName}</span>

        <button
          className="text-gray-500 hover:text-red-500"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedaccount(null);
            getAllOrganizationsData(linkedinOrganizationData);
          }}
        >
          <CiCircleRemove />
        </button>
      </div>
    );
  };

  console.log("selectedaccount", selectedaccount);
  return (
    <div className="p-8 flex flex-col gap-2">
      <div className="flex py-5 items-center justify-between">
        <h1 className="font-semibold text-xl">
          Hi,QCS <span className="text-lg font-thin">keep Moving Forward</span>
        </h1>

        <div className="w-[30%]">
          {linkedinOrganizationData && (
            <Dropdown
              value={selectedaccount}
              onChange={(e) => setSelectedaccount(e.value)}
              options={linkedinOrganizationData || []}
              optionLabel="vanityName" // Ensure this matches your object structure
              placeholder="Select Platforms"
              className="w-full md:w-14rem"
              itemTemplate={accountOptionTemplate}
              valueTemplate={(option) =>
                option ? (
                  selectedaccountTemplate(option)
                ) : (
                  <span>Select an account</span>
                )
              }
            />
          )}
        </div>
      </div>
      {
        !oneOrganizationAnalticsData ?
         <div className=" flex   min-h-[600px] z-10 rounded-lg bg-white/40">
           <Loader/>
         </div>   :   <div className="p-6 flex flex-col gap-3 z-10 rounded-lg bg-white/40">
           <h1 className="font-bold text-lg">Social Media Engagement</h1>
           {oneOrganizationAnalticsData && (
             <TotalOverview
               data={oneOrganizationAnalticsData[0]?.totalShareStatistics}
               followers={organizationFollowerCount}
               growthData={growthData}
               views={views}
             />
           )}
           
           {selectedaccount && (
             <FollowersChart
               id={selectedaccount.id}
               token={selectedaccount.token}
             />
           )}
   
           {selectedaccount && (
             <ImpressionOverviewAnalytics
               id={selectedaccount.id}
               token={selectedaccount.token}
             />
           )}
   
           <div className="bg-white/50 flex flex-col gap-5 rounded-lg p-5">
           {!selectedaccount && <AllViewsChart />}
             {!selectedaccount && <FollowersChart />}
             <BestTimeToPostAnalytics />
             <HeatMapAnalytics />
             <BestToPost2Analytics />
             <ReadyToScdeduleAnalytics />
             

           </div>
         </div>
      }
    </div>
  );
};

export default AnalyticsContianer;
