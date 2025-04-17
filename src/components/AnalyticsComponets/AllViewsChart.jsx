"use client";
import React, { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import analyticsContext from "@/Context/analytics.context";

const AllViewsChart = () => {
  const { allViews } = useContext(analyticsContext);
  console.log("All Views Data: ", allViews);
 

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">All Views Analytics</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={allViews}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" /> 
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllViewsChart;



 
