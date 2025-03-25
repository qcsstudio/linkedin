"use client";
import BestToPost2Analytics from "@/components/AnalyticsComponets/BestTimeToPost2Analytics";
import BestTimeToPostAnalytics from "@/components/AnalyticsComponets/BestTimeToPostAnalytics";
import FollowersOverview from "@/components/AnalyticsComponets/FollowersOverviewAnalytics";
import HeatMapAnalytics from "@/components/AnalyticsComponets/HeatMapAnalytics";
import ImpressionOverviewAnalytics from "@/components/AnalyticsComponets/ImpressionOverviewAnalytics";
import ReadyToScdeduleAnalytics from "@/components/AnalyticsComponets/ReadyToScdeduleAnalytics";
import TotalOverview from "@/components/AnalyticsComponets/TotalOverviewAnalytics";
import { userContext } from "@/Context/user.context";
import React, { useContext, useEffect , useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { GoPlus } from "react-icons/go";
import { CiCircleRemove } from "react-icons/ci";
import "primereact/resources/themes/lara-light-cyan/theme.css";


const AnalyticsContianer = () => {
  const [selectedaccount, setSelectedaccount] = useState([]);
  const {
    getUserLinkedinProfiles,
    linkedinAccounts,
    getLinkedinOrganizationsProfiles,
    linkedinOrganizationId,
    getOrganizationAnalyticsData,
    oneOrganizationAnalticsData,
    organizationFollowerCount,
    linkedinProfileData
  } = useContext(userContext);



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
    getOrganizationAnalyticsData({
      id: 13740206,
      token:
        "AQUiuxOcGlVFGu_0lbZ68YyBg_3cpM6dvrzU4fY-cuzpCZHwMu6P9XJg0VAGnoY4zwXcl5iWwA9Co3sGoSyhx9hqTsPGT9daWWV8AdscgRSUgNO3Y9-27DNcGzWgvu8C_FyVkLSTluIgOAL6NmWX7ga0-CwQq6BPqi07SbmYyHxcxGp-9dupUO8D9haLkzStT6VEMMYumgzyiVSEickWav_JcsFVouDcpUP24tURBXygqVrqqPeEIYZGaMqPhvFrdQ7_O93ccc2uHz3javYUBrFcgEY8vRpqHktu1CwFpEtxiMQ6ZDx09dWf2g1oyqEJ8sy0rRrW7UT8JNLfKIoz4Od2qMjZAA",
    });
  }, []);

  const accountOptionTemplate = (option) => (
    <div className="flex items-center justify-between w-full px-2 py-1">
        <span className="font-medium">{option.user.name}</span>
        <img
            src={option.image}
            alt={option.name}
            className="w-5 h-5 rounded-full"
        />
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
          <span className="font-medium">{option.user.name}</span>

          <button
              className="text-gray-500 hover:text-red-500"
              onClick={(e) => {
                  e.stopPropagation();
                  setSelectedaccount(
                      selectedaccount.filter((c) => c.user.name !== option.user.name)
                  );
              }}
          >
              <CiCircleRemove />
          </button>
      </div>
  );
};


  return (
    <div className="p-8 flex flex-col gap-2">
      <div className="flex py-5 items-center justify-between">
        <h1 className="font-semibold text-xl">
          Hi,QCS <span className="text-lg font-thin">keep Moving Forward</span>
        </h1>
        {/* <button className="p-2 z-10 rounded-lg text-sm w-[20%] bg-[#4379EE] text-white flex items-center justify-center">
          <GoPlus />
          Add Account
        </button> */}

        <div className="p-5 flex flex-col gap-2 bg-white/50 rounded-lg">
          <h2 className=" font-bold text-lg">Posting on</h2>
          {linkedinProfileData && (
            <MultiSelect
              value={selectedaccount}
              onChange={(e) => setSelectedaccount(e.value)}
              options={linkedinProfileData ? linkedinProfileData : ""}
              optionLabel="name"
              placeholder="Select Platforms"
              filter
              selectedItemTemplate={selectedaccountTemplate}
              itemTemplate={accountOptionTemplate}
              display="chip"
              className="w-full bg-white border rounded-md px-3 py-2 shadow focus:ring-0 focus:outline-none"
            />
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col gap-3 z-10 rounded-lg bg-white/40">
        <h1 className="font-bold text-lg">Social Media Engagement</h1>
        {oneOrganizationAnalticsData && (
          <TotalOverview
            data={oneOrganizationAnalticsData[0]?.totalShareStatistics}
            followers={organizationFollowerCount}
          />
        )}

        <FollowersOverview />
        <ImpressionOverviewAnalytics />
        <div className="bg-white/50 flex flex-col gap-5 rounded-lg p-5">
          <BestTimeToPostAnalytics />
          <HeatMapAnalytics />
          <BestToPost2Analytics />
          <ReadyToScdeduleAnalytics />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsContianer;
