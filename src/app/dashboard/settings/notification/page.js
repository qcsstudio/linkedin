import AccountActivities from '@/components/Notifcations/AccountActivities'
import ElevatorX from '@/components/Notifcations/ElevatorX'
import React from 'react'

const page = () => {
  return (
    <>
    <div className="w-[95%]  mx-auto mt-8 p-6 bg-white/30 rounded-2xl shadow-md">
    <AccountActivities/>
    <ElevatorX/>
    </div>

    </>
  )
}

export default page