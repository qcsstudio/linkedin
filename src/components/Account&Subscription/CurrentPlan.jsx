import React from 'react';
import { TiTick } from "react-icons/ti";

const features = [
  "Up to 5 Social Media Accounts",
  "AI Content Generation",
  "Automated Scheduling",
  "Basic Analytics",
  "Email Support"
];

const upgradePlan = () => {
  console.log("enter upgrade plan ")
}
const managePlan = () => {
  console.log("enter manage plan logic ")
}

const CurrentPlan = () => {
  return (
    <div className="w-full mt-6 bg-white/40 p-4 rounded-lg border">
      {/* Current Plan Section */}
      <h2 className="text-xl font-semibold">Current Plan</h2>

      <div className="space-y-4 bg-white/40 mt-2 rounded p-3">
        <h1 className="text-lg font-bold">Starter Plan</h1>
        <p>$9 per month, billed annually</p>
        
        <h2 className="text-lg font-semibold">Features you get</h2>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <TiTick className="text-green-500 text-lg" />
              <span className="ml-2">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Plan Management Buttons */}
        <div className="flex space-x-2">
          <button 
          className="bg-[#4379EE] text-white p-2 rounded h-8 w-40 text-xs"
          onClick={upgradePlan}>
            Upgrade Plan
          </button>
          <button 
          className="bg-white p-2 border rounded h-8 w-40 text-xs border-gray-500"
          onClick={managePlan}>
            Manage Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlan;
