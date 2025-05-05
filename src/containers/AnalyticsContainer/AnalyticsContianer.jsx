"use client";

import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { CiCircleRemove } from "react-icons/ci";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import BestToPost2Analytics from "@/components/AnalyticsComponets/BestTimeToPost2Analytics";
import BestTimeToPostAnalytics from "@/components/AnalyticsComponets/BestTimeToPostAnalytics";
import FollowersChart from "@/components/AnalyticsComponets/FollowersChart";
import HeatMapAnalytics from "@/components/AnalyticsComponets/HeatMapAnalytics";
import ImpressionOverviewAnalytics from "@/components/AnalyticsComponets/ImpressionOverviewAnalytics";
import ReadyToScdeduleAnalytics from "@/components/AnalyticsComponets/ReadyToScdeduleAnalytics";
import TotalOverview from "@/components/AnalyticsComponets/TotalOverviewAnalytics";
import AllViewsChart from "@/components/AnalyticsComponets/AllViewsChart";
import Loader from "../Loader/Loader";

import { userContext } from "@/Context/user.context";
import analyticsContext from "@/Context/analytics.context";

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
    views,
  } = useContext(userContext);

  const {
    GetGrowthDataAPI,
    growthData,
    GetAllViewsAPI,
    GetAllFollowersAPI,
    GETHeatMapAPI,
    heatMapData,
  } = useContext(analyticsContext);

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
      });
      GETHeatMapAPI({
        id: selectedaccount.id,
        token: selectedaccount.token,
      });
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
    </div>
  );

  const selectedaccountTemplate = (option) => {
    if (!option) return <span>Select an account</span>;

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

  // 📤 PDF Export Handler
  const handleDownloadPDF = async () => {
    const input = document.getElementById("analytics-pdf-container");
    if (!input) return;

    try {
      // Capture container with proper styling
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        onclone: (clonedDoc) => {
          // Ensure proper styling for PDF export
          const element = clonedDoc.getElementById("analytics-pdf-container");
          element.style.background = "#fff";
          element.style.width = "fit-content";
          // Hide interactive elements
          clonedDoc.querySelectorAll("button").forEach(el => el.style.display = "none");
        }
      });

      // Create PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgRatio = (canvas.width / canvas.height);
      const imgWidth = pageWidth;
      const imgHeight = imgWidth / imgRatio;

      // Split PDF into multiple pages if content is too tall
      let position = 0;
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
        pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
        position -= pageHeight;

        if (remainingHeight > 0) {
          pdf.addPage();
        }
      }

      pdf.save("analytics-report.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="p-8 flex flex-col gap-2">
      <div className="flex py-5 items-center justify-between">
        <h1 className="font-semibold text-xl">
          Hi, QCS <span className="text-lg font-thin">keep Moving Forward</span>
        </h1>

        <div className="flex gap-4 items-center">
          <div className="w-[300px]">
            {linkedinOrganizationData && (
              <Dropdown
                value={selectedaccount}
                onChange={(e) => setSelectedaccount(e.value)}
                options={linkedinOrganizationData || []}
                optionLabel="vanityName"
                placeholder="Select Platforms"
                className="w-full md:w-14rem"
                itemTemplate={accountOptionTemplate}
                valueTemplate={(option) =>
                  option ? selectedaccountTemplate(option) : <span>Select an account</span>
                }
              />
            )}
          </div>

          <button
            onClick={handleDownloadPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!oneOrganizationAnalticsData}
          >
            Download PDF
          </button>
        </div>
      </div>

      {!oneOrganizationAnalticsData ? (
        <div className="flex min-h-[600px] z-10 rounded-lg bg-white/40">
          <Loader />
        </div>
      ) : (
        <div
        id="analytics-pdf-container"
        className="p-6 flex flex-col gap-3 z-10 rounded-lg bg-white"
        style={{ minWidth: "1200px" }} // Ensure consistent width
      >
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
            <FollowersChart id={selectedaccount.id} token={selectedaccount.token} />
          )}

          {selectedaccount && (
            <ImpressionOverviewAnalytics id={selectedaccount.id} token={selectedaccount.token} />
          )}

          <div className="bg-white/50 flex flex-col gap-5 rounded-lg p-5">
            {!selectedaccount && <AllViewsChart />}
            {!selectedaccount && <FollowersChart />}
            <BestTimeToPostAnalytics />
            {heatMapData && <HeatMapAnalytics data={heatMapData} />}
            <BestToPost2Analytics />
            <ReadyToScdeduleAnalytics />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsContianer;
