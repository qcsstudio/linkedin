'use client'
import dynamic from 'next/dynamic';
import React from 'react'
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const HeatMapAnalytics = () => {
    const data = [
        { name: "6:00 AM", data: [1.2, 1.2, 1.2, 1.2, 1.2, 1.2, 1.2] },
        { name: "12:00 PM", data: [1.2, 1.5, 1.3, 1.6, 1.2, 1.4, 1.5] },
        { name: "6:00 PM", data: [1.4, 1.2, 1.2, 1.2, 1.8, 1.2, 1.5] },
        { name: "7:30 PM", data: [1.8, 1.9, 1.5, 1.2, 1.6, 1.4, 1.8] },
        { name: "9:30 PM", data: [1.2, 1.3, 1.5, 1.2, 1.2, 1.8, 2.0] },
      ];

    const options = {
        chart: { type: "heatmap" },
        plotOptions: {
            heatmap: {
                shadeIntensity: 0.5,
                colorScale: {
                    ranges: [
                        { from: 1.2, to: 1.3, color: "#9FC3F9", name: "Low" }, 
                        { from: 1.4, to: 1.6, color: "#4185F4", name: "Medium" }, 
                        { from: 1.7, to: 1.9, color: "#0B57D0", name: "High" }, 
                        { from: 2.0, to: 2.0, color: "#003366", name: "Best" }, 
                    ],
                },
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ["#00000"], 
                fontSize: "12px",
                fontWeight: "bold",
            },
            formatter: function (value) {
                return `+${Math.round(value * 100)}%`; 
            },
        },
        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
    };

    return (
        <div className=" flex flex-col gap-2 ">
        
            <h1 className="font-bold text-lg">Weekly Engagement Heatmap</h1>
            <div className='bg-white/50 rounded-lg p-1'>
            <Chart options={options} series={data} type="heatmap" height={350} />
            </div>
            
        </div>
    );
}

export default HeatMapAnalytics;
