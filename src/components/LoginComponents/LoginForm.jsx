"use client"
import Image from "next/image"
import { IoMail, IoEyeSharp,IoEyeOff  } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {

    // States
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState({
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setFormData(prev=>({...prev,[name]:value}));
        

    }
    console.log(formData);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
      
        // Basic validation
        if (!email || !password) {
          alert("Please fill out all fields.");
          return;
        }
      
        try {
          // Send login request to the API
          const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          const json = await response.json();
      
          // Handle API response
          if (!response.ok) {
            console.error("Error:", json.message || "Something went wrong!");
            alert(json.message || "Login failed. Please try again.");
            return;
          }
      
          // Handle successful login
          console.log("Login successful!", json);
          alert("Login successful!");
      
          // Reset form data
          setFormData({
            email: "",
            password: "",
          });
      
          // Redirect or perform other actions after successful login
          // Example: router.push("/dashboard");
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        }
      };

    return (
        <>
            {/* Main Login Container */}
            <div className="loginContainer w-[100%] h-[100vh] text-black bg-[#ffffff] ">

                <div className="innerDiv w-[100%] h-[100%] px-[5rem] flex gap-[10rem]">


                    {/* Left Container */}
                    <div className="leftContainer w-[50%] h-[100%]">

                        {/* Image Container */}
                        <div className="imageContainer w-[100%] h-[100%] flex justify-center items-center ">
                            <Image src="/images/loginImages/companyLogo.png" width={1024} height={1024} alt="" className="w-[60%]"/>
                        </div>
                    </div>

                    {/* Right Container */}
                    <div className="rightContainer w-[50%] h-[100%] flex justify-center items-center">
                        {/* Form Container */}
                        <form   method="POST"  onSubmit={handelSubmit} className="formContainer w-[90%] p-[2rem] rounded-[1rem] bg-[#ffffff]/40 border border-[#ffffff] flex flex-col gap-[1rem]">
                            <p className="heading text-[1.8rem] font-bold text-center">Hi, Welcome to Media Manager</p>

                            {/* Email Field */}
                            <div className="inputContainer w-[100%] h-[4.3rem] px-[1.3rem]  rounded-[.5rem] bg-[#ffffff]/50 flex items-center gap-[3rem]">
                                <IoMail className="text-[1.5rem]" />
                                <input placeholder="Enter Your Email" value={formData.email} onChange={handleChange} type="email" name="email" className="w-[100%] h-[100%] border-none bg-transparent focus:outline-none" required/>
                            </div>

                            {/* Password Field */}
                            <div className="inputContainer w-[100%] h-[4.3rem] px-[1.3rem]  rounded-[.5rem] bg-[#ffffff]/50 flex items-center gap-[3rem]">
                                <IoIosLock className="text-[2.1rem]" />
                                <input placeholder="Enter Your Password" value={formData.password} onChange={handleChange} type={showPassword?"text":"password"}  name="password" className="w-[100%] h-[100%]  border-none bg-transparent  focus:outline-none " required/>
                                
                                {showPassword ?
                                <IoEyeOff className="text-[2rem] cursor-pointer" onClick={()=>setShowPassword(false)}/> :
                                <IoEyeSharp className="text-[2rem] cursor-pointer" onClick={()=>setShowPassword(true)}/>}
                                
                            </div>

                            {/* Remind me field */}
                            <div className="inputContainer w-[100%] py-[1rem]  flex items-center justify-between">
                                <div className="labelContainer flex items-center gap-[1rem]">

                                    <input type="checkbox" name="rememberMe" className="w-[20px] h-[20px] rounded-[1rem] focus:border-none active:border-none cursor-pointer"/>
                                    <label htmlFor="checkbox">Remember Me</label>
                                </div>
                                <p className="forgetPassword text-[red] cursor-pointer">Forgot Password?</p>
                                
                            </div>

                            {/* Form submit button */}
                            <button className="inputContainer w-[100%] py-[1.3rem] px-[1.3rem]  rounded-[.5rem] bg-[#ffffff]/50 flex justify-center items-center gap-[3rem]">
                                Login
                            </button>

                            {/* Other options text */}
                            <div className="inputContainer w-[100%] pt-[1rem]  flex items-center justify-between">
                                <p className="forgetPassword">Or Log In with</p>
                                
                                <Link href="/register">
                                <p className="signUpLink text-[red] cursor-pointer">New Here? Sign Up</p>
                                </Link>
                                
                            </div>

                            {/* Other options for Login */}
                            <div className="inputContainer w-[100%]  flex items-center justify-start gap-[1rem]">
                                
                                <div className="loginImages w-[45px] h-[45px]">
                                    <Image src="/images/loginImages/google.png" width={1024} height={1024} alt="" className="w-[40px] cursor-pointer"/>    
                                </div>
                                
                                <div className="loginImages w-[45px] h-[45px]">
                                    <Image src="/images/loginImages/linkedIn.png" width={1024} height={1024} alt="" className="w-[40px] cursor-pointer"/>    
                                </div>
                                
                                <div className="loginImages w-[45px] h-[45px]">
                                    <Image src="/images/loginImages/facebook.png" width={1024} height={1024} alt="" className="w-[40px] cursor-pointer"/>    
                                </div>
                                
                                <div className="loginImages w-[45px] h-[45px]">
                                    <Image src="/images/loginImages/x.png" width={1024} height={1024} alt="" className="w-[40px] cursor-pointer"/>    
                                </div>
                                
                            </div>

                        </form>
                    </div>

                </div>


            </div>
        </>
    )
}

export default LoginForm