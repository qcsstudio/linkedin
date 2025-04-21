"use client";
import React, { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import analyticsContext from "@/Context/analytics.context";

const AllViewsChart = () => {
  const { allViews } = useContext(analyticsContext);
  console.log("All Views Data: ", allViews);

  // Transform data if needed (example: convert date format)
  const chartData = allViews?.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })) || [];

  // Calculate totals if not already provided
  const totalViews = allViews?.reduce((sum, item) => sum + (item.views || 0), 0) || 0;

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">All Views Analytics</h2>
      
      {/* Summary Stats */}
      <div className="flex gap-4 mb-4 text-sm">
        {totalViews > 0 && (
          <div className="bg-blue-50 px-3 py-2 rounded-lg">
            <span className="text-gray-600">Total Views: </span>
            <span className="font-bold text-blue-700">{totalViews.toLocaleString()}</span>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => new Intl.NumberFormat('en').format(value)}
          />
          <Tooltip 
            formatter={(value) => [`${value} views`, 'Views']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="views" 
            name="Views"
            stroke="#4deeea" 
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllViewsChart;