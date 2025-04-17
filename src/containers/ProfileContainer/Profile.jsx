import React, { useContext, useState } from 'react';
import Avatar from '@/components/ProfileComponent/Avatar';
import Personalinformation from '@/components/ProfileComponent/Personalinformation';
import { uiContext } from '@/Context/ui.context';

const Profile = () => {

  const {editMode,setEditMode} = useContext(uiContext);

  const handleEditToggle = ()=>{
    setEditMode(!editMode);
  }

  return (
    <>
    <div className="w-[95%]  mx-auto mt-8 p-6 bg-white/30 rounded-2xl shadow-md relative z-10">
      <div className="w-[100%] h-[100%] flex items-center justify-between py-[1rem]">
        <h1 className="text-2xl font-bold text-black ">Manage Profile</h1>
        <button className={`px-[2rem] py-[.3rem] ${editMode ? "bg-[#6b7280]/25 " : "bg-[#38bdf8] hover:bg-[#21aeeb]" } rounded-[.5rem] text-[#ffffff]`} onClick={handleEditToggle}>{editMode ? "Discard" : "Edit"}</button>
      </div>
    <Personalinformation editOptions={{editMode,setEditMode}}/>


    </div>

    </>
  );
}

export default Profile;