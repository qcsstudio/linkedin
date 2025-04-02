import React, { useContext, useEffect } from "react";
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
import TopPostInsights from "@/components/EngagementComponents/TopPostInsights";

const EngagementContainer = () => {
  const {
    getUserLinkedinProfiles,
    linkedinAccounts,
    getLinkedinOrganizationsProfiles,
    linkedinOrganizationId,
  } = useContext(userContext);

  const { GetTopPostsAPI, topPostsData } = useContext(analyticsContext);

  useEffect(() => {
    if (linkedinAccounts) {
      getUserLinkedinProfiles();
    }
  }, [linkedinAccounts]);

  useEffect(() => {
    if (linkedinOrganizationId) {
      getLinkedinOrganizationsProfiles();
      GetTopPostsAPI({ data: linkedinOrganizationId });
    }
  }, [linkedinOrganizationId]);

  console.log("topPostsData", topPostsData);

  return (
    <div className="ml-[20px] w-[92.2%] pt-[12px] mt-[35px] bg-white/30 rounded-lg flex justify-center ">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-[22px]">Social Media Analytics</h1>
        {topPostsData && (
          <div className="flex gap-3">
            <StatsCard
              title="clicks"
              value={topPostsData[0].clicks}
              iconSrc={followers}
              trendIconSrc={upG}
              trendPercentage="2.1%"
            />
            <StatsCard
              title="comments"
              value={topPostsData[0].comments}
              iconSrc={Like}
              trendIconSrc={upL}
              trendPercentage="2.1%"
            />
            <StatsCard
              title="likes"
              value={topPostsData[0].likes}
              iconSrc={comment}
              trendIconSrc={upC}
              trendPercentage="2.1%"
            />
            <StatsCard
              title="shares"
              value={topPostsData[0].shares}
              iconSrc={save}
              trendIconSrc={upS}
              trendPercentage="2.1%"
            />
          </div>
        )}

        {/* <div className="mt-[20px] flex gap-5">
          <div className="w-[700px]">
            <GrowthChart />
          </div>

          <div className="rounded-lg bg-white/50 pt-[20px] text-[18px] w-[234px]">
            <h3 className="pl-6 font-[600]">Recent Posts</h3>
            <div className="mt-[30px]">
              <PieChart />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-[600] text-[18px]">Most Viewed Place</h2>
          <div className="bg-white/50 flex justify-center items-center align-middle w-[99.5%] rounded-lg">
            <GraphComponent />
          </div>
        </div> */}
        <div>
          <TopPostInsights/>
        </div>
<div>
  {/* <PostPerformanceChart/> */}
</div>
      </div>
    </div>
  );
};

export default EngagementContainer;
