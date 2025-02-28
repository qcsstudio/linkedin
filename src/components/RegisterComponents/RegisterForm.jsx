"use client";
import Image from "next/image";
import logo from "../../../public/images/registerImages/Logo.png";
import { useEffect, useState } from "react";
import Link from "next/link";

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: ""
  });
  const [user,setUser] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault();
  
    // Destructure form state
    const { firstName, lastName, email, phoneNumber, password } = form;
  
    // Basic validation
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      alert("Please fill out all fields.");
      return;
    }
  
    // Prepare data for API request
    const data = { firstName, lastName, email, phoneNumber, password };
  
    try {
      // Make API request
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const json = await res.json();
  
      // Handle response
      if (!res.ok) {
        console.error("Error:", json.message || "Something went wrong");
        alert(json.message || "Registration failed. Please try again.");
        return;
      }
  
      // Reset form on success
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
      });
  
      console.log("Registration successful!", json);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const formHandler  = async (e) => {
    const { name, value } = e.target; 
    setForm((prev) => ({
        ...prev,
        [name]: value,
    }));

  };

 
  return (
    <>
      <div className="registerForm flex justify-center items-center w-[100%] ">
        <div className="hidden md:flex lg:flex justify-center items-center h-screen bg-gradient-to-r from-purple-100 to-blue-200 md:w-[40%] w-[40%]">
          <Image src={logo} height={200} alt="logo" />
        </div>
        <div className=" w-full md:w-[60%] lg:w-[60%] text-black mx-auto">
          <div className="flex bg-gradient-to-r h-screen from-purple-100 to-blue-200">
            <div className="flex flex-col lg:gap-10 justify-center items-center h-full pl-10 w-[90%]">
              <div className="container flex flex-col justify-center gap-10 border border-white bg-blue-100/60 rounded-[16px] h-[90%] lg:h-[80%] p-8">
                <div className="heading items-start">
                  <h1 className=" text-[16px] md:text-[24px] font-bold">
                    Hi, Register Yourself Here
                  </h1>
                </div>
                <form onSubmit={submitHandler} >
                  <div className="inputs text-black flex flex-col gap-5 w-full">
                    <div className="name flex flex-col lg:flex-row gap-4">
                      <input
                        className="px-4 h-14 border rounded-lg w-full bg-white/40  "
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={form.firstName}
                        onChange={formHandler} // Pass the function reference
                        required
                      />
                      <input
                        className="h-14 px-4 border rounded-lg w-full bg-white/40"
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={form.lastName}
                        onChange={formHandler} // Pass the function reference
                        required
                      />
                    </div>
                    <div className="contact flex flex-col lg:flex-row gap-4">
                      <input
                        className="h-14 px-4 border rounded-lg w-full bg-white/40"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={formHandler} // Pass the function reference
                        placeholder="Email id"
                        required
                      />
                      <div className="phone flex text-center">
                        <div className="px-4 label h-14 bg-white w-16 shadow-gray-400 border rounded-lg flex justify-center items-center">
                          <label htmlFor="">+91</label>
                        </div>
                        <input
                          className="h-14 pl-2 text-sm border rounded-tr-lg w-full bg-white/40"
                          type="number"
                          placeholder="Mobile Number"
                          name="phoneNumber"
                          value={form.phoneNumber}
                          onChange={formHandler} // Pass the function reference
                          required
                        />
                      </div>
                    </div>
                    <input
                      type="password" // Use type="password" for password fields
                      className="h-14 px-4 border rounded-lg bg-white/40 w-full"
                      name="password"
                      placeholder="Create Password"
                      value={form.password}
                      onChange={formHandler} // Pass the function reference
                      required
                    />
                    <div className="button">
                      <button
                        type="submit"
                        className="w-full h-16 bg-white/40 rounded-[14px]"
                      >
                        Sign Up
                      </button>
                    </div>
                  </div>
                </form>
                <div className="login flex justify-center items-center">
                  <p>
                    Already Registered,{" "}
                    <Link href="/login" className="text-red-500 font-semibold">Log In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;