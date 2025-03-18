'use client'
import React from "react";
import dynamic from "next/dynamic";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const FollowersOverview = () => {
  const chartData = {
    series: [
      {
        name: "Followers",
        type: "column",
        data: [20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000],
      },
      {
        name: "New Followers",
        type: "line",
        data: [400, 600, 700, 900, 1100, 800, 1200, 900, 1300, 1000],
      },
    ],
    options: {
      chart: {
        height: 300,
        type: "line",
      },
      stroke: {
        width: [0, 2], 
      },
      xaxis: {
        categories: ["Feb 6", "Feb 9", "Feb 11", "Feb 14", "Feb 17", "Feb 20", "Feb 23", "Feb 26", "Mar 1", "Mar 4"],
      },
      yaxis: [
        {
          title: {
            text: "Followers",
          },
        },
        {
          opposite: true,
          title: {
            text: "New Followers",
          },
        },
      ],
      colors: ["#2563EB", "#FF0000"], 
    },
  };

  return (
    <div className="bg-white/50 flex flex-col gap-2 rounded-lg p-5">
      <h1 className="font-bold text-lg">Followers Overview</h1>
      <Chart options={chartData.options} series={chartData.series} type="line" height={300} />
    </div>
  );
};

export default FollowersOverview;
