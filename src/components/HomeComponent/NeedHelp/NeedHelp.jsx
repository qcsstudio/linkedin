"use client";

import React from 'react';
import { FiPhoneIncoming } from "react-icons/fi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";

const NeedHelp = () => {
    const scrollToFAQ = () => {
        const faqSection = document.getElementById("faq");
        if (faqSection) {
            faqSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div id="contact" className="w-full  px-[3.3rem]  z-[10]">
            <div className="innerContainer flex flex-col gap-1 justify-center items-start w-full h-full bg-[#FFFFFF]/35 rounded-[.5rem] z-[10] py-[2rem] px-[7.0625rem]">
                <h2 className="text-4xl font-semibold text-white/50 mb-6">Need help?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                 
                    <a 
                        href="tel:+917719607776" 
                        className="flex items-center p-5 bg-gray-300/50 justify-between rounded-lg text-white cursor-pointer transition"
                    >
                        <div className="flex items-center gap-5">
                            <span className="text-4xl text-gray-700"><FiPhoneIncoming /></span>
                            <div className="leading-3">
                                <h3 className="font-semibold text-2xl leading-4">Request a callback</h3>
                                <p className="text-lg">Our team will contact you soon</p>
                            </div>
                        </div>
                        <FaChevronRight className="text-gray-700" />
                    </a>

                    
                    <a 
                        onClick={scrollToFAQ} 
                        className="flex items-center p-5 bg-gray-300/50 justify-between rounded-lg text-white cursor-pointer transition"
                    >
                        <div className="flex items-center gap-5">
                            <span className="text-4xl text-gray-700"><IoMdInformationCircleOutline /></span>
                            <div className="leading-3">
                                <h3 className="font-semibold text-2xl leading-4">FAQs</h3>
                                <p className="text-lg">Get your doubts cleared</p>
                            </div>
                        </div>
                        <FaChevronRight className="text-gray-700" />
                    </a>

                 
                    <a 
                        href="mailto:info@qcsstudio.in" 
                        className="flex items-center p-5 bg-gray-300/50 justify-between rounded-lg text-white cursor-pointer transition"
                    >
                        <div className="flex items-center gap-5">
                            <span className="text-4xl text-gray-700"><MdOutlineEmail /></span>
                            <div className="leading-3">
                                <h3 className="font-semibold text-2xl leading-4">Mail us</h3>
                                <p className="text-lg">Reach out to us</p>
                            </div>
                        </div>
                        <FaChevronRight className="text-gray-700" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NeedHelp;
