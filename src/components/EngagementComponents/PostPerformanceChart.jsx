import React from "react";
import Chart from "react-apexcharts";

const PostPerformanceChart = () => {
  const data = {
    series: [
      {
        name: "Engagement Metrics",
        data: [1, 0, 22, 1, 0], // [Impressions, Clicks, Likes, Comments, Shares]
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 4,
          barHeight: "60%",
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ["Impressions", "Clicks", "Likes", "Comments", "Shares"],
      },
      colors: ["#00E396"], // Soft green for engagement
      title: {
        text: "LinkedIn Post Engagement Overview",
        align: "center",
        style: {
          fontSize: "20px",
        },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <Chart options={data.options} series={data.series} type="bar" height={350} />
    </div>
  );
};

export default PostPerformanceChart;
