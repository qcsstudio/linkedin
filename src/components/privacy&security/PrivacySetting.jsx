import React from 'react';


const PrivacySetting = () => {
  const settings = [
    {
      label: 'Data Collection',
      description: 'Allow us to collect usage data to improve services',
      enabled: true,
    },
    {
      label: 'Marketing Communications',
      description: 'Receive updates about products and services',
      enabled: false,
    },
    {
      label: 'Third-party Integrations',
      description: 'Allow data sharing with connected services',
      enabled: true,
    },
  ];

  return (
      <div className="bg-white/40 mt-6 rounded-lg w-full p-6">
        <h2 className="text-2xl font-semibold mb-4">Privacy Settings</h2>
        <div className='w-full p-4 rounded-lg bg-white/40 mt-4 '>

        {settings.map((setting, index) => (
          <div key={index} className='flex justify-between items-center py-4 border-b-4 border-gray-200'>
            <div>
              <h3 className="text-lg font-bold">{setting.label}</h3>
              <p className="text-sm text-gray-600">{setting.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" checked={setting.enabled}  />
              <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${setting.enabled ? 'bg-green-400' : 'bg-gray-400'} peer-checked:bg-green-600`}></div>
            </label>
          </div>
        ))}
        </div>
      </div>
    
  );
};

export default PrivacySetting;