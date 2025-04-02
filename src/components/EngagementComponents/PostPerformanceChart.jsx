import React from "react";
import Chart from "react-apexcharts";

const PostEngagementArea = ({ post }) => {
  const engagementData = [
    post?.impressions ?? 0,
    post?.clicks ?? 0,
    post?.likes ?? 0,
    post?.comments ?? 0,
    post?.shares ?? 0,
  ];

  const data = {
    series: [
      {
        name: "Engagement",
        data: engagementData,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 400,
        zoom: { enabled: false },
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      xaxis: {
        categories: ["Impressions", "Clicks", "Likes", "Comments", "Shares"],
        labels: { style: { fontSize: "14px" } },
      },
      colors: ["#00B8D9"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.2,
          stops: [0, 100],
        },
      },
      markers: {
        size: 6,
        colors: ["#ffffff"],
        strokeColors: "#00B8D9",
        strokeWidth: 3,
      },
      title: {
        text: "LinkedIn Post Engagement Overview",
        align: "center",
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} interactions`,
        },
      },
    },
  };

  return (
    <div className="w-full px-4 py-6 bg-white rounded-2xl shadow-xl">
      <Chart options={data.options} series={data.series} type="area" height={400} width="100%" />
    </div>
  );
};

export default PostEngagementArea;
