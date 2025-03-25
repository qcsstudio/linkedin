import React from 'react';
import Image from 'next/image';
import logo from '../../../../public/images/homeImages/logofooter.png';
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


const Footer = () => {
    return (
        <footer className="w-full  bg-[#5E788F]/85 bg-[url('/images/homeImages/bgfooter.png')] bg-contain py-3">
        <div className="px-[4rem]  mb-6 flex flex-col ">
            
         
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center w-full ">
    
                <div className="flex flex-col w-[40%] lg:w-[35%] relative ">
                    <div className=" flex items-center py-12 w-full">
                        <div className="left-0">
                            <h1 className="text-7xl font-bold tracking-wide bg-gradient-to-r from-[#0E1C29] to-[#323D68] bg-clip-text text-transparent">
                                Elevatr
                            </h1>
                            <p className={`text-lg text-[#0E1C29] max-w-60 ${syne.className}`}>
                                AI-Powered Social Growth & Revenue Acceleration
                            </p>
                        </div>
                    </div>
                        <Image src={logo} alt="ElevatrX Logo" className="absolute right-[15%] w-[40%]" />
    
             
                    
             
                </div>
                <div className="w-[60%] lg:w-[55%] flex flex-col font- space-y-4 mt-3  items-end ">
                <h3 className={`text-4xl font-semibold  tracking-wide text-right text-white ${syne.className}`}>
                    Get Weekly Social Media Insights <br/>Delivered
                </h3>
    
                    <div className=" w-full">
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:border-white"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
                            <FaChevronCircleRight />
                        </button>
                    </div>
    
                    <div className="flex justify-start space-x-4">
                        {socialLinks.map(({ href, icon: Icon }, index) => (
                            <Link key={index} href={href} target="_blank" rel="noopener noreferrer">
                            <div className="p-2 rounded-full border-[1px] cursor-pointer">
                                <Icon className="text-xl text-white hover:text-gray-300" />
                            </div>
                            </Link>
                        ))}
                    </div>
                </div> 
            </div>

            <div className='w-full flex '>
                
                        <div className={`w-[60%] text-gray-300 ${syne.className}`}>
                            <h2 className="text-xl font-medium tracking-wide text-white">Company Address:</h2>
                            <p className="text-base mt-2 tracking-wide">QuantumCrafters Studio Private Limited</p>
                            <p className="text-base tracking-wide">Prosperity Arcade, D-229, Industrial Area, Sector 74,<br/> Sahibzada Ajit Singh Nagar, Punjab 160071</p>
                        </div>
                       
                        <div className={` text-gray-300 ${syne.className}`}>
                            <h3 className="text-xl mt-2 font-medium tracking-wide text-white">Contact Info:</h3>
                            <p className="text-base  tracking-wide">
                                <Link href="mailto:info@qcsstudio.com">
                                Email: info@qcsstudio.com
                                </Link>
                            </p>
                            <p className="text-base tracking-wide">
                                <Link href="tel:+91 771-960-7776">
                                Phone: +91 771-960-7776
                                </Link>
                            </p>
                        </div>
                    
                </div>
                </div>
    
            {/* Footer Links */}
            <div  className={`px-[4rem] ${syne.className}`}>
            <div className="grid grid-cols-5  gap-6 text-gray-300">

                        <div>
                            <h3 className="text-xl font-medium text-white">Quick Links</h3>
                            <ul className="text-sm space-y-1 mt-2">
                                <li>Partner With Us</li>
                                <li>Blog</li>
                                <li>Careers</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-xl font-medium text-white">Product</h3>
                            <ul className="text-sm space-y-1 mt-2">
                                <li>
                                    <Link href="#features">
                                    Features
                                    </Link>
                                    </li>
                                <li>
                                    <Link href="#pricing">
                                    Pricing
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#integration">
                                    Integrations
                                    </Link>
                                </li>
                                <li>Request a Demo</li>

                            </ul>
                        </div>
                        


                        <div>
                            <h3 className="text-xl font-medium text-white">Resources</h3>
                            <ul className="text-sm space-y-1 mt-2">
                                <li>Help Center</li>
                                <li>FAQs</li>
                                <li>Case Studies</li>
                                <li>Early Adopter Program</li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-xl font-medium text-white">Legal</h3>
                            <ul className="text-sm space-y-1 mt-2">
                            <li>
                            <Link href={"https://www.qcsstudio.in/privacy-policy"}>
                                Privacy Policy
                            </Link>
                            </li>
                                <li>
                                    <Link href="https://www.qcsstudio.in/terms-of-service">
                                        Terms of Services
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"https://www.qcsstudio.in/privacy-policy"}>
                                    Cookie Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"https://www.qcsstudio.in/privacy-policy"}>
                                    Data Protection
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-xl font-medium text-white">Social Media</h3>
                            <ul className="text-sm space-y-1 mt-2">
                                <li>
                                    <Link href="https://www.linkedin.com/company/qcsstudio">
                                    LinkedIn
                                    </Link>
                                    
                                </li>
                                <li>
                                    <Link href="https://www.facebook.com/qcsstudio">
                                    Facebook
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.instagram.com/qcsstudio/">
                                    Instagram
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link href="https://www.youtube.com/@QCS-IT">
                                    YouTube
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>
       
    
    
        {/* Copyright Section */}
        <div className="border-t border-gray-400 mt-6 text-gray-300 text-center text-md py-5">
            <p>Copyright © 2025, QuantumCrafters Studio Pvt Ltd. All rights reserved. | Built with ❤️ & AI in India.</p>
        </div>
    </footer>
    

    );
};

export default Footer;
