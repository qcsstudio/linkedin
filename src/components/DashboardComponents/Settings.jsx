"use client"
import { logOut } from '@/utils/logout'
import React from 'react'

export default function Settings() {

  const handleLogout = async()=>{
    await logOut();
    window.location.href = "/";
  }

  return (
    <button className='px-[1rem] py-[.5rem] bg-[#bfbfbf] cursor-pointer z-[100] ml-[10rem]' onClick={handleLogout}>logout</button>
  )
}
