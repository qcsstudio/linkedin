"use client"
import React, { useContext, useEffect } from 'react';
import { RiAccountCircleFill } from "react-icons/ri";
import { MdPersonAddAlt1 } from "react-icons/md";
import Link from 'next/link';
import { userContext } from '@/Context/user.context';

const TeamMember = ({ role }) => {

  const { clientData,
    setClientData,
    getClientData } = useContext(userContext);

  useEffect(() => {
    getClientData();
  }, [])

  return (
    <>
      {/* team members */}
      <div className="w-full mt-6 bg-white/40 p-4 rounded-lg border">
        <h1 className="text-xl font-semibold">Team Members</h1>

        {clientData && clientData?.users?.map((userData)=>{
          return <div className="w-full mt-6 bg-white/40 p-4 rounded-lg flex items-center justify-between">

          <RiAccountCircleFill className='text-4xl' />


          <div className="flex-1 ml-4">
            <h1 className="font-semibold">{userData.name}</h1>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>


          <div className="bg-[#4379EE] text-white px-4 py-1 rounded text-xl">
            {userData.role}
          </div>
        </div>
        })}

        
        
        {(role && (role === "admin" || role === "brand_manager")) &&
          <Link href="/dashboard/settings/createuser" className='' >
            <button className='border justify-center items-center border-gray-400 text-sm p-1 mt-4 bg-white rounded w-44 h-8 flex px-3 '><MdPersonAddAlt1 /><span className='ml-1'>Invite New Members</span></button>
          </Link>
        }
      </div>
    </>
  )
}

export default TeamMember