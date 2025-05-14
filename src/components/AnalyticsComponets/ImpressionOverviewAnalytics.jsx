"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
;

// const timeRanges = {
//   "7d": 7 * 24 * 60 * 60 * 1000,
//   "1m": 30 * 24 * 60 * 60 * 1000,
//   "3m": 90 * 24 * 60 * 60 * 1000,
// };



export default function ImpressionsOverview({ id, token,selectedTime }) {
  const [selectedRange, setSelectedRange] = useState("7d");
  const [chartData, setChartData] = useState([]);
  
  const [isStacked, setIsStacked] = useState(false);

  // useEffect(()=>{},[selectedTime]);

  const fetchData = async () => {
    const now = Date.now();
    const start = now - selectedTime.time;
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

      const followerResponse = await fetch(
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
      const followerData = await followerResponse.json();

      let followerTransformedData = followerData.elements.map((item) => {
        const date = new Date(item.timeRange.start).toISOString();
        return {
          date,
          organic: item.followerGains?.organicFollowerGain || 0,
          paid: item.followerGains?.paidFollowerGain || 0,
        };
      });

      let viewTransformedData = data.elements.map((item) => {
        const date = new Date(item.timeRange.start).toISOString();
        const views =
          item.totalPageStatistics?.views?.allPageViews?.pageViews || 0;
        const unique =
          item.totalPageStatistics?.views?.allPageViews?.uniquePageViews || 0;
        return { date, views, unique };
      });
      const mergedData = viewTransformedData.map((view) => {
  const follower = followerTransformedData.find(f => f.date === view.date) || { organic: 0, paid: 0 };
  return {
    date: view.date,
    views: view.views,
    unique: view.unique,
    organic: follower.organic,
    paid: follower.paid,
  };
});


      setChartData(mergedData);
    } catch (err) {
      console.error("Error loading page views:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedTime , id, token]);

  const maxY = Math.max(...chartData.map((d) => d.views), 1);
  const yaxisMax = maxY < 5 ? 5 : Math.ceil(maxY * 1.2);
  const totalViews = chartData.reduce((sum, d) => sum + d.views, 0);
  const totalUnique = chartData.reduce((sum, d) => sum + d.unique, 0);

  const chartOptions = {
    chart: {
      id: "page-views-chart",
      // stacked: isStacked,
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
    colors: ['#1E90FF', '#f88885',"#c3c311"],
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
      width: 2,
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
    {
      name:"Followers",
      data: chartData.map((d) => d.organic),
    }
  ];

  return (
    <div className="p-6 bg-white/50 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/40">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {/* Impression Overview */}
        Metrics
      </h2>

      {/* Summary */}
      {/* <div className="flex flex-wrap justify-between items-center gap-3 mb-4 text-sm text-gray-700">
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
      </div> */}

      {/* Chart */}
      <Chart
      className='bg-white/60'
        options={chartOptions}
        series={series}
        type="area"
        height={400}
      />
    </div>
  );
}
