"use client";
import Image from "next/image";
import logo from "../../../public/images/registerImages/Logo.png";
import { useEffect, useState } from "react";
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import mainLogo from "../../../public/images/mainLogo.png";
import insta from "../../../public/images/loginImages/insta.png";
import facebook from "../../../public/images/loginImages/facebook.png";
import linkdin from "../../../public/images/loginImages/linkdin.png";
import pinterest from "../../../public/images/loginImages/pinterest.png";
import { useContext } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { userContext } from "@/Context/user.context";

const RegisterForm = () => {
 const {registerAPI } = useContext(userContext);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    registerAPI(form);
  };

  const formHandler = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const sliderParagraph = [
    {
      para: "Lorem Ipsum is simply dummy text of the printing industry.text of the printing industry",
    },
    {
      para: "Lorem Ipsum is simply dummy text of the printing industry.text of the printing industry.",
    },
    {
      para: "Lorem Ipsum is simply dummy text of the printing industry.text of the printing industry",
    },
    {
      para: "Lorem Ipsum is simply dummy text of the printing industry.text of the printing industry",
    },
  ];

  return (
    <>
      <div className="registerForm w-[100%] h-[100vh]  flex text-black bg-[#ffffff] ">
        <div className="leftContainer  flex items-center justify-center bg-gradient-to-r  from-purple-200  to-blue-100 w-1/2 h-full">
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
                    <div className="absolute top-10 left-10">
                      <Image src={mainLogo} height={200} width={200} alt="" />
                    </div>
                    <div className="rounded-full w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[45%] lg:h-[45%] 2xl:w-[400px] 2xl:h-[400px] z-10 bg-white flex relative"></div>
                    <Image
                      className="absolute top-[30%] left-[15%] "
                      src={insta}
                      alt=""
                      width={70}
                      height={70}
                    />
                    <Image
                      className="absolute bottom-[30%] left-[30%] h-[15%] w-[15%]"
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
        <div className=" w-1/2 bg-gradient-to-b from-blue-300 to-purple-300 text-black mx-auto p-10">
          <div className="inputContainer w-[100%] gap-2  justify-end  flex items-center ">
            <p className="forgetPassword">Don't have account ?</p>

            <Link href="/login">
              <p className="signUpLink text-purple-500 cursor-pointer">
                Create an account{" "}
              </p>
            </Link>
          </div>
          <div className="flex flex-col lg:gap-10 justify-center items-center h-full ">
            <div className="container flex flex-col justify-center gap-2 w-[70%]  p-8">
              <div className="heading items-start">
                <h1 className=" text-[16px] md:text-[24px] font-bold">
                  Sign Up
                </h1>
                <p className="signUpLink text-purple-500 ">
                  Enter details to create your account{" "}
                </p>
              </div>
              <form onSubmit={submitHandler}>
                <div className="inputs text-black flex flex-col gap-2 w-full">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Your name</label>
                    <div className="name flex flex-col lg:flex-row gap-4">
                      <input
                        id="name"
                        className="w-[100%] h-[3.5rem] px-[1.3rem]  focus:outline-none rounded-[.5rem] border border-white bg-[#ffffff]/30 flex items-center  "
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={form.firstName}
                        onChange={formHandler} // Pass the function reference
                        required
                      />
                      <input
                        className="w-[100%] h-[3.5rem] px-[1.3rem]  focus:outline-none rounded-[.5rem] border border-white bg-[#ffffff]/30 flex items-center"
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={form.lastName}
                        onChange={formHandler} // Pass the function reference
                        required
                      />
                    </div>
                  </div>
                  <div className="contact flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      className="w-[100%] h-[3.5rem] px-[1.3rem]  focus:outline-none rounded-[.5rem] border border-white bg-[#ffffff]/30 flex items-center"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={formHandler} // Pass the function reference
                      placeholder="Email id"
                      required
                    />
                    {/* <div className="phone flex text-center">
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
                      </div>  */}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <div className=" w-[100%] h-[3.5rem] px-[1.3rem]  rounded-[.5rem] border border-white bg-[#ffffff]/30 flex items-center gap-[3rem]">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="w-[100%] h-[100%]  border-none bg-transparent  focus:outline-none "
                        name="password"
                        placeholder="Create Password"
                        value={form.password}
                        onChange={formHandler} // Pass the function reference
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
                  </div>
                  <div className="inputContainer w-[100%]  flex items-center justify-between">
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

                  <div className="button">
                    <button
                      type="submit"
                      className="w-[100%] h-[3.5rem] px-[1.3rem] text-purple-500 rounded-[.5rem] border border-white bg-white flex items-center justify-center"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
