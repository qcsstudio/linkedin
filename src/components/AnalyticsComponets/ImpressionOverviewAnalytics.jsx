'use client'
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ImpressionsOverview = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = {
    series: [
      {
        name: "Impressions",
        data: [15000, 22000, 28000, 32000, 40000, 46000, 52000, 58000, 63000, 70000],
      },
      {
        name: "Unique Impressions",
        data: [1000, 1400, 1800, 2000, 2200, 2500, 2700, 3000, 3300, 3500],
      },
      {
        name: "Views",
        data: [800, 1200, 1600, 1800, 2000, 2300, 2600, 2800, 3000, 3200],
      },
      {
        name: "Unique Views",
        data: [600, 1000, 1400, 1600, 1800, 2000, 2300, 2500, 2700, 2900],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 300,
        stacked: true,
        toolbar: { show: false },
      },
      stroke: {
        curve: "smooth",
        width: 5,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.5,
          opacityFrom: 0.6,
          opacityTo: 0.2,
        },
      },
      xaxis: {
        categories: ["Feb 6", "Feb 9", "Feb 11", "Feb 14", "Feb 17", "Feb 20", "Feb 23", "Feb 26", "Mar 1", "Mar 4"],
      },
      colors: ["#6366F1", "#22C55E", "#EF4444", "#FACC15"], 
      legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        itemMargin: { horizontal: 10, vertical: 5 },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  };

  return (
    <div className="bg-white/50 flex flex-col gap-2 rounded-lg p-5 ">
      <h1 className="font-bold text-lg ">Impressions Overview</h1>
      {mounted && <Chart options={chartData.options} series={chartData.series} type="area" height={300} width="100%" />}
    </div>
  );
};

export default ImpressionsOverview;
