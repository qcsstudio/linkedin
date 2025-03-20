"use client"; 
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const [state] = useState({
    series: [33, 67],
    options: {
      chart: {
        type: "donut",
      },
      legend: {
        position: "bottom", // Moves the dots (legend) to the bottom
        horizontalAlign: "center",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="donut" />
    </div>
  );
};

export default PieChart;
