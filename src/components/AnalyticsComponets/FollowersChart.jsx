"use client";

import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import analyticsContext from "@/Context/analytics.context";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const CombinedFollowersChart = () => {
  const { allFollowers } = useContext(analyticsContext);
  const [chartData, setChartData] = useState([]);

  

  useEffect(() => {
    if (allFollowers?.dailyCombinedFollowers?.length) {
      const formatted = allFollowers.dailyCombinedFollowers.map((item) => ({
        date: new Date(item.date).toISOString(),
        organic: item.organic || 0,
        paid: item.paid || 0,
      }));
      setChartData(formatted);
    }
  }, [allFollowers]);

  const total = {
    all: allFollowers?.totalFollowersAllOrgs || 0,
    organic: allFollowers?.totalOrganicAllOrgs || 0,
    paid: allFollowers?.totalPaidAllOrgs || 0,
  };

  const maxY = Math.max(
    ...chartData.flatMap((d) => [d.organic, d.paid]),
    1
  );
  const yaxisMax = maxY < 5 ? 5 : Math.ceil(maxY * 1.2);

  const chartOptions = {
    chart: {
      id: "followers-chart",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    fill: {
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: chartData.map((d) => d.date),
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
        },
        formatter: function (value) {
          const date = new Date(value);
          const day = date.getDate();
          const month = date.toLocaleString("default", { month: "short" });
          return `${day} ${month}`;
        },
      },
      title: {
        text: "Date",
        style: { fontWeight: 600 },
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      title: {
        text: "Followers",
        style: { fontWeight: 600 },
      },
      min: 0,
      max: yaxisMax,
      tickAmount: 5,
      labels: {
        formatter: (val) => Math.round(val),
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val} followers`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    grid: {
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
    },
    colors: ["#10b981", "#8b5cf6"], // Green & Purple
  };

  const series = [
    {
      name: "Organic Followers",
      data: chartData.map((d) => d.organic),
    },
    {
      name: "Paid Followers",
      data: chartData.map((d) => d.paid),
    },
  ];

  return (
    <div className="p-6 bg-white/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/40">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        LinkedIn Followers Analytics
      </h2>

      <div className="mb-4 text-sm font-medium text-gray-700 flex gap-4">
        <div className="bg-blue-50 px-3 py-2 rounded-lg shadow">
          <span className="text-gray-600">Total: </span>
          <span className="font-bold text-blue-700">
            {total.all.toLocaleString()}
          </span>
        </div>
        <div className="bg-green-50 px-3 py-2 rounded-lg shadow">
          <span className="text-gray-600">Organic: </span>
          <span className="font-bold text-green-700">
            {total.organic.toLocaleString()}
          </span>
        </div>
        <div className="bg-purple-50 px-3 py-2 rounded-lg shadow">
          <span className="text-gray-600">Paid: </span>
          <span className="font-bold text-purple-700">
            {total.paid.toLocaleString()}
          </span>
        </div>
      </div>

      <Chart
        className="bg-white/60"
        options={chartOptions}
        series={series}
        type="area"
        height={380}
      />
    </div>
  );
};

export default CombinedFollowersChart;
