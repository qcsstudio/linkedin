import React from 'react';
import { RiAccountCircleFill } from "react-icons/ri";
import { MdPersonAddAlt1 } from "react-icons/md";
import Link from 'next/link';

const TeamMember = ({role}) => {
  return (
    <>
      {/* team members */}
      <div className="w-full mt-6 bg-white/40 p-4 rounded-lg border">
        <h1 className="text-xl font-semibold">Team Members</h1>

        <div className="w-full mt-6 bg-white/40 p-4 rounded-lg flex items-center justify-between">

          <RiAccountCircleFill className='text-4xl' />


          <div className="flex-1 ml-4">
            <h1 className="font-semibold">John Doe (you)</h1>
            <p className="text-sm text-gray-500">John.doe@example.com</p>
          </div>


          <div className="bg-[#4379EE] text-white px-4 py-1 rounded text-xl">
            Admin
          </div>
        </div>
        <div className="w-full mt-6 bg-white/40 p-4 rounded-lg flex items-center justify-between">

          <RiAccountCircleFill className='text-4xl' />


          <div className="flex-1 ml-4">
            <h1 className="font-semibold">Patrick Smith</h1>
            <p className="text-sm text-gray-500">Patrick.Smith@example.com</p>
          </div>


          <div className="bg-orange-300 text-white px-4 py-1 rounded text-xl">
            Editor
          </div>
        </div>
        {(role && (role === "admin" || role === "brand_manager")) && 
        <Link href="/dashboard/settings/createuser"className='' >
        <button className='border justify-center items-center border-gray-400 text-sm p-1 mt-4 bg-white rounded w-44 h-8 flex px-3 '><MdPersonAddAlt1 /><span className='ml-1'>Invite New Members</span></button>
        </Link>
        }
      </div>
    </>
  )
}

export default TeamMember