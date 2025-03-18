import React from 'react'
import AccountActivities from '@/components/Notifcations/AccountActivities'
import ElevatorX from '@/components/Notifcations/ElevatorX'

const Notification = () => {
  return (
    <>
    <div className="w-full  mx-auto mt-8 p-6 bg-white/30 rounded-2xl shadow-md">

      <AccountActivities/>
      <ElevatorX/>
    </div>
    
    </>
  )
}

export default Notification