'use client'
import dynamic from 'next/dynamic';
import React from 'react';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HeatMapAnalytics = ({ data }) => {
  console.log("heatmap data", data);

  // Transform API response into ApexHeatmap format
  const timeSlots = ["6:00 AM", "12:00 PM", "6:00 PM", "7:30 PM", "9:30 PM"];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const chartSeries = timeSlots.map(slot => ({
    name: slot,
    data: weekDays.map(day => {
      const dayData = data.find(d => d.day === day);
      return dayData?.slots?.[slot] ?? 0;
    }),
  }));

  const options = {
    chart: { type: "heatmap" },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            { from: 0, to: 100, color: "#9FC3F9", name: "Below Avg" },
            { from: 101, to: 149, color: "#4185F4", name: "Average+" },
            { from: 150, to: 199, color: "#0B57D0", name: "High" },
            { from: 200, to: 999, color: "#003366", name: "Top" },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#000000"],
        fontSize: "12px",
        fontWeight: "bold",
      },
      formatter: function (value) {
        return `${value}%`;
      },
    },
    xaxis: {
      categories: weekDays,
    },
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-lg">Weekly Engagement Heatmap</h1>
      <div className="bg-white/50 rounded-lg p-1">
        <Chart options={options} series={chartSeries} type="heatmap" height={350} />
      </div>
    </div>
  );
};

export default HeatMapAnalytics;
