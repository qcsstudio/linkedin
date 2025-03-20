import React from 'react';
import Image from 'next/image';
import logo from '../../../../public/images/homeImages/logofooter.png';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";



const Footer = () => {
    return (
        <footer className="w-full bg-[#5E788F]/85  ">
            <div className='px-16 '>
                <div className="max-w-7xl mx-auto flex flex-col gap-10">


                    <div className="flex justify-between items-start">

                        <div className='flex flex-col w-[30%]'>
                            <div className="relative flex items-center py-12  w-[100%]">
                                <div className=' left-0 '>
                                    <h1 className="text-5xl font-bold tracking-wide  bg-gradient-to-r from-[#0E1C29] to-[#323D68] bg-clip-text text-transparent">Elevatr</h1>
                                    <p className="text-sm  max-w-52">
                                        AI-Powered Social Growth & Revenue Acceleration
                                    </p>
                                </div>

                                <Image src={logo} alt="ElevatrX Logo" className="right-16  w-[50%]  absolute " />


                            </div>

                            <div className="flex flex-col gap-4 text-gray-300">
                                <div>
                                    <h2 className="text-lg font-semibold tracking-wide">Company Address:</h2>
                                    <p className="text-sm tracking-wide">QuantumCrafters Studio Private Limited</p>
                                    <p className="text-sm tracking-wide">1234 Innovation Drive, Tech Park, Bengaluru, India - 560001</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold tracking-wide">Contact Info:</h3>
                                    <p className="text-sm tracking-wide">Email: support@elevatrx.com</p>
                                    <p className="text-sm tracking-wide">Phone: +91-XXXX-XXXXX</p>
                                </div>
                            </div>

                        </div>





                        <div className="w-[70%] flex flex-col   px-20 py-12   space-y-4">

                            <div className='w-full flex items-start text-gray-300'>
                                <h3 className="text-3xl font-semibold leading-tight tracking-wide max-w-xl ">
                                    Get Weekly Social Media Insights  Delivered
                                </h3>
                            </div>



                            <div className="relative w-full">
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md focus:outline-none focus:border-white"
                                />
                                <div className='border-r-2'>
                                    <button className="absolute right-2 top-1/2   transform -translate-y-1/2 text-white hover:text-gray-300">
                                        <FaChevronCircleRight />


                                    </button>
                                </div>

                            </div>


                            <div className=" space-x-4 w-full flex items-end justify-end">
                                <div className='p-2 rounded-full border-[1px]'>
                                    <FaLinkedinIn className="text-xl cursor-pointer text-white hover:text-gray-300" />
                                </div>
                                <div className='p-2 rounded-full border-[1px]'>
                                    <FaFacebookF className="text-xl cursor-pointer text-white hover:text-gray-300" />
                                </div>
                                <div className='p-2 rounded-full border-[1px]'>
                                    <FaInstagram className="text-xl cursor-pointer text-white hover:text-gray-300" />
                                </div>
                                <div className='p-2 rounded-full border-[1px]'>
                                    <FaTwitter className="text-xl cursor-pointer text-white hover:text-gray-300" />
                                </div>
                                <div className='p-2 rounded-full border-[1px]'>
                                    <FaYoutube className="text-xl cursor-pointer text-white hover:text-gray-300" />
                                </div>
                            </div>
                        </div>

                    </div>



                    <div className="grid grid-cols-5 gap-6 text-gray-300">

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
            </div>

            <div className="border-t border-gray-400 mt-6 text-gray-300  text-center text-md  py-5">
                <p>
                    Copyright © 2025, QuantumCrafters Studio Pvt Ltd. All rights reserved. | Built with ❤️ & AI in India.
                </p>
            </div>


        </footer>

    );
};

export default Footer;
