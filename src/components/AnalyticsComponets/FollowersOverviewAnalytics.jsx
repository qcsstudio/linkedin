"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const timeRanges = {
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

const chartTypes = ["line", "bar", "area"];

export default function FollowersChart({id, token}) {
  const [selectedRange, setSelectedRange] = useState("7d");
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("line");

  const fetchData = async () => {
    const now = Date.now();
    const start = now - timeRanges[selectedRange];
    const end = now;

    try {
      const res = await fetch(
        `/api/linkedin/linkedin-followers?start=${start}&end=${end}`,
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

      let transformedData = data.elements.map((item) => {
        const date = new Date(item.timeRange.start).toISOString();
        return {
          date,
          organic: item.followerGains?.organicFollowerGain || 0,
          paid: item.followerGains?.paidFollowerGain || 0,
        };
      });

      if (selectedRange === "30d") {
        transformedData = transformedData.filter((_, index) => index % 3 === 0);
      }

      setChartData(transformedData);
    } catch (err) {
      console.error("Error loading chart data:", err);
    }
  };

  useEffect(() => {
    if (id && token) {
      fetchData();
    }
  }, [selectedRange, id, token]);

  const totalOrganic = chartData.reduce((sum, d) => sum + d.organic, 0);
  const totalPaid = chartData.reduce((sum, d) => sum + d.paid, 0);
  const totalFollowers = totalOrganic + totalPaid;

  const maxY = Math.max(...chartData.map((d) => d.organic + d.paid), 1);
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
    plotOptions: {
      bar: {
        columnWidth: "50%",
        dataLabels: {
          position: "top",
        },
        distributed: false,
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
        text: "Followers Gained",
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
      width: chartType === "bar" ? 0 : 2,
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
    <div className="p-6 bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/40">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">
        📈 LinkedIn Follower Growth
      </h2>

      {/* Total Summary */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700">
        <span>
          Total Followers Gained:{" "}
          <strong className="text-blue-700">{totalFollowers}</strong>
        </span>
        <span>
          Organic: <strong className="text-green-600">{totalOrganic}</strong>
        </span>
        <span>
          Paid: <strong className="text-purple-600">{totalPaid}</strong>
        </span>
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

      {/* Chart Type Toggle */}
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

      <Chart
        options={chartOptions}
        series={series}
        type={chartType}
        height={380}
      />
    </div>
  );
}
