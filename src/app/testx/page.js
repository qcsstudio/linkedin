"use client";
import React from "react";
import dynamic from "next/dynamic";

// We dynamically import the chart so it only renders on the client
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

/** 1) A simple line chart */
function LineChartExample() {
  const chartData = {
    series: [
      {
        name: "Line Series",
        data: [10, 40, 35, 50, 49, 60, 70, 91],
      },
    ],
    options: {
      chart: {
        id: "line-chart",
        toolbar: { show: false },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      },
    },
  };

  return (
    <div style={{ width: 400, margin: "1rem" }}>
      <h3>Line Chart</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={250}
      />
    </div>
  );
}

/** 2) An area chart */
function AreaChartExample() {
  const chartData = {
    series: [
      {
        name: "Area Series",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    options: {
      chart: {
        id: "area-chart",
        toolbar: { show: false },
        type: "area",
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
        },
      },
    },
  };

  return (
    <div style={{ width: 400, margin: "1rem" }}>
      <h3>Area Chart</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={250}
      />
    </div>
  );
}

/** 3) A donut (pie-like) chart */
function DonutChartExample() {
  const chartData = {
    series: [44, 55, 41, 17],
    options: {
      chart: {
        id: "donut-chart",
        toolbar: { show: false },
      },
      labels: ["Apple", "Mango", "Orange", "Watermelon"],
      legend: {
        position: "bottom",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "55%",
          },
        },
      },
    },
  };

  return (
    <div style={{ width: 400, margin: "1rem" }}>
      <h3>Donut Chart</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        height={250}
      />
    </div>
  );
}

/** 4) A radial bar chart */
function RadialBarChartExample() {
  const chartData = {
    series: [67, 84, 97],
    options: {
      chart: {
        id: "radial-bar-chart",
      },
      labels: ["Desktop", "Tablet", "Mobile"],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "40%",
          },
          dataLabels: {
            name: {
              fontSize: "14px",
            },
            value: {
              fontSize: "16px",
            },
          },
        },
      },
    },
  };

  return (
    <div style={{ width: 400, margin: "1rem" }}>
      <h3>Radial Bar Chart</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radialBar"
        height={250}
      />
    </div>
  );
}

/** 5) A stacked bar chart */
function StackedBarChartExample() {
  const chartData = {
    series: [
      {
        name: "Product A",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "Product B",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "Product C",
        data: [11, 17, 15, 15, 21, 14],
      },
    ],
    options: {
      chart: {
        stacked: true,
        stackType: "100%",
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: 400, margin: "1rem" }}>
      <h3>Stacked Bar Chart</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={250}
      />
    </div>
  );
}

/** 6) A scatter plot */
function ScatterChartExample() {
  // Sample XY data for scatter
  const chartData = {
    series: [
      {
        name: "Team 1",
        data: [
          [1, 34],
          [2, 44],
          [3, 54],
          [4, 21],
          [5, 12],
          [6, 11],
        ],
      },
      {
        name: "Team 2",
        data: [
          [1, 11],
          [2, 17],
          [3, 15],
          [4, 36],
          [5, 32],
          [6, 41],
        ],
      },
    ],
    options: {
      chart: {
        id: "scatter",
        toolbar: { show: false },
      },
      xaxis: {
        tickAmount: 6,
      },
      yaxis: {
        max: 60,
      },
    },
  };

  return (
    <div style={{ width: 400, margin: "1rem" }}>
      <h3>Scatter Plot</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="scatter"
        height={250}
      />
    </div>
  );
}

/** 7) Radar chart (spider chart) */
function RadarChartExample() {
  const chartData = {
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20],
      },
      {
        name: "Series 2",
        data: [20, 30, 40, 80, 20, 80],
      },
    ],
    options: {
      labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      chart: {
        id: "radar",
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
    },
  };

  return (
    <div style={{ width: 400, margin: "1rem" }}>
      <h3>Radar Chart</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="radar"
        height={250}
      />
    </div>
  );
}

/**
 * Main component that renders all the chart examples
 */
export default function AllChartsExample() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <LineChartExample />
      <AreaChartExample />
      <DonutChartExample />
      <RadialBarChartExample />
      <StackedBarChartExample />
      <ScatterChartExample />
      <RadarChartExample />
    </div>
  );
}
