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
    <div className="w-full px-4 sm:px-6 lg:px-[3.37rem] md:px-[3.12rem] z-[10]">
      <div className="innerContainer flex flex-col gap-6 justify-center items-start w-full h-full bg-white/35 rounded-[.5rem] z-[10] px-4 md:px-[2.5rem] py-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/70 mb-4">
          Need help?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {/* Phone Support */}
          <a
            href="tel:+917719607776"
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-gray-300/50 rounded-lg text-white cursor-pointer transition hover:bg-gray-300/70 gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl sm:text-4xl text-gray-700">
                <FiPhoneIncoming />
              </span>
              <div>
                <h3 className="font-semibold text-lg sm:text-xl md:text-2xl">Request a callback</h3>
                <p className="text-sm sm:text-base">Our team will contact you soon</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-700 self-end sm:self-center" />
          </a>

          {/* FAQ Scroll */}
          <div
            onClick={scrollToFAQ}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-gray-300/50 rounded-lg text-white cursor-pointer transition hover:bg-gray-300/70 gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl sm:text-4xl text-gray-700">
                <IoMdInformationCircleOutline />
              </span>
              <div>
                <h3 className="font-semibold text-lg sm:text-xl md:text-2xl">FAQs</h3>
                <p className="text-sm sm:text-base">Get your doubts cleared</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-700 self-end sm:self-center" />
          </div>

          {/* Email Support */}
          <a
            href="mailto:info@qcsstudio.com"
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-gray-300/50 rounded-lg text-white cursor-pointer transition hover:bg-gray-300/70 gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl sm:text-4xl text-gray-700">
                <MdOutlineEmail />
              </span>
              <div>
                <h3 className="font-semibold text-lg sm:text-xl md:text-2xl">Mail us</h3>
                <p className="text-sm sm:text-base">Reach out to us</p>
              </div>
            </div>
            <FaChevronRight className="text-gray-700 self-end sm:self-center" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NeedHelp;
