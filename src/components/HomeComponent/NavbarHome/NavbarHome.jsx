"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import logo from "../../../../public/images/homeImages/logofooter.png";
import Link from "next/link";

const Navbar = () => {

  const { scrollY } = useScroll();


  const background = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(112, 131, 149, 1)"]
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


  const borderRadius = useTransform(scrollY, [0, 100], ["1.5rem", "1.5rem"]);
  const width = useTransform(scrollY, [0, 100], ["90%", "65%"]);
  const top = useTransform(scrollY, [0, 100], ["2rem", "2rem"]);
  const paddingY = useTransform(scrollY, [0, 100], [".5rem", "1rem"]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <motion.div
      style={{
        background,
        borderRadius,
        width,
        top,
        // paddingTop: paddingY,
        // paddingBottom: paddingY,
      }}
      className="fixed left-1/2 transform  -translate-x-1/2 z-50  transition-all duration-300 ease-in-out ">

      <div className="flex justify-between  items-center px-8">

<Link href='/'>
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
</Link>
        


        <nav className="hidden md:flex space-x-8 text-[#0E1C29] text-lg font-medium">
          <Link href="/" className="hover:text-gray-600 transition">Home</Link>
          <button onClick={() => scrollToSection("features")} className="hover:text-gray-600 transition">Features</button>
          <button onClick={() => scrollToSection("pricing")} className="hover:text-gray-600 transition">Pricing</button>
          <button onClick={() => scrollToSection("contact")} className="hover:text-gray-600 transition">Contact</button>
        </nav>

        <Link href='/register'>
          <motion.button
            style={{ background: buttonBackground, color: buttonTextColor }}
            className="px-5 py-2 rounded-lg transition duration-300"
          >
            Get Started
          </motion.button>
        </Link>


      </div>
    </motion.div>
  );
};

export default Navbar;
