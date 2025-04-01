"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import mainLogo from "../../../public/images/mainLogo.png";
import insta from "../../../public/images/loginImages/insta.png";
import facebook from "../../../public/images/loginImages/facebook.png";
import linkdin from "../../../public/images/loginImages/linkdin.png";
import pinterest from "../../../public/images/loginImages/pinterest.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { userContext } from "@/Context/user.context";
import logo from '../../../public/images/loginImages/logo.png'

const RegisterForm = () => {
  const { registerAPI } = useContext(userContext);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    registerAPI(form);
  };

  const formHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sliderParagraph = [
    { para: "Switching between social platforms is easier with ElevatrX than switching streaming shows on Netflix!" },
    { para: "Our analytics are so clear, even your grandparents would finally understand what you do for a living!" },
    { para: "ElevatrX was built after we spent one too many nights manually scheduling posts—because even marketers deserve weekends!" },
    { para: "Our security protocols are tighter than your favorite jeans after the holidays—keeping your data snug and safe!" },
    { para: "Early adopters don't just get special perks—they also earn eternal bragging rights at networking events!" },
    { para: "Our AI is smart because our engineers never settle for ‘good enough’—except maybe when choosing pizza toppings." },
    { para: "Media buzz for ElevatrX is louder than your notifications during a viral post—stay tuned!" },
  ];

  return (
    <div className="registerForm w-full h-screen flex text-black bg-white">
      <div className="leftContainer hidden xl:flex items-center justify-center bg-gradient-to-r from-purple-200 to-blue-100 w-1/2 h-full">
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }} className="custom-swiper w-full h-full flex items-center justify-center">
          {sliderParagraph.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full gap-16 flex flex-col items-center justify-center">
                <div className="absolute top-0 left-10">
                  <Image src={mainLogo} height={200} width={200} alt="" />
                </div>
                <div className="flex justify-center items-center z-10 bg-white rounded-full relative lg:w-[400px] lg:h-[400px]">
                  <Image src={logo} className="w-[70%] h-[70%] drop-shadow-6xl" alt="" />
                </div>
                <Image className="absolute top-[30%] left-[15%]" src={insta} alt="" width={70} height={70} />
                <Image className="absolute bottom-[25%] left-[30%] h-[15%] w-[15%]" src={facebook} alt="" width={70} height={70} />
                <Image className="absolute right-[27%] top-[8%] h-[17%] w-[17%]" src={linkdin} alt="" width={70} height={70} />
                <Image className="absolute right-[15%] bottom-[32%] h-[15%] w-[15%]" src={pinterest} alt="" width={70} height={70} />
                <p className="w-[80%] text-center text-lg font-semibold text-purple-500">{p.para}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="rightContainer w-full xl:w-1/2 h-full bg-gradient-to-r p-2 md:p-6 lg:p-10 from-purple-300 flex flex-col justify-center items-center to-blue-200">
         <div className="block xl:hidden absolute top-0 left-10">
                              <Image src={mainLogo} height={200} width={200} alt="" />
                            </div>
        <div className="inputContainer w-full gap-2 justify-end flex items-center">
          <p className="forgetPassword">Already have an account?</p>
          <Link href="/login">
            <p className="signUpLink text-purple-500 cursor-pointer">Log in</p>
          </Link>
        </div>
        <form onSubmit={submitHandler} className="formContainer w-[70%] p-0 md:p-[1rem] lg:p-[2rem] justify-center items-start flex flex-col gap-[1rem]">
          <p className="heading text-[1.8rem] font-bold text-center">Sign Up</p>
          <p className="text-purple-500">Enter details to create your account</p>
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="Enter Your Email" value={form.email} onChange={formHandler} type="email" name="email" className="w-full h-14 px-4 border-none bg-transparent focus:outline-none" required />
          <label htmlFor="password">Password</label>
          <div className="w-full h-14 px-4 border-none bg-transparent flex items-center gap-4">
            <input id="password" placeholder="Enter Your Password" value={form.password} onChange={formHandler} type={showPassword ? "text" : "password"} name="password" className="w-full h-full border-none bg-transparent focus:outline-none" required />
            {showPassword ? (
              <IoEyeOff className="text-2xl text-white cursor-pointer" onClick={() => setShowPassword(false)} />
            ) : (
              <IoEyeSharp className="text-2xl text-white cursor-pointer" onClick={() => setShowPassword(true)} />
            )}
          </div>
          <button className="w-full py-4 px-4 rounded bg-white text-[#7967D6] flex justify-center items-center">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
