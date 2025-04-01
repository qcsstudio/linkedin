"use client";
import Image from "next/image";
import { IoMail, IoEyeSharp, IoEyeOff } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import insta from "../../../public/images/loginImages/insta.png";
import facebook from "../../../public/images/loginImages/facebook.png";
import linkdin from "../../../public/images/loginImages/linkdin.png";
import pinterest from "../../../public/images/loginImages/pinterest.png";
import mainLogo from "../../../public/images/mainLogo.png";
import { useContext } from "react";
import { userContext } from "@/Context/user.context";
import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import logo from '../../../public/images/loginImages/logo.png'

// Import Swiper styles

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


const LoginForm = () => {
  const { loginAPI } = useContext(userContext);
  // States
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    loginAPI(formData);
  };

  const sliderParagraph = [
    {
      para: "Switching between social platforms is easier with ElevatrX than switching streaming shows on Netflix!",
    },
    {
      para: "Our analytics are so clear, even your grandparents would finally understand what you do for a living!",
    },
    {
      para: "ElevatrX was built after we spent one too many nights manually scheduling posts—because even marketers deserve weekends!",
    },
    {
      para: "Our security protocols are tighter than your favorite jeans after the holidays—keeping your data snug and safe!",
    },
    {
      para: "Early adopters don't just get special perks—they also earn eternal bragging rights at networking events!",
    },
    {
      para: "Our AI is smart because our engineers never settle for ‘good enough’—except maybe when choosing pizza toppings.",
    },
    {
      para: "Media buzz for ElevatrX is louder than your notifications during a viral post—stay tuned!",
    },

  ];

  return (
    <>
      {/* Main Login Container */}
      <div className="loginContainer w-[100%] h-[100vh]  flex text-black bg-[#ffffff] ">
        {/* <div className="innerDiv w-[100%] h-[100%] px-[5rem] flex gap-[10rem]"> */}

        {/* Left Container */}
        <div className=" leftContainer  hidden xl:flex  items-center justify-center bg-gradient-to-r  from-purple-200  to-blue-100 w-1/2 h-full">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="custom-swiper w-full h-full flex items-center justify-center"
          >
            {sliderParagraph.map((p, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className=" relative w-full h-full gap-16 flex flex-col items-center justify-center">
                    <div className="absolute top-0 left-10">
                      <Image src={mainLogo} height={200} width={200} alt="" />
                    </div>
                    <div className="flex justify-center items-center z-10 bg-white rounded-full relative 
  lg:w-[400px] lg:h-[400px]  ">

  <Image src={logo} className="w-[70%] h-[70%] drop-shadow-6xl" alt='' />
  
</div>          <Image
                      className="absolute top-[30%] left-[15%] "
                      src={insta}
                      alt=""
                      width={70}
                      height={70}
                    />
                    <Image
                      className="absolute bottom-[25%] left-[30%] h-[15%] w-[15%]"
                      src={facebook}
                      alt=""
                      width={70}
                      height={70}
                    />
                    <Image
                      className="absolute right-[27%] top-[8%] h-[17%] w-[17%]"
                      src={linkdin}
                      alt=""
                      width={70}
                      height={70}
                    />
                    <Image
                      className="absolute right-[15%] bottom-[32%] h-[15%] w-[15%]"
                      src={pinterest}
                      alt=""
                      width={70}
                      height={70}
                    /> 


                    <p className="w-[80%] text-center text-lg font-semibold  text-purple-500 ">
                      {p.para}
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Right Container */}
        <div className="rightContainer w-[100%] xl:w-1/2 h-[100%] bg-gradient-to-r p-2 md:p-6 lg:p-10 from-purple-300 flex flex-col justify-center items-center  to-blue-200  ">
          {/* Form Container */}{" "}
          <div className="block xl:hidden absolute top-0 left-10">
                      <Image src={mainLogo} height={200} width={200} alt="" />
                    </div>
          <div className="inputContainer w-[100%] gap-2  justify-end  flex items-center ">
            <p className="forgetPassword">Don't have account ?</p>

            <Link href="/register">
              <p className="signUpLink text-purple-500 cursor-pointer">
                Create an account{" "}
              </p>
            </Link>
          </div>
          <form
            method="POST"
            onSubmit={handelSubmit}
            className="formContainer w-[70%] p-0 md:p-[1rem] lg:p-[2rem] justify-center items-start  flex flex-col gap-[1rem]"
          >
            <p className="heading text-[1.8rem] font-bold text-center">
              Log in
            </p>
            <p className=" text-purple-500 ">
              Welcome back! Enter email and pasword{" "}
            </p>

            {/* Email Field */}

            <label htmlFor="email">Email</label>
            <div className="inputContainer w-full h-[4rem] px-[1.3rem]  rounded-[.5rem] border border-white bg-[#ffffff]/30 flex items-center gap-[3rem]">
              <input
                id="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                name="email"
                className="w-[100%] h-[100%] border-none bg-transparent focus:outline-none"
                required
              />
            </div>

            {/* Password Field */}
            <label htmlFor="password">Password</label>
            <div className="inputContainer w-[100%] h-[4rem] px-[1.3rem]  rounded-[.5rem] border border-white bg-[#ffffff]/30 flex items-center gap-[3rem]">
              <input
                id="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-[100%] h-[100%]  border-none bg-transparent  focus:outline-none "
                required
              />

              {showPassword ? (
                <IoEyeOff
                  className="text-[2.5rem] text-white cursor-pointer "
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoEyeSharp
                  className="text-[2.5rem] text-white cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {/* Remind me field */}
            <div className="inputContainer w-[100%] py-[1rem]  flex items-center justify-between">
              <div className="labelContainer flex items-center gap-[1rem]">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="w-[20px] h-[20px] rounded-xl focus:border-none active:border-none accent-purple-500 cursor-pointer"
                />
                <label htmlFor="checkbox">Remember Me</label>
              </div>
              {/* <p className="forgetPassword text-[red] cursor-pointer">Forgot Password?</p> */}
            </div>

            {/* Form submit button */}
            <button className="inputContainer w-[100%] py-[1.3rem] px-[1.3rem]  rounded-[.5rem] bg-white  text-[#7967D6] flex justify-center items-center gap-[3rem]">
              Login
            </button>

            {/* Other options for Login */}
            {/* <div className="inputContainer w-[100%]  flex items-center justify-start gap-[1rem]">
                                
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
                                
                            </div> */}
          </form>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default LoginForm;
