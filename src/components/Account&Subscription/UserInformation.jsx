import React,{useState} from 'react'
import { FaLock } from "react-icons/fa";

const UserInformation = () => {

  const [formData,setFormData] = useState({
    email:"",
    phoneNumber:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitHandler = (e) =>{
    e.preventDefault();
    console.log(formData)
   
    
  }


  
  return (
    <>
      {/* User Information Section */}
          <div className="w-full bg-white/40 p-4 rounded-lg border">
            <h2 className="text-xl font-semibold">User Information</h2>
            <form onSubmit={submitHandler} className="mt-5 space-y-4">
              {/* Email Input */}
              <div className="relative z-10">
                <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700 ">Email</label>
                <input
                name="email"
                type="email" 
                className="w-full h-[52px] border rounded-md p-2 focus:outline-none  border-gray-300"
                value={formData.email}
                onChange={handleChange }/>
              </div>
              
              {/* Phone Number Input */}
              <div className="relative z-10">
                <label className="absolute -top-2 left-2 bg-white px-1 text-gray-700">Phone Number</label>
                <input 
                name='phoneNumber'
                type="tel" 
                className="w-full h-[52px] border rounded-md p-2 focus:outline-none border-gray-300" 
                value={formData.phoneNumber}
                onChange={handleChange}/>
              </div>
    
              {/* Change Password Button */}
              <button 
              type='submit'
              className=" w-36 text-xs h-8 border border-gray-500 bg-white p-2 z-20 relative rounded flex items-center justify-center space-x-2 mt-4 hover:bg-blue-400 hover:border-none transition duration-300">
                <FaLock className="text-sm" />
                <span>Change Password</span>
              </button>
            </form>
          </div>
    
    </>
  );
};

export default UserInformation;