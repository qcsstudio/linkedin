'use client'
import React, { useState } from 'react';
import { FaLock } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { FaCcVisa } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdPersonAddAlt1 } from "react-icons/md";


const Page = () => {
  const [paymentHistory,setPaymentHistory] = useState([
    { date: 'Mar 01, 2025', amount: '$9', description: 'Starter Plan', status: 'Paid' },
    { date: 'Feb 01, 2025', amount: '$9', description: 'Starter Plan', status: 'Paid' },
    { date: 'Jan 01, 2025', amount: '$9', description: 'Starter Plan', status: 'Pending' },
    { date: 'Dec 01, 2024', amount: '$9', description: 'Starter Plan', status: 'Paid' },
    { date: 'Nov 01, 2024', amount: '$9', description: 'Starter Plan', status: 'Paid' },
    { date: 'Oct 01, 2024', amount: '$9', description: 'Starter Plan', status: 'Paid' },
  ])

  return (
    <div className="w-[95%] sm:w-[95%] mx-auto mt-8 p-6 bg-white/30 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-6">Account & Subscription</h1>

      {/* User Information Section */}
      <div className="w-full bg-white/40 p-4 rounded-lg border">
        <h2 className="text-xl font-bold">User Information</h2>
        <form className="mt-5 space-y-4">
          {/* Email Input */}
          <div className="relative">
            <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700 ">Email</label>
            <input type="email" className="w-full h-[52px] border rounded-md p-2 focus:outline-none  border-gray-300" />
          </div>
          
          {/* Phone Number Input */}
          <div className="relative">
            <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700">Phone Number</label>
            <input type="tel" className="w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300" />
          </div>

          {/* Change Password Button */}
          <button className=" w-36 text-xs h-8 border border-gray-500 bg-white p-2 rounded flex items-center justify-center space-x-2 mt-4 hover:bg-[#3a69d8] transition duration-300">
            <FaLock className="text-sm" />
            <span>Change Password</span>
          </button>
        </form>
      </div>

      {/* Current Plan Section */}
      <div className="w-full mt-6 bg-white/40 p-4 rounded-lg border">
        <h2 className="text-xl font-bold">Current Plan</h2>
        <div className="space-y-4 bg-white/40 mt-2 rounded p-3 line">
          <h1 className="text-lg font-bold ">Starter Plan</h1>
          <p>$9 per month, billed annually</p>
          <h1 className="text-lg font-bold">Features you get</h1>
          <ul className="space-y-2">
            <li className="flex items-center">
              <TiTick className="text-green-500 text-lg" />
              <span className="ml-2">Up to 5 Social Media Accounts</span>
            </li>
            <li className="flex items-center">
              <TiTick className="text-green-500 text-lg" />
              <span className="ml-2">AI Content Generation</span>
            </li>
            <li className="flex items-center">
              <TiTick className="text-green-500 text-lg" />
              <span className="ml-2">Automated Scheduling</span>
            </li>
            <li className="flex items-center">
              <TiTick className="text-green-500 text-lg" />
              <span className="ml-2">Basic Analytics</span>
            </li>
            <li className="flex items-center">
              <TiTick className="text-green-500 text-lg" />
              <span className="ml-2">Email Support</span>
            </li>
          </ul>

          {/* Plan Management Buttons */}
          <div className="flex space-x-2">
            <button className='bg-[#4379EE] text-white p-2 rounded h-8 w-40 text-xs'>
              Upgrade Plan
            </button>
            <button className='bg-white p-2 border rounded h-8 w-40 text-xs border-gray-500'>
              Manage Plan
            </button>
          </div>
        </div>
      </div>

      {/* Current Usage Section */}
      <div className="bg-white/40 rounded-lg p-4 mt-6 w-full">
  <h2 className="text-lg font-semibold mb-4">Current Usage</h2>
  <div className="mb-2">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm">Schedule Posts</span>
      <span className="text-sm">75/150</span>
    </div>
    <div className="bg-gray-300 rounded-full h-1">
      <div className="bg-blue-500 rounded-full h-1 w-1/2"></div>
    </div>
  </div>
  <div>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm">Connected Profiles</span>
      <span className="text-sm">4/5</span>
    </div>
    <div className="bg-gray-300 rounded-full h-1">
      <div className="bg-blue-500 rounded-full h-1 w-4/5"></div>
    </div>
  </div>
</div>
      {/* Billing  */}
      <div className="w-full mt-6 bg-white/40 rounded-lg">
        <div className=" rounded-lg p-6 mb-8 w-full">
          <h2 className="text-2xl font-semibold mb-6">Billing Information</h2>
          <div className="bg-white/40 rounded-lg p-4 flex items-center justify-between mb-4">
            <div className="flex items-center">
              
            <FaCcVisa  className='w-6 h-6 mr-3'/>
              <div>
                <p className="text-sm font-medium">Visa ending with 4242</p>
                <p className="text-xs text-gray-500">Expires 12/27</p>
              </div>
            </div>
            <button className="text-blue-600 text-sm">Edit</button>
          </div>
          <button className="bg-white rounded-lg py-2 px-4 text-sm font-medium">
            + Add Payment Method
          </button>
        </div>
      </div>
      
        <div className="bg-white/40 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Payment History</h2>
            <button className="bg-blue-600 text-white flex rounded-lg py-2 px-4 text-sm font-medium gap-3">
            <LuDownload /> <span>Download All</span>
            </button>
          </div>

          <div className="overflow-x-auto ">
            <table className="min-w-full divide-y bg-white/40 ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600  flex"><LuDownload /> <span className='ml-3'>Download All</span></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
    
      {/* team members */}
      <div className="w-full mt-6 bg-white/40 p-4 rounded-lg border">
  <h1 className="text-xl font-bold">Team Members</h1>
  
  <div className="w-full mt-6 bg-white/40 p-4 rounded-lg flex items-center justify-between">
    
    <RiAccountCircleFill className='text-4xl' />

    
    <div className="flex-1 ml-4">
      <h1 className="font-semibold">John Doe (you)</h1>
      <p className="text-sm text-gray-500">John.doe@example.com</p>
    </div>

  
    <div className="bg-[#4379EE] text-white px-4 py-1 rounded text-xl">
      Admin
    </div>
  </div>
  <div className="w-full mt-6 bg-white/40 p-4 rounded-lg flex items-center justify-between">
    
    <RiAccountCircleFill className='text-4xl' />

    
    <div className="flex-1 ml-4">
      <h1 className="font-semibold">Patrick Smith</h1>
      <p className="text-sm text-gray-500">Patrick.Smith@example.com</p>
    </div>

  
    <div className="bg-orange-300 text-white px-4 py-1 rounded text-xl">
      Editor
    </div>
  </div>
  <button className='border border-gray-400 text-sm p-1 mt-4 bg-white rounded w-44 h-8 flex px-3 '><MdPersonAddAlt1 /><span className='ml-1'>Invite New Members</span></button>
</div>



      


    </div>
  );
};

export default Page;
