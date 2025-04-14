"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import { IoEyeSharp, IoEyeOff } from "react-icons/io5";
import Link from "next/link";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide, } from "swiper/react";
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
    phone:"",
    password: "",
    confirm: ""
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (form.password === form.confirm) {
      console.log("Form Data",form);
      registerAPI(form);
    } else {
      alert("Password and Confirm Password are not same");
    }
  };

  const formHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sliderParagraph = [
    { para: "Switching between social platforms is easier with ElevatrX than switching streaming shows on Netflix!", image: "/images/signUp1.svg" },
    { para: "Our analytics are so clear, even your grandparents would finally understand what you do for a living!", image: "/images/signUp2.svg" },
    { para: "ElevatrX was built after we spent one too many nights manually scheduling posts—because even marketers deserve weekends!", image: "/images/signUp3.svg" },
    { para: "Our security protocols are tighter than your favorite jeans after the holidays—keeping your data snug and safe!", image: "/images/signUp4.svg" },
    { para: "Early adopters don't just get special perks—they also earn eternal bragging rights at networking events!", image: "/images/signUp5.svg" },
    { para: "Our AI is smart because our engineers never settle for ‘good enough’—except maybe when choosing pizza toppings.", image: "/images/signUp6.svg" },
    { para: "Media buzz for ElevatrX is louder than your notifications during a viral post—stay tuned!", image: "/images/signUp7.svg" },
  ];

  return (
    <div className="registerForm w-full h-screen flex text-black bg-white">
      <div className="leftContainer hidden xl:flex items-center justify-center bg-gradient-to-r from-purple-200 to-blue-100 w-1/2 h-full">
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]} spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }} speed={1200} className="custom-swiper w-full h-full flex items-center justify-center" autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }} >
          {sliderParagraph.map((p, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full gap-16 flex flex-col items-center justify-center">
                <div className="absolute top-0 left-10">
                  <Image src={mainLogo} height={200} width={200} alt="" />
                </div>
                <div className="flex justify-center items-center z-10 bg-[#f0f0f0]/10 rounded-full relative lg:w-[400px] lg:h-[400px]">
                  <Image src={p.image} width={70} height={70} className="w-[100%] h-[100%] drop-shadow-6xl" alt="" />
                </div>
                {/* <Image className="absolute top-[30%] left-[15%] opacity-70" src={insta} alt="" width={70} height={70} />
                <Image className="absolute bottom-[25%] left-[30%] h-[15%] w-[15%]" src={facebook} alt="" width={70} height={70} />
                <Image className="absolute right-[27%] top-[8%] h-[17%] w-[17%]" src={linkdin} alt="" width={70} height={70} />
                <Image className="absolute right-[15%] bottom-[32%] h-[15%] w-[15%]" src={pinterest} alt="" width={70} height={70} /> */}
                <p className="w-[80%] text-center text-lg font-semibold text-purple-500">{p.para}</p>
              </div>
              {/* text-purple-500 */}
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
        <form onSubmit={submitHandler} className="formContainer w-[70%] p-0 md:p-[1rem] lg:p-[2rem] flex justify-center items-start  flex-col gap-[.5rem]">
          <p className="heading text-[1.8rem] font-bold text-center">Sign Up</p>
          <p className="text-purple-500">Enter details to create your account</p>
          <div className="space-y-2">
            {/* Name Fields */}
            <label htmlFor="password">Your Name</label>
            <div className="flex flex-col lg:flex-row gap-4">
              <input
                className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500 focus:outline-none"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={formHandler}
                placeholder="First name"
                required
                />
              <input
                className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={formHandler}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="Enter Your Email" value={form.email} onChange={formHandler} type="email" name="email" className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500 focus:outline-none" required />
          
          {/* Phone Field */}
          <label htmlFor="phone">Phone</label>
          <input id="phone" placeholder="Enter Your Phone Number" value={form.phone} onChange={formHandler} type="text" name="phone" className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500 focus:outline-none" required />
          
          {/* Password Field */}
          <label htmlFor="password">Password</label>
          <div className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500 flex items-center gap-4">
            <input id="password" placeholder="Enter Your Password" value={form.password} onChange={formHandler} type={showPassword ? "text" : "password"} name="password" className="w-full h-full border-none bg-transparent focus:outline-none" required />
            {showPassword ? (
              <IoEyeOff className="text-2xl text-white cursor-pointer" onClick={() => setShowPassword(false)} />
            ) : (
              <IoEyeSharp className="text-2xl text-white cursor-pointer" onClick={() => setShowPassword(true)} />
            )}
          </div>

          {/* Confirm Password Field */}
          <label htmlFor="password">Confirm Password</label>
          <div className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500 flex items-center gap-4">
            <input id="password" placeholder="Enter Your Password" value={form.confirm} onChange={formHandler} type={showPassword ? "text" : "password"} name="confirm" className="w-full h-full border-none bg-transparent focus:outline-none" required />
            {showPassword ? (
              <IoEyeOff className="text-2xl text-white cursor-pointer" onClick={() => setShowPassword(false)} />
            ) : (
              <IoEyeSharp className="text-2xl text-white cursor-pointer" onClick={() => setShowPassword(true)} />
            )}
          </div>

          {/* Submit button */}
          <button className="w-full py-4 px-4 rounded bg-white text-[#7967D6] flex justify-center items-center mt-[.5rem]">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
