import React from 'react';

const AuthenticationSettings = () => {
  return (
      <div className="bg-white/40 rounded-lg mt-6 w-full  p-6">
        <h2 className="text-2xl font-semibold ">Authentication Settings</h2>
        <div className='w-full p-4 rounded-lg bg-white/40 mt-4 '>
        {/* Two-Factor Authentication */}
        <div className="flex justify-between items-center py-4 border-b-4 border-gray-200">
          <div>
            <h3 className="text-lg font-bold">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Password */}
        <div className="flex justify-between items-center py-4 border-b-4 border-gray-200">
          <div>
            <h3 className="text-lg font-bold">Password</h3>
            <p className="text-sm text-gray-600">Last changed on Feb 10, 2025</p>
          </div>
          <button className="text-gray-900  text-sm bg-gray-200 h-7 w-24 items-center text-center border rounded-lg border-gray-400">Change</button>
        </div>

        {/* Recovery Email */}
        <div className="flex justify-between items-center py-4 border-b-4 border-gray-200">
          <div>
            <h3 className="text-lg font-bold">Recovery Email</h3>
            <p className="text-sm text-gray-600">u**@gmail.com (Not verified)</p>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Verify
          </button>
        </div>

        {/* Session Timeout */}
        <div className="flex justify-between items-center py-4">
          <div>
            <h3 className="text-lg font-bold">Session Timeout</h3>
            <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
          </div>
          <select className="bg-gray-200 border-gray-300 rounded px-4 py-2">
            <option value="30">30 Minutes</option>
            <option value="60">1 Hour</option>
            <option value="120">2 Hours</option>
          </select>
        </div>
        </div>
      </div>
    
  );
};

export default AuthenticationSettings;