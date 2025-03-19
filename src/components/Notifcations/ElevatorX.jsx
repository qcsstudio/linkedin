'use client'
import React,{useState} from 'react'

const ElevatorX = () => {
  const [elevatorX,setElevatorX] = useState(
    [{
      title:"Getting Started with ElevatorX",
      description:"Useful tips and best practices for getting the most out of ElevatorX",
      enabled: false,
    },
    {
      title:"Social Ideas Prompts and Ideas",
      description:"Daily inspiration and AI Prompts For generating social media content.",
      enabled: false,
    },
    {
      title:"User Feedback and Research",
      description:"Emails to participate in user feedback and research to help make ElevatorX better.",
      enabled: false,
    },
    {
      title:"ElevatorX Product Updates and News",
      description:"occasional emails to help you get the most out of ElevatorX, including new features and product announcememt",
      enabled: false,
    },
    {
      title:"ElevatorX Social Media Weekely Newsletter",
      description:"Buffer's latest Blog posts and curated advice to help you grow on Social Media",
      enabled: false,
    },
    {
      title:"ElevatorX Open Blog Newsletter",
      description:"Receive a daily email reviewing the previous day's post and upcoming schedule post.",
      enabled: false,
    },
    {
      title:"ElevatorX Carrers",
      description:"The latest carrer opportunities and role opening in ElevatorX ",
      enabled: false,
    },
  ]
  );

  const handleToggle = (index) => {
    setElevatorX((prev) => 
      prev.map((item, i) => 
        i === index ? { ...item, enabled: !item.enabled } : item
      )
    );
  };
  return (
    <div className="bg-white/40  mt-6 p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Form Elevator X</h2>
      {elevatorX.map((item, index) => (
        <div key={index} className="flex items-center justify-between py-3 border-b-4 border-gray-200 ">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">{item.title}</h3>
            <p className="text-base text-gray-500">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={item.enabled}  
              onChange={() => handleToggle(index)}  
            />
            <div
              className={`w-12 h-7 bg-gray-400 rounded-full transition-colors duration-300 ease-in-out 
                ${item.enabled ? 'bg-green-500' : 'bg-gray-300'} 
                peer-focus:outline-none  peer-focus:ring-green-300`}
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
  )
}

export default ElevatorX