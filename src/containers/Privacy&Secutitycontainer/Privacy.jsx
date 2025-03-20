import React from 'react'
import AuthenticationSetting from '@/components/privacy&security/AuthenticationSetting'
import PrivacySetting from '@/components/privacy&security/PrivacySetting'
import RecentDeviceActivity from '@/components/privacy&security/RecentDeviceActivity'
import SecurityStatus from '@/components/privacy&security/SecurityStatus'

const Privacy = () => {
  return (
    <>
     <div className="w-[95%] sm:w-[95%] mx-auto mt-8 p-6 bg-white/30 rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-6">Privacy & Setting</h1>
        <SecurityStatus/>
        <AuthenticationSetting/>
        <PrivacySetting/>
        <RecentDeviceActivity/>
      </div>
    </>
  )
}

export default Privacy