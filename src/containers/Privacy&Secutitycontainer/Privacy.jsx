import React from 'react'
import AuthenticationSetting from '@/components/privacy&security/AuthenticationSetting'
import PrivacySetting from '@/components/privacy&security/PrivacySetting'
import RecentDeviceActivity from '@/components/privacy&security/RecentDeviceActivity'
import SecurityStatus from '@/components/privacy&security/SecurityStatus'

const Privacy = () => {
  return (
    <>
      <SecurityStatus/>
      <AuthenticationSetting/>
      <PrivacySetting/>
      <RecentDeviceActivity/>
    </>
  )
}

export default Privacy