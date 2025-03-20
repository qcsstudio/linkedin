"use client";
import React from "react";
import { Chart as Gchart } from "react-google-charts";

const GraphComponent = () => {
  return (
    <div className=" p-4 rounded-lg shadow-md w-[100%]">
      <Gchart
        width={"900px"}
        height={"700px"}
        chartType="GeoChart"
        data={[
          ["Country", "Popularity"],
          ["Germany", 200],
          ["United States", 300],
          ["Brazil", 400],
          ["Canada", 500],
          ["France", 600],
          ["Russia", 700],
          ["India", 800], // ✅ Added India
        ]}
        options={{
          backgroundColor: "transparent", // ✅ Ensures transparency
        }}
        mapsApiKey="YOUR_KEY_HERE"
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default GraphComponent;
