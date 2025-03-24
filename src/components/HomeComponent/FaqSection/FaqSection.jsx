'use client'
import React from 'react'
import { useState } from 'react';
import { GoPlus } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import Heading from '../Heading/Heading';
import Subheading from '../Subheading/Subheading'
import Description from '../Description/Description'



const FaqSection = () => {
    const [activeCategory, setActiveCategory] = useState('General');
    const [openAnswer, setOpenAnswer] = useState(null)
    const faqData = {
        "General": [
            { question: "What is ElevatrX?", answer: "ElevatrX is an AI-powered social media automation tool..." },
            { question: "Which social media platforms does ElevatrX support?", answer: "It supports Facebook, Instagram, Twitter, etc." },
            { question: "Can I try ElevatrX for free?", answer: "Yes, there is a free trial available." },
            { question: "Who should use ElevatrX?", answer: "Businesses, agencies, and content creators." },
            { question: "Do I need technical skills to use ElevatrX?", answer: "No, it is user-friendly and requires no technical skills." }
        ],
        "Features & Capabilities": [
            { question: "What is ElevatrX?", answer: "ElevatrX is an AI-powered social media automation tool..." },
            { question: "Which social media platforms does ElevatrX support?", answer: "It supports Facebook, Instagram, Twitter, etc." },
            { question: "Can I try ElevatrX for free?", answer: "Yes, there is a free trial available." },
            { question: "Who should use ElevatrX?", answer: "Businesses, agencies, and content creators." },
            { question: "Do I need technical skills to use ElevatrX?", answer: "No, it is user-friendly and requires no technical skills." }
        ],
        "Plans, Pricing & Billing": [
            { question: "What is ElevatrX?", answer: "ElevatrX is an AI-powered social media automation tool..." },
            { question: "Which social media platforms does ElevatrX support?", answer: "It supports Facebook, Instagram, Twitter, etc." },
            { question: "Can I try ElevatrX for free?", answer: "Yes, there is a free trial available." },
            { question: "Who should use ElevatrX?", answer: "Businesses, agencies, and content creators." },
            { question: "Do I need technical skills to use ElevatrX?", answer: "No, it is user-friendly and requires no technical skills." }
        ],
        "Security & Privacy": [
            { question: "What is ElevatrX?", answer: "ElevatrX is an AI-powered social media automation tool..." },
            { question: "Which social media platforms does ElevatrX support?", answer: "It supports Facebook, Instagram, Twitter, etc." },
            { question: "Can I try ElevatrX for free?", answer: "Yes, there is a free trial available." },
            { question: "Who should use ElevatrX?", answer: "Businesses, agencies, and content creators." },
            { question: "Do I need technical skills to use ElevatrX?", answer: "No, it is user-friendly and requires no technical skills." }
        ],
        "Support & Resources": [
            { question: "What is ElevatrX?", answer: "ElevatrX is an AI-powered social media automation tool..." },
            { question: "Which social media platforms does ElevatrX support?", answer: "It supports Facebook, Instagram, Twitter, etc." },
            { question: "Can I try ElevatrX for free?", answer: "Yes, there is a free trial available." },
            { question: "Who should use ElevatrX?", answer: "Businesses, agencies, and content creators." },
            { question: "Do I need technical skills to use ElevatrX?", answer: "No, it is user-friendly and requires no technical skills." }
        ]
    };
    return (
        <div className=" w-[100%]  bg-[#5E788F]/85 px-[3.3rem] pb-[1.87rem] relative   z-10">

            <div className="innerContainer flex flex-col   gap-4 w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10]  pb-[3rem] px-[7.0625rem]">


                <div className='flex flex-col justify-center items-center'>
                <Heading heading={"FAQ's"}></Heading>
                    <div className="upperContainer w-[100%] gap-3 z-[10] flex flex-col justify-center items-center">
                    
                        <Subheading subHeading={"Got Questions? We've Got Answers!"}/>
                        
                        <Description description={"Explore quick solutions and expert insights on social media automation, content strategy, and analytics to maximize your success with ElevatrX."}/>
                    </div>
                </div>
                <div className='flex items-start gap-10 p-3 rounded-lg bg-white/50'>
                    {
                        Object.keys(faqData).map((category) => (
                            <button key={category} className={`text-sm w-[20%]    p-2 rounded-lg ${activeCategory === category ? "bg-slate-500 text-white  border-2 border-gray-200" : "bg-none text-gray-600"} `}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setOpenAnswer(null);
                                }}>
                                {category}
                            </button>
                        )
                        )
                    }
                </div>

                <div className="">
                    {faqData[activeCategory].map((faq, index) => (
                        <div key={index} className="mb-3">

                            <button
                                className={`w-[100%] flex justify-between items-center text-left p-4 rounded-lg transition-all duration-300
                                    ${openAnswer === index
                                        ? "bg-slate-500 text-white border-none rounded-b-none"
                                        : "bg-white/50 text-[#3F4142]"
                                    }`}
                                onClick={() => setOpenAnswer(openAnswer === index ? null : index)}
                            >
                                {faq.question}
                                <span>{openAnswer === index ? <MdClose />  : <GoPlus />}</span>
                            </button>


                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={openAnswer === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                {openAnswer === index && (
                                    <div className="pb-4 px-4 bg-slate-500 text-white/80 rounded-b-lg ">
                                        {faq.answer}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>




        </div>
    )
}

export default FaqSection
