"use client";
import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import analyticsContext from "@/Context/analytics.context";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AllViewsChart = () => {
  const { allViews } = useContext(analyticsContext);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (allViews && allViews.length) {
      const transformed = allViews.map((item) => ({
        date: new Date(item.date).toISOString(),
        views: item.views || 0,
      }));
      setChartData(transformed);
    }
  }, [allViews]);

  const totalViews = chartData.reduce((sum, d) => sum + d.views, 0);

  const maxY = Math.max(...chartData.map((d) => d.views), 1);
  const yaxisMax = maxY < 5 ? 5 : Math.ceil(maxY * 1.2);

  const chartOptions = {
    chart: {
      id: "views-chart",
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
        text: "Views",
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
        formatter: (val) => `${val} views`,
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
  };

  const series = [
    {
      name: "Views",
      data: chartData.map((d) => d.views),
    },
  ];

  return (
    <div className="p-6 bg-white/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/40">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">All Views Analytics</h2>

      <div className="mb-4 text-sm font-medium text-gray-700">
        Total Views:{" "}
        <strong className="text-blue-700">{totalViews.toLocaleString()}</strong>
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

export default AllViewsChart;
