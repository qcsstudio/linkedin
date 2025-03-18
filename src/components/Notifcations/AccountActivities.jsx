'use client'
import React, { useState } from 'react';

const NotificationSettings = () => {
  
  const [activities, setActivities] = useState(
    [
      { 
        title: 'Post Failure',
        description: 'An email if a post in your schedule fails to be published.',
        enabled: false },
      { 
        title: 'Published Post Confirmation',
        description: 'Receive an email for any post that is successfully published to one of your channels.',
        enabled: false },
      { 
        title: 'Empty Schedule Alerts',
        description: 'Receive an alert when you have no more content scheduled for one of your channels.',
        enabled: false },
      { 
        title: 'Weekly Analytics Report',
        description: 'A weekly report on the performance of your channels and posts.',
        enabled: false },
      { 
        title: 'Reminders',
        description: 'Receive reminders to post and build a consistent content creation habit with ElaevaterX.',
        enabled: false },
      { 
        title: 'Daily Post Recap',
        description: "Receive a daily email reviewing the previous day's post and upcoming scheduled posts.",
        enabled: false },
      { 
        title: 'Collaboration',
        description: 'Emails about contributions from each team member.',
        enabled: false },
      { 
        title: 'Channel Connection Updates',
        description: 'Emails about contributions from each team member.',
        enabled: false },
      { 
        title: 'Billing And Payment Reminders',
        description: 'Emails relating to billing and payment methods.',
        enabled: false }
    ]
  );

  // Handle the toggle for a specific activity
  const handleToggle = (index) => {
    setActivities((prev) => 
      prev.map((item, i) => 
        i === index ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="bg-white/40 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Account Activities</h2>
      {activities.map((item, index) => (
        <div key={index} className="flex items-center justify-between py-3 border-b-4 border-gray-200 ">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={item.enabled}  // Use the individual activity's enabled state
              onChange={() => handleToggle(index)}  // Pass the index to handleToggle
            />
            <div
              className={`w-12 h-7 bg-gray-300 rounded-full transition-colors duration-300 ease-in-out 
                ${item.enabled ? 'bg-green-500' : 'bg-gray-300'} 
                peer-focus:outline-none peer-focus:ring-green-300`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full border border-gray-300 transition-transform duration-300 ease-in-out 
                  ${item.enabled ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default NotificationSettings;
