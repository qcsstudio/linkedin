import React from 'react'




const BestTimeToPostAnalytics = () => {
    const bestTimes = [
        { time: "Tuesday, 7:40 PM", engagement: "+142% Engagement", recomendation:'Top recomendation'
        },
        { time: "Sunday, 6:00 PM", engagement: "+118% Engagement" ,recomendation:'Second Best'
        },
        { time: "Thursday, 12:30 PM", engagement: "+142% Engagement",recomendation:'Third Best' },
      ];
  return (
    <div className=" flex flex-col gap-2">
      <h1 className="font-bold text-lg">Best time to Post</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {bestTimes.map((item, index) => (
          <div key={index} className="bg-white/50 p-4 rounded-lg shadow-md flex flex-col items-start">
            <p className='text-sm text-gray-500'>{item.recomendation}</p>
            <h2 className="text-lg font-semibold">{item.time}</h2>
            <p className="text-sm text-gray-500">{item.engagement}</p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Schedule
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestTimeToPostAnalytics
