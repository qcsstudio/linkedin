import React from 'react';
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { GiLaptop } from "react-icons/gi";
import { FaMobileScreen } from "react-icons/fa6";




const RecentDeviceActivity = () => {
  const devices = [
    {
      name: 'MacBook Pro - Chrome',
      location: 'New York, USA - Current session',
      time: 'Just Now',
      icon:<GiLaptop />
      , 
    },
    {
      name: 'iPhone 16 - Safari',
      location: 'New York, USA',
      time: 'Yesterday',
      icon: <FaMobileScreen />
      , 
    },
    {
      name: 'Windows PC - Firefox',
      location: 'Chicago, USA',
      time: 'Mar 8, 2025',
      icon: <BsPcDisplayHorizontal />, 
    },
  ];

  return (
      <div className="bg-white/40 rounded-lg w-full mt-6 p-8">
        <h2 className="text-2xl font-semibold mb-6">Recent Device Activity</h2>
        <div className='w-full p-4 rounded-lg bg-white/40 mt-4 '>

        {devices.map((device, index) => (
          <div key={index} className='flex justify-between items-center py-4 border-b-4 border-gray-200 '>
            <div className="flex items-center">
              <span className="mr-2 text-xl">{device.icon}</span> 
              <div>
                <h3 className="text-lg font-medium">{device.name}</h3>
                <p className="text-sm text-gray-600">{device.location}</p>
              </div>
            </div>
            <span className="text-sm text-gray-600">{device.time}</span>
          </div>
        ))}
        </div>
      </div>
    
  );
};

export default RecentDeviceActivity;