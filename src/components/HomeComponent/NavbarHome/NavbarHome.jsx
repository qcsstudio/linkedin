  "use client";

  import React, { useState } from "react";
  import { motion, useScroll, useTransform } from "framer-motion";
  import Image from "next/image";
  import logo from "../../../../public/images/homeImages/logofooter.png";
  import Logo from '../../../../public/images/homeImages/ElevatrXLogo.svg'
  import Link from "next/link";
  import { FiMenu, FiX } from "react-icons/fi";
  import mainLogo from "../../../../public/images/mainLogo.png";

  const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    const background = useTransform(
      scrollY,
      [0, 100],
      ["rgba(255, 255, 255, 0)", "#D6E2ED"]
    );
    const buttonBackground = useTransform(
      scrollY,
      [0, 100],
      [
        "linear-gradient(to right, rgba(14,28,41,1), rgba(50,61,104,1))",
        "linear-gradient(to right, rgba(50,61,104,1), rgba(14,28,41,1))",
      ]
    );
    const buttonTextColor = useTransform(scrollY, [0, 100], ["#fff", "#fff"]);
    const borderRadius = useTransform(scrollY, [0, 100], ["1.5rem", ".5rem"]);
    const width = useTransform(scrollY, [0, 100], ["90%", "85%"]);
    const top = useTransform(scrollY, [0, 100], ["1rem", "1rem"]);

    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
      }
    };

    return (
      <motion.div
        style={{ background, borderRadius, width,top,}}
        className="fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out"
      >
        <div className="flex justify-between items-center px-4 md:px-8 lg:px-8 w-full">
          <Link href="/">
          <div className="flex items-center">
            <Image
              src={Logo}
              alt="ElevatrX Logo"
              className="h-20 w-auto md:h-16"
            />
          </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-[#0E1C29] text-sm lg:text-lg  font-medium">
            <Link href="/" className="hover:text-gray-600 transition">
              Home
            </Link>
            <button onClick={() => scrollToSection("features")} className="hover:text-gray-600 transition">
              Features
            </button>
            <button onClick={() => scrollToSection("pricing")} className="hover:text-gray-600 transition">
              Pricing
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-gray-600 transition">
              Contact
            </button>
          </nav>

          <Link href="/register" className="hidden md:block">
            <motion.button
              style={{ background: buttonBackground, color: buttonTextColor }}
              className="px-5 py-2 rounded-lg transition duration-300"
            >
              Get Started
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-3xl text-[#0E1C29]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-white shadow-md py-5 flex flex-col items-center space-y-5 md:hidden"
          >
            <Link href="/" className="text-lg text-[#0E1C29]" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <button className="text-lg text-[#0E1C29]" onClick={() => scrollToSection("features")}>
              Features
            </button>
            <button className="text-lg text-[#0E1C29]" onClick={() => scrollToSection("pricing")}>
              Pricing
            </button>
            <button className="text-lg text-[#0E1C29]" onClick={() => scrollToSection("contact")}>
              Contact
            </button>
            <Link href="/register">
              <motion.button
                style={{ background: buttonBackground, color: buttonTextColor }}
                className="px-5 py-2  rounded-lg transition duration-300"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    );
  };

  export default Navbar;
