import Image from "next/image"
import { IoMail, IoEyeSharp } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";

const LoginForm = () => {
    return (
        <>
            {/* Main Login Container */}
            <div className="loginContainer w-[100%] h-[100vh] bg-[#ffffff] ">

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
                        <form className="formContainer w-[90%] p-[2rem] rounded-[1rem] bg-[#ffffff]/20 border border-[#ffffff] flex flex-col gap-[1rem]">
                            <p className="heading text-[1.8rem] font-bold text-center">Hi, Welcome to Media Manager</p>

                            {/* Email Field */}
                            <div className="inputContainer w-[100%] py-[1.3rem] px-[1.3rem]  rounded-[.5rem] bg-[#ffffff]/50 flex items-center gap-[3rem]">
                                <IoMail className="text-[1.5rem]" />
                                <input placeholder="Enter Your Email" type="email" name="email" className="w-[100%] h-[100%] border-none bg-transparent focus:outline-none"/>
                            </div>

                            {/* Password Field */}
                            <div className="inputContainer w-[100%] py-[1.3rem] px-[1.3rem]  rounded-[.5rem] bg-[#ffffff]/50 flex items-center gap-[3rem]">
                                <IoIosLock className="text-[2.1rem]" />
                                <input placeholder="Enter Your Password" type="password" name="password" className="w-[100%] h-[90%] border-none bg-transparent focus:outline-none"/>
                                <IoEyeSharp className="text-[2rem]" />
                            </div>

                            {/* Remind me field */}
                            <div className="inputContainer w-[100%] py-[1rem]  flex items-center justify-between">
                                <div className="labelContainer flex items-center gap-[1rem]">

                                    <input placeholder="Enter Your Password" type="checkbox" name="remind me later" className="w-[20px] h-[20px] border-none outline-none rounded-[1rem]"/>
                                    <label htmlFor="checkbox">Remember Me</label>
                                </div>
                                <p className="forgetPassword text-[red] cursor-pointer">Forgot Password?</p>
                                
                            </div>

                            {/* Form submit button */}
                            <button className="inputContainer w-[100%] py-[1.3rem] px-[1.3rem]  rounded-[.5rem] bg-[#ffffff]/50 flex items-center gap-[3rem]">
                                Login
                            </button>

                        </form>
                    </div>

                </div>


            </div>
        </>
    )
}

export default LoginForm