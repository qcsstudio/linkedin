import React, { useContext, useEffect, useState } from "react";
import followers from "../../../public/images/engagementImages/followers.png";
import Like from "../../../public/images/engagementImages/like.png";
import comment from "../../../public/images/engagementImages/comment.png";
import save from "../../../public/images/engagementImages/save.png";
import upG from "../../../public/images/engagementImages/upG.png";
import upL from "../../../public/images/engagementImages/upL.png";
import upS from "../../../public/images/engagementImages/upS.png";
import upC from "../../../public/images/engagementImages/upC.png";
import StatsCard from "@/components/EngagementComponents/StatsCard";
import GrowthChart from "@/components/EngagementComponents/GrowthChart";
import PieChart from "@/components/EngagementComponents/PieChart";
import GraphComponent from "@/components/EngagementComponents/GraphComponent";
import { userContext } from "@/Context/user.context";
import analyticsContext from "@/Context/analytics.context";
import PostPerformanceChart from "@/components/EngagementComponents/PostPerformanceChart";

import { CiCircleRemove } from "react-icons/ci";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import TopPostInsights from "@/components/EngagementComponents/TopPostInsights";
import Loader from "../Loader/Loader";


const EngagementContainer = () => {
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
    views,
  } = useContext(userContext);

  const { GetTopPostsAPI, topPostsData } = useContext(analyticsContext);
  const [selectedPostForChart, setSelectedPostForChart] = useState(null);

  useEffect(() => {
    if (linkedinAccounts) {
      getUserLinkedinProfiles();
    }
  }, [linkedinAccounts]);

  useEffect(() => {
    if (linkedinOrganizationData) {
      getAllOrganizationsData(linkedinOrganizationData);
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

  useEffect(() => {
    if (linkedinOrganizationId) {
      getLinkedinOrganizationsProfiles();
      GetTopPostsAPI({ data: linkedinOrganizationId });
    }
  }, [linkedinOrganizationId]);


  useEffect(() => {
    if (topPostsData) {
      setSelectedPostForChart(topPostsData[0]);
    }
  }, [topPostsData]);

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
  if (!topPostsData) {
    return (
      <div className="min-h-[600px]  flex justify-center  items-center ">
        <Loader></Loader>
      </div>
    );
  }
  console.log("selectedaccount", selectedaccount);
  return (

    <div className="ml-[20px] pt-[12px] mt-[35px] bg-white/30 rounded-lg flex justify-center items-center">
      <div className="flex flex-col gap-6 w-full px-4">

        <h1 className="font-bold text-[22px]">Social Media Analytics</h1>

        {topPostsData && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <StatsCard
              title="clicks"
              value={topPostsData[0]?.clicks ?? "0"}
              iconSrc={followers}
              trendIconSrc={upG}
              trendPercentage="2.1%"
            />
            <StatsCard
              title="comments"
              value={topPostsData[0]?.comments ?? "0"}
              iconSrc={Like}
              trendIconSrc={upL}
              trendPercentage="2.1%"
            />
            <StatsCard
              title="likes"
              value={topPostsData[0]?.likes ?? "0"}
              iconSrc={comment}
              trendIconSrc={upC}
              trendPercentage="2.1%"
            />
            <StatsCard
              title="shares"
              value={topPostsData[0]?.shares ?? "0"}
              iconSrc={save}
              trendIconSrc={upS}
              trendPercentage="2.1%"
            />
          </div>
        )}

        <div className="w-full mt-6">
        {selectedPostForChart && (
  <div className="mt-6">
    <PostPerformanceChart post={selectedPostForChart} />
  </div>
)}

        </div>

   
        {topPostsData && (
          <div>
            <TopPostInsights
              topPosts={topPostsData}
              onRowClick={(post) => setSelectedPostForChart(post)}
            />
          </div>

        )}
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
    </div>
  );
};

export default EngagementContainer;
