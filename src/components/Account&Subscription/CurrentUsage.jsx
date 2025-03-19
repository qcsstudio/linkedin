import React, { useState } from 'react';

const CurrentUsage = () => {
  const [bar, setBar] = useState({
    SchedulePost: "75/150",  
    connectedprofiles: "4/5"  
  });

  // Function to calculate the percentage
  const calculateProgress = (progress) => {
    const [current, total] = progress.split('/').map(Number); 
    return (current / total) * 100; 
  };

  return (
    <>
      {/* Current Usage Section */}
      <div className="bg-white/40 rounded-lg p-4 mt-6 w-full">
        <h2 className="text-lg font-semibold mb-4">Current Usage</h2>

        {/* Schedule Posts Progress */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <span className="text-base text-[#2F2F2F] font-light">Schedule Posts</span>
            <div className="bg-white rounded-full h-1 flex-grow ml-11 mr-6">
              
              <div
                className="bg-blue-500 rounded-full h-1"
                style={{ width: `${calculateProgress(bar.SchedulePost)}%` }} 
              ></div>
            </div>
            <span className="text-sm  text-[#2F2F2F] ">{bar.SchedulePost}</span>
          </div>
        </div>

        
        <div>
          <div className="flex items-center mb-2">
            <span className="text-base text-[#2F2F2F] font-light">Connected Profiles</span>
            <div className="bg-white rounded-full h-1 flex-grow ml-5 mr-12">
              
              <div
                className="bg-blue-500 rounded-full h-1"
                style={{ width: `${calculateProgress(bar.connectedprofiles)}%` }} 
              ></div>
            </div>
            <span className="text-sm text-[#2F2F2F] ">{bar.connectedprofiles}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentUsage;
