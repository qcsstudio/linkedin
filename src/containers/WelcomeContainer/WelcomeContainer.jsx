"use client"
import React from 'react'
import Image from 'next/image'
import mainLogo from '../../../public/images/mainLogo.png'
import { useRouter } from "next/navigation";

const WelcomeContainer = () => {
  const router = useRouter()

  setTimeout(() => {
    router.push("/dashboard");
    // window.location.href = "/dashboard";
  }, 2000);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300">

      <div className="absolute top-[-2rem] w-[100%] flex justify-center">
        <Image className=" w-[25rem]" src={mainLogo} height={250} width={250} alt="" />
      </div>


      <h1 className="text-9xl font-bold text-white/20  welcomeText" style={{ WebkitTextStroke: '1px white' }}>WELCOME</h1>
    </div>
  )
}

export default WelcomeContainer
