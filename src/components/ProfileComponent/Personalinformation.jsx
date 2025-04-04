import React, { useState } from 'react'

const PersonalInformation = () => {
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    phone: ""
  });

  const formHandler = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();  
    alert("form submitted")
  };

  return (
    <>
      <div className='w-full  rounded-lg border bg-[#ffffff]/50 p-5 justify-between items-center mt-5'>
        <h2 className="text-lg font-bold">Personal Information</h2>
        <p className="text-gray-500 text-base">Change your identity information</p>

        <div className="w-full mt-5 rounded-lg ">
          <form >
            <div className="relative mb-4 ">
              <label className="absolute -top-2 left-2 bg-white px-1  text-gray-700">Full Name</label>
              <input
                name='fullName'
                type="text"
                className="w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 "
                value={inputData.fullName}
                onChange={formHandler}
              />
            </div>
            <div className="relative mb-4 ">
              <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700">Email</label>
              <input
                name='email'
                type="email"
                className="w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300"
                value={inputData.email}
                onChange={formHandler}
              />
            </div>
            <div className="relative mb-4  ">
              <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700">Phone</label>
              <input
                name='phone'
                type="tel"
                className="w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300 "
                value={inputData.phone}
                onChange={formHandler}
              />
            </div>
            
          </form>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          type="submit"
          className="w-full h-[33px] rounded-lg text-center bg-sky-400 text-white hover:bg-sky-500"
          onClick={submitHandler}
        >
          Save Changes
        </button>
      </div>
    </>
  )
}

export default PersonalInformation;
