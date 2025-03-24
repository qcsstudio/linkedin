import React from 'react';
import Image from 'next/image';
import logo from '../../../../public/images/homeImages/logofooter.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import bgfooter from '../../../../public/images/homeImages/bgfooter.png'


const Footer = () => {
    return (
        <footer className="w-full relative bg-[#5E788F]/85 overflow-hidden">
        <div className="px-[3.3rem] flex flex-col gap-10">
            
            {/* Top Section */}
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center w-full">
    
                {/* Left - Company Info */}
                <div className="flex flex-col w-full lg:w-[35%]">
                    <div className="relative flex items-center py-12 w-full">
                        <div className="left-0">
                            <h1 className="text-5xl font-bold tracking-wide bg-gradient-to-r from-[#0E1C29] to-[#323D68] bg-clip-text text-transparent">
                                Elevatr
                            </h1>
                            <p className="text-sm max-w-52">
                                AI-Powered Social Growth & Revenue Acceleration
                            </p>
                        </div>
                        <Image src={logo} alt="ElevatrX Logo" className="absolute right-[35%] w-[40%]" />
                    </div>
    
                    {/* Address and Contact Info */}
                    <div className="flex flex-col gap-4 text-gray-300">
                        <div>
                            <h2 className="text-lg font-semibold tracking-wide">Company Address:</h2>
                            <p className="text-sm tracking-wide">QuantumCrafters Studio Private Limited</p>
                            <p className="text-sm tracking-wide">Prosperity Arcade, D-229, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab 160071</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold tracking-wide">Contact Info:</h3>
                            <p className="text-sm tracking-wide">Email: info@qcsstudio.in</p>
                            <p className="text-sm tracking-wide">Phone: +91 771-960-7776</p>
                        </div>
                    </div>
                </div>
    
                {/* Right - Subscription and Social Media */}
                <div className="w-full lg:w-[55%] flex flex-col space-y-4">
                    <h3 className="text-3xl font-semibold leading-tight tracking-wide text-gray-300">
                        Get Weekly Social Media Insights Delivered
                    </h3>
    
                    <div className="relative w-full">
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:border-white"
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300">
                            <FaChevronCircleRight />
                        </button>
                    </div>
    
                    {/* Social Media Icons */}
                    <div className="flex justify-start space-x-4">
                        {[FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
                            <div key={index} className="p-2 rounded-full border-[1px]">
                                <Icon className="text-xl cursor-pointer text-white hover:text-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    
            {/* Footer Links */}
            <div className="grid grid-cols-5  gap-6 text-gray-300">

                        <div>
                            <h3 className="text-lg font-semibold">Quick Links</h3>
                            <ul className="text-sm space-y-1 mt-2">
                                <li>Partner With Us</li>
                                <li>Blog</li>
                                <li>Careers</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-lg font-semibold">Product</h3>
                            <ul className="text-sm space-y-1 mt-2">
                                <li>Features</li>
                                <li>Pricing</li>
                                <li>Integrations</li>
                                <li>Request a Demo</li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-lg font-semibold">Resources</h3>
                            <ul className="text-sm space-y-1 mt-2">
                                <li>Help Center</li>
                                <li>FAQs</li>
                                <li>Case Studies</li>
                                <li>Early Adopter Program</li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-lg font-semibold">Legal</h3>
                            <ul className="text-sm space-y-1 mt-2">
                                <li>Privacy Policy</li>
                                <li>Terms of Services</li>
                                <li>Cookie Policy</li>
                                <li>Data Protection</li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-lg font-semibold">Social Media</h3>
                            <ul className="text-sm space-y-1 mt-2">
                                <li>LinkedIn</li>
                                <li>Facebook</li>
                                <li>Instagram</li>
                                <li>Twitter</li>
                                <li>YouTube</li>
                            </ul>
                        </div>
                    </div>
        </div>
    
        {/* Background Image Fix */}
        <Image className="absolute bottom-0 w-full h-[70%] object-cover" src={bgfooter} alt="Footer Background" />
    
        {/* Copyright Section */}
        <div className="border-t border-gray-400 mt-6 text-gray-300 text-center text-md py-5">
            <p>Copyright © 2025, QuantumCrafters Studio Pvt Ltd. All rights reserved. | Built with ❤️ & AI in India.</p>
        </div>
    </footer>
    

    );
};

export default Footer;
