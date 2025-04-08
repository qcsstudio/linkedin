import React, { useContext, useEffect, useMemo, useState } from "react";
import followers from "../../../public/images/engagementImages/followers.png";
import Like from "../../../public/images/engagementImages/like.png";
import comment from "../../../public/images/engagementImages/comment.png";
import save from "../../../public/images/engagementImages/save.png";
import upG from "../../../public/images/engagementImages/upG.png";
import upL from "../../../public/images/engagementImages/upL.png";
import upS from "../../../public/images/engagementImages/upS.png";
import upC from "../../../public/images/engagementImages/upC.png";
import StatsCard from "@/components/EngagementComponents/StatsCard";
import PostPerformanceChart from "@/components/EngagementComponents/PostPerformanceChart";
import TopPostInsights from "@/components/EngagementComponents/TopPostInsights";
import { CiCircleRemove } from "react-icons/ci";
import { Dropdown } from "primereact/dropdown";
import Loader from "../Loader/Loader";
import { userContext } from "@/Context/user.context";
import analyticsContext from "@/Context/analytics.context";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Posts from "@/components/EngagementComponents/Posts";

const EngagementContainer = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

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
  } = useContext(userContext);

  const { GetTopPostsAPI, topPostsData, GetLinkedinPostsAPI, posts } =
    useContext(analyticsContext);

  // Fetch LinkedIn profiles when accounts change
  useEffect(() => {
    linkedinAccounts && getUserLinkedinProfiles();
  }, [linkedinAccounts]);

  // Fetch all org data if org list updates
  useEffect(() => {
    linkedinOrganizationData &&
      getAllOrganizationsData(linkedinOrganizationData);
  }, [linkedinOrganizationData]);

  // Fetch top posts when org ID updates
  useEffect(() => {
    if (linkedinOrganizationId) {
      getLinkedinOrganizationsProfiles();
      GetTopPostsAPI({ data: linkedinOrganizationId });
    }
  }, [linkedinOrganizationId]);

  useEffect(() => {
    if (selectedAccount) {
      const { id, token } = selectedAccount;

      GetTopPostsAPI({
        data: [
          {
            organizationalTarget: `urn:li:organization:${id}`,
            token,
          },
        ],
      });

      GetLinkedinPostsAPI({ id, token });
    }
  }, [selectedAccount]);

  // Select first post by default
  useEffect(() => {
    if (topPostsData?.length) {
      setSelectedPost(topPostsData[0]);
    }
  }, [topPostsData]);

  const handleAccountRemove = (e) => {
    e.stopPropagation();
    setSelectedAccount(null);
    getAllOrganizationsData(linkedinOrganizationData);
  };

  const accountOptionTemplate = (option) => (
    <div className="flex items-center justify-between w-full px-2 py-1">
      <span className="font-medium">{option.vanityName}</span>
    </div>
  );

  const selectedAccountTemplate = (option) =>
    !option ? (
      <span>Select an account</span>
    ) : (
      <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">
        <img
          src={"/images/createPostImages/linkdin.png"}
          alt="linkedin"
          className="w-5 h-5 rounded-full"
        />
        <span className="font-medium">{option.vanityName}</span>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={handleAccountRemove}
        >
          <CiCircleRemove />
        </button>
      </div>
    );

  const renderStatsCards = useMemo(() => {
    if (!selectedPost) return null;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <StatsCard
          title="clicks"
          value={selectedPost.clicks ?? "0"}
          iconSrc={followers}
          trendIconSrc={upG}
          trendPercentage="2.1%"
        />
        <StatsCard
          title="comments"
          value={selectedPost.comments ?? "0"}
          iconSrc={Like}
          trendIconSrc={upL}
          trendPercentage="2.1%"
        />
        <StatsCard
          title="likes"
          value={selectedPost.likes ?? "0"}
          iconSrc={comment}
          trendIconSrc={upC}
          trendPercentage="2.1%"
        />
        <StatsCard
          title="shares"
          value={selectedPost.shares ?? "0"}
          iconSrc={save}
          trendIconSrc={upS}
          trendPercentage="2.1%"
        />
      </div>
    );
  }, [selectedPost]);

  if (!topPostsData) {
    return (
      <div className="min-h-[600px] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="ml-[20px] pt-[12px] mt-[35px] bg-white/30 rounded-lg flex justify-center items-center">
      <div className="flex flex-col gap-6 w-full px-4">
        <div className="flex justify-between">
          <h1 className="font-bold text-[22px]">Social Media Analytics</h1>
          {linkedinOrganizationData && (
            <div className="w-[30%]">
              <Dropdown
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.value)}
                options={linkedinOrganizationData}
                optionLabel="vanityName"
                placeholder="Select Platform"
                className="w-full md:w-14rem"
                itemTemplate={accountOptionTemplate}
                valueTemplate={selectedAccountTemplate}
              />
            </div>
          )}
        </div>

        {renderStatsCards}

        <TopPostInsights topPosts={topPostsData} onRowClick={setSelectedPost} />

        {selectedPost && (
          <div className="w-full mt-6">
            <PostPerformanceChart post={selectedPost} />
          </div>
        )}

        {selectedAccount && (
          <>
            <Posts data={posts} selectedOrganization={selectedAccount} />
          </>
        )}
      </div>
    </div>
  );
};

export default EngagementContainer;
