"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import logo from "../../../../public/images/homeImages/logofooter.png";

const Navbar = () => {

  const { scrollY } = useScroll();


  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 1)", "rgba(94, 120, 143, 0.85)"]
  );
  const buttonBackground = useTransform(
    scrollY,
    [0, 100],
    [
      "linear-gradient(to right, rgba(14,28,41,1), rgba(50,61,104,1))",
      "linear-gradient(to right, rgba(50,61,104,1), rgba(14,28,41,1))"
    ]
  );


  const buttonTextColor = useTransform(
    scrollY,
    [0, 100],
    ["rgb(255, 255, 255)", "rgb(255, 255, 255)"]
  );


  const borderRadius = useTransform(scrollY, [0, 100], ["1.5rem", "0rem"]);
  const width = useTransform(scrollY, [0, 100], ["90%", "100%"]);
  const top = useTransform(scrollY, [0, 100], ["1rem", "0rem"]);
  const paddingY = useTransform(scrollY, [0, 100], [".5rem", "1rem"]);

  return (
    <motion.div
      style={{
        background,
        borderRadius,
        width,
        top,
        paddingTop: paddingY,
        paddingBottom: paddingY,
      }}
      className="fixed left-1/2 transform -translate-x-1/2 z-50 shadow-lg transition-all duration-300 ease-in-out"
    >

      <div className="flex justify-between  items-center px-8">

        <div className="flex items-center relative">
          <div className="leading-3 flex flex-col">
            <h1 className="text-5xl font-bold tracking-wide bg-gradient-to-r from-[#0E1C29] to-[#323D68] bg-clip-text text-transparent">
              Elevatr
            </h1>
            <p className="text-[8px]">
              AI-Powered Social Growth & Revenue Acceleration
            </p>
          </div>


          <Image
            src={logo}
            alt="ElevatrX Logo"
            className="absolute -top-10 left-[80%] w-[70%] "
          />
        </div>


        <nav className="hidden md:flex space-x-8 text-[#0E1C29] text-lg font-medium">
          <a href="#" className="hover:text-gray-600 transition">Home</a>
          <a href="#" className="hover:text-gray-600 transition">Features</a>
          <a href="#" className="hover:text-gray-600 transition">Pricing</a>
          <a href="#" className="hover:text-gray-600 transition">Contact</a>
        </nav>

        <motion.button
          style={{ background: buttonBackground, color: buttonTextColor }}
          className="px-5 py-2 rounded-lg transition duration-300"
        >
          Get Started
        </motion.button>

      </div>
    </motion.div>
  );
};

export default Navbar;
