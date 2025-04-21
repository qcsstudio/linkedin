"use client";
import React, { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import analyticsContext from "@/Context/analytics.context";

const FollowersChart = () => {
  const { allFollowers } = useContext(analyticsContext);
  console.log("Followers Data: ", allFollowers);

  // Transform data if needed (example: convert date format)
  const chartData = allFollowers?.dailyCombinedFollowers?.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  })) || [];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">LinkedIn Followers Analytics</h2>
      
      {/* Summary Stats */}
      <div className="flex gap-4 mb-4 text-sm">
        {allFollowers?.totalFollowersAllOrgs && (
          <>
            <div className="bg-blue-50 px-3 py-2 rounded-lg">
              <span className="text-gray-600">Total: </span>
              <span className="font-bold text-blue-700">{allFollowers.totalFollowersAllOrgs}</span>
            </div>
            <div className="bg-green-50 px-3 py-2 rounded-lg">
              <span className="text-gray-600">Organic: </span>
              <span className="font-bold text-green-700">{allFollowers.totalOrganicAllOrgs}</span>
            </div>
            <div className="bg-purple-50 px-3 py-2 rounded-lg">
              <span className="text-gray-600">Paid: </span>
              <span className="font-bold text-purple-700">{allFollowers.totalPaidAllOrgs}</span>
            </div>
          </>
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
            formatter={(value, name) => [value, name === 'organic' ? 'Organic' : 'Paid']}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend 
            formatter={(value) => value === 'organic' ? 'Organic Followers' : 'Paid Followers'}
          />
          <Line 
            type="monotone" 
            dataKey="organic" 
            name="organic"
            stroke="#10b981" // Green
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="paid" 
            name="paid"
            stroke="#8b5cf6" // Purple
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FollowersChart;