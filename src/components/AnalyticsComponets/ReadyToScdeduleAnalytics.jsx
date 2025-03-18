import React from 'react'

const ReadyToScdeduleAnalytics = () => {
  return (
    <div className="bg-white/50 flex justify-between items-center shadow-lg rounded-lg p-5  gap-3">
        <div>
        <h2 className="font-semibold text-lg ">Ready to schedule your next post?</h2>
    <p className="text-sm text-gray-500">
      Our AI suggests Tuesday at 7:30 PM for maximum engagement.
    </p>
        </div>
   
    <button className="bg-blue-600 text-white font-semibold text-sm w-[20%] p-2  rounded-lg hover:bg-blue-700 transition">
      Schedule Now
    </button>
  </div>
  )
}

export default ReadyToScdeduleAnalytics
