'use client'
import React from 'react';
import Image from 'next/image';
import logo from '../../../../public/images/homeImages/elevatrxlogo.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import { Syne } from "next/font/google";
import Link from 'next/link';

const syne = Syne({ subsets: ["latin"], weight: "400" });

const socialLinks = [
    { href: "https://www.linkedin.com/company/qcsstudio", icon: FaLinkedinIn },
    { href: "https://www.facebook.com/qcsstudio", icon: FaFacebookF },
    { href: "https://www.instagram.com/qcsstudio/", icon: FaInstagram },
    { href: "https://www.youtube.com/@QCS-IT", icon: FaYoutube },
];


const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

const Footer = () => {
    return (
        <footer className="w-full  lg:bg-[url('/images/homeImages/bgfooter.png')] bg-contain py-3">
            <div className="px-6 sm:px-10 lg:px-[4rem]  mb-6 flex flex-col">

                <div className="flex flex-col-reverse sm:flex-row md:flex-row lg:flex-row lg:w-[100%] flex-wrap lg:flex-nowrap justify-between items-center w-full">
                    <div className=" w-[60%] mt-2 sm:mx-auto md:mx-auto md:w-[50%] sm:w-[50%] lg:w-[45%] ">
                        <Image
                            src={logo}
                            alt="ElevatrX Logo"
                        />
                    </div>

                  
                    <div className="w-full  sm:mx-auto  sm:w-[70%] lg:w-[55%] flex flex-col space-y-4 mt-6 lg:mt-0 items-center lg:items-end text-center lg:text-right">
                        <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide text-white ${syne.className}`}>
                            Get Weekly Social Media Insights  Delivered
                        </h3>

                        <div className="relative w-full z-20 sm:w-[80%] lg:w-full">
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="w-full px-4 py-2 text-white bg-transparent border border-gray-400 rounded-md focus:outline-none focus:border-white"
                            />
                            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
                                <FaChevronCircleRight />
                            </button>
                        </div>

                        <div className="flex justify-center lg:justify-start space-x-4">
                            {socialLinks.map(({ href, icon: Icon }, index) => (
                                <Link key={index} href={href} target="_blank" rel="noopener noreferrer">
                                    <div className="p-2 rounded-full border-[1px] cursor-pointer">
                                        <Icon className="lg:text-xl text-base text-white hover:text-gray-300" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="w-full flex flex-col sm:flex-row sm:gap-8 text-center sm:text-left lg:mt-1 mt-6">
                    <div className={`w-full lg:w-[60%] sm:w-[50%] text-gray-300 ${syne.className}`}>
                        <h2 className="text-lg sm:text-xl font-medium tracking-wide text-white">Company Address:</h2>
                        <p className="text-sm sm:text-base mt-2 tracking-wide">
                            QuantumCrafters Studio Private Limited
                        </p>
                        <p className="text-sm sm:text-base tracking-wide">
                            Prosperity Arcade, D-<span className='font-montserrat'>229</span>, Industrial Area, Sector <span className='font-montserrat'>74</span>,<br />
                            Sahibzada Ajit Singh Nagar, Punjab 160071
                        </p>
                    </div>

                    <div className={` mt-4 lg:w-[40%]  sm:mt-0 text-gray-300 ${syne.className}`}>
                        <h3 className="text-lg sm:text-xl font-medium tracking-wide text-white">Contact Info:</h3>
                        <p className="text-sm sm:text-base tracking-wide">
                            <Link href="mailto:info@qcsstudio.com">
                                Email: info@qcsstudio.com
                            </Link>
                        </p>
                        <p className="text-sm sm:text-base tracking-wide">
                            <Link href="tel:+91 771-960-7776">
                                Phone:<span className='font-montserrat'>+91 771-960-7776</span> 
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className={`lg:px-[4rem] px-[3rem] ${syne.className}`}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 text-gray-300">
                    <div>
                        <h3 className="sm:text-xl lg:text-xl text-[18px] text-nowrap font-medium text-white">Quick Links</h3>
                        <ul className="text-sm space-y-1 mt-2">
                            <li className='cursor-pointer' onClick={() => scrollToSection("contact")}>Help Center</li>
                            <li className='cursor-pointer' onClick={() => scrollToSection("blog")}>Blog</li>
                            <li className='cursor-pointer' onClick={() => scrollToSection("faq")}>FAQs</li>
                            <li className='cursor-pointer' onClick={() => scrollToSection("contact")}>Contact Us</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="sm:text-xl lg:text-xl text-[18px] text-nowrap font-medium text-white">Product</h3>
                        <ul className="text-sm space-y-1 mt-2">
                            <li className='cursor-pointer' onClick={() => scrollToSection("features")}>Features</li>
                            <li className='cursor-pointer' onClick={() => scrollToSection("pricing")}>Pricing</li>
                            <li className='cursor-pointer' onClick={() => scrollToSection("integration")}>Integration</li>
                            <li className='cursor-pointer' onClick={() => scrollToSection("contact")}>Request a Demo</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="sm:text-xl lg:text-xl text-[18px] text-nowrap font-medium text-white">Resources</h3>
                        <ul className="text-sm space-y-1 mt-2 text-nowrap">
                            <Link target='_blank' href={`https://www.elevatrx.app/linkedin-text-formatter`}  className='leading-[1.5rem]'><li>LinkedIn Formatter</li></Link>
                            <Link target='_blank' href={`https://www.elevatrx.app/instagram-text-formatter`} className='leading-[1.5rem]'><li>Instagram Formatter</li></Link>
                            <Link target='_blank' href={` q`} className='leading-[1.5rem]'><li>Facebook Formatter</li></Link>
                        </ul>
                    </div>

                    <div>
                        <h3 className="sm:text-xl lg:text-xl text-[18px] text-nowrap font-medium text-white">Legal</h3>
                        <ul className="text-sm space-y-1 mt-2 text-nowrap">
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link href="/terms-service">Terms of Services</Link></li>
                            <li><Link href="/privacy-policy">Cookie Policy</Link></li>
                            <li><Link href="/privacy-policy">Data Protection</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="sm:text-xl lg:text-xl text-[18px] text-nowrap font-medium text-white">Social Media</h3>
                        <ul className="text-sm space-y-1 mt-2">
                            <li><Link href="https://www.linkedin.com/company/qcsstudio">LinkedIn</Link></li>
                            <li><Link href="https://www.facebook.com/qcsstudio">Facebook</Link></li>
                            <li><Link href="https://www.instagram.com/qcsstudio/">Instagram</Link></li>
                            <li><Link href="https://www.youtube.com/@QCS-IT">YouTube</Link></li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className="border-t border-gray-400 mt-6 text-gray-300 text-center text-sm sm:text-md py-4 sm:py-5 px-4">
                <p className="max-w-[90%] sm:max-w-full mx-auto">
                    Copyright © 2025, QuantumCrafters Studio Pvt Ltd. All rights reserved. | Built with ❤️ & AI in India.
                </p>
            </div>

        </footer>


    );
};

export default Footer;
