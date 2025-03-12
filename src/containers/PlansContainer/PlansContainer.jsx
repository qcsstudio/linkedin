'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import instagram from '../../../public/images/dashboardImages/instagram.png'
import linkedin from '../../../public/images/dashboardImages/linkedin.png'
import pinterest from '../../../public/images/dashboardImages/pinterest.png'
import facebook from '../../../public/images/dashboardImages/facebook.png'
import mainLogo from '../../../public/images/mainLogo.png'
import { FaArrowRight } from "react-icons/fa";
import tick from '../../../public/images/tick.png'
const PlansContainer = () => {
  const [selectedPlan,setSelectedPlan]=useState('');

   const handleChoosePlan=(plan)=>{
    setSelectedPlan(plan)
   }
  
  return (
    <div className="relative w-full mx-auto PlansContainer h-screen flex flex-col justify-center items-center bg-gradient-radial">
      {/* Logo image */}
      <div className="flex justify-start items-start pl-10 pt-7 w-full">
      <Image className=" " src={mainLogo} height={250} width={250} alt="" />
      </div>
      {/* Floating bg images */}
      <Image className="absolute top-0 right-0" src={linkedin} height={400} width={400} alt="" />
      <Image className="absolute bottom-0 left-96" src={pinterest} height={250} width={250} alt="" />
      <Image className="absolute right-0 bottom-0" src={facebook} height={250} width={250} alt="" />
      <Image className="absolute left-0 top-20" src={instagram} height={400} width={400} alt="" />

      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col justify-between items-center gap-5">
          <div>
            <div className="flex justify-center items-center gap-2">
              <p className="w-40 h-px bg-purple-500"></p>
              <h3 className="text-lg text-purple-500">One last step</h3>
              <p className="w-40 h-px bg-purple-500"></p>
            </div>
            <h1 className="text-3xl font-semibold">
              Select your plan to <span className="text-purple-500">Get started</span>
            </h1>
          </div>

          <div className="flex justify-center bg-gradient-to-r  from-blue-100 to-purple-100 z-10 gap-5 p-7 rounded-lg">
            <div className="w-72 p-6 bg-blue-500/10 flex flex-col gap-5 rounded-xl shadow-lg border border-white hover:border-purple-400 transition">
              <h2 className="text-xl font-semibold">For my personal use</h2>
              <p className="text-purple-700 tracking-wide text-sm">
                Lorem Ipsum is simply dummy text of the printing and...
              </p>
              <ul className="list-disc font-semibold flex flex-col items-center text-black text-sm space-y-1">
                <li>Lorem Ipsum is simply dummy</li>
                <li>Lorem Ipsum is simply dummy</li>
                <li>Lorem Ipsum is simply dummy</li>
                <li>Lorem Ipsum is simply dummy</li>
              </ul>
              <button onClick={()=>handleChoosePlan('personal')} className={`w-full flex items-center justify-center py-4 ${selectedPlan==='personal'?'bg-purple-500':'bg-white'}  text-purple-500 font-semibold rounded-lg shadow-md transition`}>
                {selectedPlan==='personal'?<Image src={tick} alt='tick' />:'Choose Plan'}
              </button>
            </div>

            {/* Plan Card 2 */}
            <div className="w-72 p-6 bg-blue-500/10 flex flex-col gap-5 rounded-xl shadow-lg border border-white hover:border-purple-400 transition">
              <h2 className="text-xl font-semibold">I have a team</h2>
              <p className="text-purple-700 tracking-wide text-sm">
                Lorem Ipsum is simply dummy text of the printing and...
              </p>
              <ul className="list-disc font-semibold flex flex-col items-center text-black text-sm space-y-1">
                <li>Lorem Ipsum is simply dummy</li>
                <li>Lorem Ipsum is simply dummy</li>
                <li>Lorem Ipsum is simply dummy</li>
                <li>Lorem Ipsum is simply dummy</li>
              </ul>
              
              <button onClick={()=>handleChoosePlan('team')} className={`w-full flex items-center justify-center py-4 ${selectedPlan==='team'?'bg-purple-500':'bg-white'}  text-purple-500 font-semibold rounded-lg shadow-md transition`}>
                {selectedPlan==='team'?<Image src={tick} alt='tick' />:'Choose Plan'}
              </button>
            </div>
          </div>
          
        </div>
        <div className="flex justify-end items-end w-full  px-10 pb-6">
          <button disabled={!selectedPlan} className={`px-20 py-4 text-sm flex items-center ${selectedPlan?'text-purple-600 bg-white/50  cursor-pointer':'text-gray-600 bg-white/10  cursor-not-allowed'} justify-center gap-1  z-10    border-white border-2 font-semibold rounded-lg shadow-lg  transition`}>
            Let’s go  <FaArrowRight />
          </button>
        </div>
        
        
      </div>
    </div>
  )
}

export default PlansContainer
