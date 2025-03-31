'use client'
import React from 'react'
import { useState } from 'react';
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

import { motion } from "framer-motion";
import Heading from '../Heading/Heading';
import Subheading from '../Subheading/Subheading'
import Description from '../Description/Description'
import CloudSection from '../CloudSection/CloudSection';



const FaqSection = () => {
    const [activeCategory, setActiveCategory] = useState('General');
    const [openAnswer, setOpenAnswer] = useState(null)
    const faqData = {
        "General": [
            { question: "What is ElevatrX?", answer: "ElevatrX is an AI-powered social media automation tool that helps businesses, agencies, and creators automate content creation, scheduling, analytics, and competitor tracking—saving time and maximizing engagement." },
            { question: "Which social media platforms does ElevatrX support?", answer: "We integrate seamlessly with:\n✔ LinkedIn\n✔ Facebook\n✔ Instagram\n✔ Twitter (X)\n✔ Pinterest\n✔ YouTube\nMore integrations coming soon!" },
            { question: "Can I try ElevatrX for free?", answer: "Absolutely! We offer a 14-day free trial with full access to all features. No credit card is required to sign up." },
            { question: "Who should use ElevatrX?", answer: "ElevatrX is built for:\n- **Social Media Managers** – Automate posts, track engagement, and improve efficiency.\n- **Small Businesses & Startups** – Save time while scaling social media growth.\n- **Agencies** – Manage multiple clients with AI-driven insights.\n- **Creators & Influencers** – Optimize content strategy and maximize reach." },
            { question: "Do I need technical skills to use ElevatrX?", answer: "Not at all! ElevatrX is designed for everyone, from beginners to pros. Our simple dashboard makes automation effortless." }
        ],
        "Features & Capabilities": [
            { question: "Can ElevatrX generate content automatically?", answer: "Yes! Our AI-powered assistant creates captions, hashtags, and post ideas based on trends and audience insights.\n📌 Fun Fact: Our AI writes faster than your morning coffee gets cold! ☕🔥" },
            { question: "How does ElevatrX schedule and post content?", answer: "Our intelligent scheduler automatically posts at the best engagement times, ensuring maximum visibility and audience reach.\n📌 Fun Fact: No more “Oops, I forgot to post today” moments—ElevatrX never misses a schedule! 🎯" },
            { question: "Can I track competitors with ElevatrX?", answer: "Absolutely! Our AI-powered competitor analysis helps you:\n✔ Monitor their engagement & strategies\n✔ Identify trending content\n✔ Benchmark your performance\n📌 Pro Tip: Use competitor insights to outperform and gain an edge in your industry." },
            { question: "Does ElevatrX provide real-time analytics?", answer: "Yes! Our advanced analytics dashboard gives you:\n✔ Engagement trends\n✔ Audience demographics\n✔ Post performance insights\n✔ ROI measurement\n📌 Pro Tip: Make data-driven decisions without crunching numbers manually!" },
            { question: "Can I manage multiple social media accounts?", answer: "Yes! ElevatrX supports multiple account management, allowing agencies and businesses to handle multiple clients or brands from one dashboard.\n📌 Fun Fact: No more logging in and out of different accounts—we make it seamless!" }
        ],
        "Plans, Pricing & Billing": [
            { question: "What pricing plans does ElevatrX offer?", answer: "We have flexible pricing options:\n💡 Starter - $9/month (for small businesses & individuals)\n🚀 Pro - $29/month (for growing businesses & marketers)\n🏆 Agency - $79/month (for agencies & large teams)\n📌 Pro Tip: Annual plans come with exclusive discounts!" },
            { question: "Can I switch or cancel my plan anytime?", answer: "Yes! You can upgrade, downgrade, or cancel anytime—no hidden fees or penalties." },
            { question: "Are there any hidden charges?", answer: "No! ElevatrX has transparent pricing with no hidden costs." },
            { question: "What payment methods do you accept?", answer: "We accept all major credit cards, debit cards, and online payment gateways." },
            { question: "Do you offer refunds?", answer: "We provide a 14-day money-back guarantee on all paid plans. If ElevatrX isn’t for you, cancel anytime within 14 days for a full refund." }
        ],
        "Security & Privacy": [
            { question: "Is ElevatrX GDPR compliant?", answer: "Yes! We adhere strictly to GDPR, CCPA, and other data privacy regulations to keep your information secure." },
            { question: "How secure is my data with ElevatrX?", answer: "We use state-of-the-art encryption and regular security audits to safeguard all user data.\n📌 Fun Fact: We take security more seriously than your bank does! 💼🔐" },
            { question: "What happens to my data if I cancel my account?", answer: "Your data remains secure for 30 days post-cancellation. After that, it is permanently deleted." }
        ],
        "Support & Resources": [
            { question: "What kind of customer support does ElevatrX offer?", answer: "We provide dedicated support via:\n📧 Email Support (All Plans)\n💬 Live Chat Support (Pro & Agency Plans)\n👨‍💼 Dedicated Account Manager (Agency Plan)\n📌 Pro Tip: Got a quick question? Our chatbot provides instant answers 24/7! 🚀" },
            { question: "Where can I find tutorials and guides?", answer: "We have a comprehensive Help Center with:\n📺 Video Tutorials\n📖 Step-by-Step Guides" },
            { question: "Does ElevatrX offer team collaboration features?", answer: "Yes! Our Agency Plan includes multi-user access with custom roles and permissions." },
            { question: "Can ElevatrX remind me of important social media holidays?", answer: "Absolutely! We automatically remind you of major trends and social media events." }
        ],
        "Bonus Fun Facts": [
            { question: "What makes ElevatrX better than other social media tools?", answer: "Unlike others, we blend AI with automation—so you spend less time on social media management and more time growing your brand!" },
            { question: "Can ElevatrX make my posts go viral?", answer: "While we can't promise instant viral fame, our AI-driven strategy helps you create high-impact content that maximizes engagement." },
            { question: "What’s the funniest thing about ElevatrX?", answer: "Our AI never runs out of content ideas—but we’re still working on teaching it how to tell jokes! 😂" }
        ]
    };
    
    return (
        <div id='faq' className="relative w-[100%]  px-4 lg:px-[3.37rem] md:px-[3.12rem]     z-10">
<CloudSection bottom={-20} left={0} opacity={0.7} />
            <div className="innerContainer flex flex-col    gap-4 w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10] px-4 md:px-[3.12rem] lg:px-[3.12rem] py-[1.5rem]">


                <div className='flex flex-col justify-center items-center'>
                <Heading heading={"FAQ's"}></Heading>
                    <div className="upperContainer w-[100%] gap-3 z-[10] flex flex-col justify-center items-center">
                    
                        <Subheading subHeading={"Got Questions? We've Got Answers!"}/>
                        
                        <Description description={"Explore quick solutions and expert insights on social media automation, content strategy, and analytics to maximize your success with ElevatrX."}/>
                    </div>
                </div>
                <div className='flex items-start p-2 rounded-lg bg-white/50 
                overflow-x-auto scrollbar-hide whitespace-nowrap flex-nowrap 
                justify-start
                gap-2 sm:gap-4 md:gap-6 lg:gap-8'>

    {Object.keys(faqData).map((category) => (
        <button 
            key={category} 
            className={`text-xs z-10 lg:text-sm min-w-[10rem] sm:w-auto md:w-auto lg:w-auto 
                        p-2 rounded-lg transition-all duration-300
                        ${activeCategory === category 
                            ? "bg-[#5E788F] text-white border-2 border-gray-200" 
                            : "bg-none text-gray-600"} `}
            onClick={() => {
                setActiveCategory(category);
                setOpenAnswer(null);
            }}
        >
            {category}
        </button>
    ))}
</div>


                <div className="z-10">
                    {faqData[activeCategory].map((faq, index) => (
                        <div key={index} className="mb-3">

                            <button
                                className={`w-[100%] flex text-[.8rem] md:text-[1rem] lg:text-[1rem] justify-between items-center text-left p-4 rounded-lg transition-all duration-300
                                    ${openAnswer === index
                                        ? "bg-slate-500 text-white border-none rounded-b-none"
                                        : "bg-white/50 text-[#3F4142]"
                                    }`}
                                onClick={() => setOpenAnswer(openAnswer === index ? null : index)}
                            >
                                {faq.question}
                                <span>{openAnswer === index ? <IoMdClose strokeWidth={1} className=' text-2xl text-white' />  : <GoPlus strokeWidth={1}  className='text-2xl text-white' />}</span>
                            </button>


                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={openAnswer === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                {openAnswer === index && (
                                    <div className="pb-4 px-4 text-[.8rem] md:text-[1rem] lg:text-[1rem] bg-slate-500 text-white/80 rounded-b-lg ">
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
