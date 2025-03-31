"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
;

const timeRanges = {
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

const chartTypes = ["line", "bar", "area"];

export default function ImpressionsOverview({ id, token }) {
  const [selectedRange, setSelectedRange] = useState("7d");
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("area");
  const [isStacked, setIsStacked] = useState(false);

  const fetchData = async () => {
    const now = Date.now();
    const start = now - timeRanges[selectedRange];
    const end = now;

    try {
      const res = await fetch(
        `/api/linkedin/page-views?start=${start}&end=${end}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            id,
          }),
        }
      );
      const data = await res.json();

      const transformedData = data.elements.map((item) => {
        const date = new Date(item.timeRange.start).toISOString();
        const views =
          item.totalPageStatistics?.views?.allPageViews?.pageViews || 0;
        const unique =
          item.totalPageStatistics?.views?.allPageViews?.uniquePageViews || 0;
        return { date, views, unique };
      });

      setChartData(transformedData);
    } catch (err) {
      console.error("Error loading page views:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedRange , id, token]);

  const maxY = Math.max(...chartData.map((d) => d.views), 1);
  const yaxisMax = maxY < 5 ? 5 : Math.ceil(maxY * 1.2);
  const totalViews = chartData.reduce((sum, d) => sum + d.views, 0);
  const totalUnique = chartData.reduce((sum, d) => sum + d.unique, 0);

  const chartOptions = {
    chart: {
      id: "page-views-chart",
      stacked: isStacked,
      toolbar: {
        show: true,
        tools: {
          download: true,
          reset: true,
          zoom: true,
          pan: true,
        },
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    fill: {
      type: chartType === "area" ? "gradient" : "solid",
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
        formatter: (value) => {
          const date = new Date(value);
          return `${date.getDate()} ${date.toLocaleString("default", {
            month: "short",
          })}`;
        },
      },
      title: { text: "Date", style: { fontWeight: 600 } },
    },
    yaxis: {
      min: 0,
      max: yaxisMax,
      tickAmount: 5,
      title: { text: "Page Views", style: { fontWeight: 600 } },
      labels: {
        formatter: (val) => Math.round(val),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val} views`,
      },
    },
    legend: { position: "top", horizontalAlign: "center" },
    grid: {
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: chartType === "bar" ? 0 : 2,
    },
  };

  const series = [
    {
      name: "Total Views",
      data: chartData.map((d) => d.views),
    },
    {
      name: "Unique Views",
      data: chartData.map((d) => d.unique),
    },
  ];

  return (
    <div className="p-6 bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/40">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        📊 LinkedIn Page Views
      </h2>

      {/* Summary */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4 text-sm text-gray-700">
        <div className="font-semibold">
          Total Views: <span className="text-blue-700">{totalViews}</span>
        </div>
        <div className="font-semibold">
          Unique Views: <span className="text-green-700">{totalUnique}</span>
        </div>
        <button
          onClick={() => setIsStacked(!isStacked)}
          className="px-4 py-1.5 text-xs border rounded-full bg-white hover:bg-gray-100 transition-all"
        >
          {isStacked ? "Unstack" : "Stack"} Bars
        </button>
      </div>

      {/* Time Range Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        {Object.keys(timeRanges).map((range) => (
          <button
            key={range}
            onClick={() => setSelectedRange(range)}
            className={`px-4 py-2 rounded-xl transition-all duration-200 shadow-sm ${
              selectedRange === range
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {range === "7d" ? "Last 7 Days" : "Last 30 Days"}
          </button>
        ))}
      </div>

      
      <div className="flex gap-3 mb-6">
        {chartTypes.map((type) => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            className={`px-4 py-1.5 text-sm font-medium capitalize rounded-full border transition-all ${
              chartType === type
                ? "bg-indigo-600 text-white border-indigo-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {type} Chart
          </button>
        ))}
      </div>

      {/* Chart */}
      <Chart
        options={chartOptions}
        series={series}
        type={chartType}
        height={400}
      />
    </div>
  );
}
