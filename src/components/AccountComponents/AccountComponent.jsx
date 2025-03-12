"use client"
import React, { useState } from 'react'
import AddCard from './AddCard'
import Card from './Card'
import CreateAccount from './CreateAccount';

export default function AccountComponent() {

  const [addAccount,setAddAccount] = useState(false);

  console.log(addAccount);

  return (

    // Main Container
    <div className="accountContainer w-[100%] z-[100] relative">

      {/* Inner Container */}
      {!addAccount && <div className="innerContainer w-[100%] z-[100]">

        {/* Upper Container*/}
        <div className="upperContainer w-[100%] my-[1.2rem] py-[.5rem] flex justify-between items-center z-[100]">
          <p className="heading text-[1.4rem] font-normal ">Hi, QCS <span className='text-[.9rem]'>Keep Moving Forward</span></p>
          <button className='px-[3rem] py-[0.5rem] bg-[#007BFF] rounded-[.5rem] text-[#ffffff] z-[100]'>+ Add Account</button>
        </div>

        {/* Lower Container */}
        <div className="lowerContainer bg-[#ffffff]/50 w-[100%] min-h-[65vh] max-h-[65vh] rounded-[.7rem] z-[100] flex gap-[1.2rem]  flex-wrap p-[1.37rem] overflow-x-hidden overflow-y-scroll right">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <AddCard setAddAccount={setAddAccount} addAccount={addAccount}/>
        </div>

      </div>}

      {addAccount && <CreateAccount setAddAccount={setAddAccount} addAccount={addAccount}/>}

    </div>
  )
}
