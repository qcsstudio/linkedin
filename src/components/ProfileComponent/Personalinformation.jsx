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
    console.log(inputData);  
    alert("form submitted")
  };

  return (
    <>
      <div className='w-full h-[297px] rounded-lg border bg-[#ffffff]/50 p-4 justify-between items-center mt-5'>
        <h2 className="text-lg font-bold">Personal Information</h2>
        <p className="text-gray-500 text-base">Change your identity information</p>

        <div className="w-full mt-5 rounded-lg shadow-md">
          <form onSubmit={submitHandler}>
            <div className="relative mb-4">
              <label className="absolute -top-2 left-2 bg-[#ffffff]/10 px-1  text-gray-700">Full Name</label>
              <input
                name='fullName'
                type="text"
                className="w-full h-[52px] border rounded-md p-2 focus:outline-none"
                value={inputData.fullName}
                onChange={formHandler}
              />
            </div>
            <div className="relative mb-4">
              <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700">Email</label>
              <input
                name='email'
                type="email"
                className="w-full h-[52px] border rounded-md p-2 focus:outline-none"
                value={inputData.email}
                onChange={formHandler}
              />
            </div>
            <div className="relative mb-4">
              <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700">Phone</label>
              <input
                name='phone'
                type="tel"
                className="w-full h-[52px] border rounded-md p-2 focus:outline-none"
                value={inputData.phone}
                onChange={formHandler}
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="w-full h-[33px] rounded-lg text-center bg-sky-500 text-white hover:bg-sky-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default PersonalInformation;
