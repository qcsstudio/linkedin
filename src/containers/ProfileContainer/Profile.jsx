import React from 'react';
import Avatar from '@/components/ProfileComponent/Avatar';
import Personalinformation from '@/components/ProfileComponent/Personalinformation';

const Profile = () => {
  return (
    <>
    <div className="w-[95%]  mx-auto mt-8 p-6 bg-white/30 rounded-2xl shadow-md relative z-10">
    <h1 className="text-2xl font-bold text-black  mb-6">Manage Profile</h1>
    <Avatar/>
    <Personalinformation/>


    </div>

    </>
  );
}

export default Profile;