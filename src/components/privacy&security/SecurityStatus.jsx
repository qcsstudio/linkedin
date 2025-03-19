import React from 'react'

const SecurityStatus = () => {
  const handleChanges = () =>{
    console.log("type save changes logic")
  }
  return (
    <>
    
    <div className="w-full rounded  flex  justify-center">
      <div className=" bg-white/40 rounded-lg w-full p-4  ">
        {/* Security Status */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Security Status</h2>
          <button
          className="bg-[#007BFF] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleChanges}>
            Save Changes
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm h-24">
            <h3 className="text-lg font-bold">2FA</h3>
            <p className="text-base text-gray-500">Enabled</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">Password</h3>
            <p className="text-base text-gray-500 ">Strong</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">Recovery Email</h3>
            <p className="text-base text-gray-500">Not Verified</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">Last Password Changed</h3>
            <p className="text-base text-gray-500">32 days ago</p>
          </div>
        </div>
        </div>
        </div>

    
    </>
  )
}

export default SecurityStatus