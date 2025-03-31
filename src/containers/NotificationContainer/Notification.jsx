import React from 'react'
import AccountActivities from '@/components/Notifcations/AccountActivities'
import ElevatorX from '@/components/Notifcations/ElevatorX'

const Notification = () => {
  return (
    <>
    <div className="w-[95%] sm:w-[95%] mx-auto mt-8 p-6 bg-white/30 rounded-2xl shadow-md relative z-10">
         <h1 className="text-2xl font-bold text-black  mb-6">Notification</h1>
        <AccountActivities/>
        <ElevatorX/>
    </div>
    
    </>
  )
}

export default Notification