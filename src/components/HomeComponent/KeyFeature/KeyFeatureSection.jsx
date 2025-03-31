'use client'
import Image from 'next/image'
import React, { useState } from 'react'
// Images Import ---------------------------------------------
import logo from "../../../../public/images/integrationImages/logo.svg"
import instagram from "../../../../public/images/integrationImages/instagram.svg"
import linkedin from "../../../../public/images/integrationImages/linkedin.svg"
import facebook from "../../../../public/images/integrationImages/facebook.svg"
import pintrest from "../../../../public/images/integrationImages/pintrest.svg"
import youtube from "../../../../public/images/integrationImages/youtube.svg"
import x from "../../../../public/images/integrationImages/x.svg"
import leftLine from "../../../../public/images/integrationImages/left.png"
import rightLine from "../../../../public/images/integrationImages/right.png"
import KeyFeatureCarousel from './KeyFeatureCarousel'
import Heading from '../Heading/Heading'
import Subheading from '../Subheading/Subheading'
import Description from '../Description/Description'
import Multiplatform from '../../../../public/images/homeImages/Multi-platform.png'
import AIOptimize from '../../../../public/images/homeImages/AI-Optimized.png'
import AIEnhanced from '../../../../public/images/homeImages/AI-Enhanced.png'
import AdvancedAnalytics from '../../../../public/images/homeImages/Advanced-Analytics.png'
import AIdriven from '../../../../public/images/homeImages/AI-driven.png'
import teamCollab from '../../../../public/images/homeImages/teamCollab.png'
import security from '../../../../public/images/homeImages/security.png'
import AiPowered from '../../../../public/images/homeImages/Ai-Powered.png'
import Hashtags from '../../../../public/images/homeImages/Hashtags.png'





const KeyFeatureSection = () => {
const [activeIndex,setActiveIndex]=useState(0)
    
const featureData = [
  {
    title: "AI-Optimized Scheduling & Auto-Posting – The Set & Forget Method",
    description:
      "  With ElevatrX, your posts are always on time—unlike that friend who’s “5 minutes away” but still at home!",
    details: [
      "AI determines the best posting times for maximum engagement.",
      "Drag-and-drop content calendar makes planning effortless.",
      "Cross-platform auto-posting to LinkedIn, Instagram, Facebook, Twitter, YouTube, Pinterest, and TikTok.",
      "Evergreen content recycling ensures your best posts get seen again.",
    ],
    benefits: [
      "More reach, less effort.",
      "Eliminates manual posting.",
      "Maximizes engagement automatically.",
    ],
    Image:AIOptimize,
  },
  {
    title: "Advanced Analytics & Real-Time Performance Insights – Know What Works",
    description:
      "  Our AI analytics know your audience better than your best friend!",
    details: [
      "Real-time post engagement tracking – See likes, shares, clicks & interactions in one dashboard.",
      "Audience growth & behavior analysis – Understand who’s engaging and why.",
      "Competitor benchmarking – Track how you stack up against the competition.",
      "Custom performance reports – Share beautifully designed, AI-generated reports with your team or clients.",
    ],
    benefits: [
      "Stop guessing. Start optimizing.",
      "Data-driven strategy without spreadsheets.",
      "Helps you fine-tune your content & ad strategy.",
    ],
    Image:AdvancedAnalytics,
  },
  {
    title: "Multi-Platform Management – One Dashboard to Rule Them All",
    description:
      "  Juggling multiple accounts is now easier than switching between TV shows on Netflix!",
    details: [
      "Connects multiple social accounts – Manage LinkedIn, Facebook, Instagram, Twitter, Pinterest, TikTok, and YouTube in one place.",
      "Auto-formatting for each platform – Tailors content to fit platform-specific best practices.",
      "Bulk upload & schedule – Queue up months of content in one session.",
    ],
    benefits: [
      "Saves time by managing everything in one place.",
      "Keeps brand messaging consistent across platforms.",
      "Eliminates repetitive posting tasks.",
    ],
    Image:Multiplatform,
  },
  {
    title: "AI-Driven Competitor Tracking – Stay Ahead of the Game",
    description:
      "  We track competitors so well, you might think we have a social media crystal ball!",
    details: [
      "Monitor competitor engagement & trends.",
      "See what’s working for them & adapt.",
      "AI-powered competitor insights & recommendations.",
    ],
    benefits: [
      "Find out what works before your competitors do.",
      "Spot trends early & adapt faster.",
      "Benchmark against top brands & influencers.",
    ],
    Image:AIdriven,
  },
  {
    title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
    description:
      "  Our AI comes up with better post ideas faster than you can decide on your morning coffee order!",
    details: [
      "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
      "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
      "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
    ],
    benefits: [
      "Saves hours brainstorming content.",
      "Keeps your brand voice consistent & engaging.",
      "Ensures your content is always trending & relevant.",
    ],
    Image:AIEnhanced,
  },
  {
    title: "AI-Powered Engagement & Auto-Replies – Never Miss a Comment Again",
    description:
      "  ElevatrX responds to comments faster than your crush does!",
    details: [
      "Auto-respond to comments, messages & DMs with AI-generated smart replies.",
      "Suggests personalized responses to keep interactions authentic.",
      "Saves time with auto-reply templates for common queries.",
    ],
    benefits: [
      "Boosts engagement effortlessly.",
      "Makes social media feel more personal.",
      "Saves hours responding to repetitive messages.",
    ],
    Image:AiPowered,
  },
  {
    title: "AI-Powered Hashtag & Trend Suggestions – Get More Reach",
    description:
      "  We know what’s trending before your cool Gen Z cousin does!",
    details: [
      "Smart AI picks the most viral hashtags.",
      "Gives real-time insights into trending topics.",
      "Helps you create buzzworthy content before it’s mainstream.",
    ],
    benefits: [
      "Increases organic reach & visibility.",
      "Boosts chances of viral content.",
      "Keeps content fresh & up-to-date.",
    ],
    Image:Hashtags,
  },
  {
    title: "Team Collaboration & Custom User Roles – Work Smarter Together",
    description:
      "  Finally, a tool that keeps your social media team on the same page!",
    details: [
      "Multi-user access with custom roles & permissions.",
      "Approval workflows to keep content quality high.",
      "Seamless team collaboration on content creation & strategy.",
    ],
    benefits: [
      "Perfect for agencies & big teams.",
      "Keeps social media workflows smooth.",
      "Ensures quality control before posting.",
    ],
    Image:teamCollab,
  },
  {
    title: "Security & Compliance – Your Data is Safe with Us",
    description:
      "  We protect your data like it’s the recipe for the best chocolate chip cookies!",
    details: [
      "GDPR-compliant data security.",
      "End-to-end encryption to protect sensitive information.",
      "Automated compliance reports for business accounts.",
    ],
    benefits: [
      "Keeps sensitive data safe.",
      "Complies with global privacy laws.",
      "Protects your brand reputation.",
    ],
    Image:security,
  },
];

    return (
        <>
            {/* Main Container */}
            <div id='features' className="mainContainer  w-[100%]  px-4 lg:px-[3.37rem] md:px-[3.12rem]">

                {/* Inner Container */}
                <div className="innerContainer bg-[#FFFFFF]/35 w-[100%] rounded-[.5rem] px-4 md:px-[3.12rem] lg:px-[3.12rem] py-[1.5rem] z-20">

                    {/* Upper Container */}
                    <Heading heading={"Key Features"}/>

                    {/* Middle Container */}
                    <div className='middleContainer w-[100%] flex flex-col items-center z-20'>
                        
                        <Subheading subHeading={"ElevatrX Features – Automate, Engage, and Dominate Your Social Media"}/>
                        
                        <Description description={"Managing social media shouldn’t feel like a full-time job. ElevatrX automates, optimizes, and simplifies social media management, helping businesses, agencies, and creators save time, boost engagement, and drive real results."}/>
            </div>

                    {/* Lower Container */}
                    <div className='lowerContainer gap-2 w-[100%] flex flex-col-reverse md:flex-col-reverse lg:flex-row justify-between items-center z-20'>

                        <div className='leftSide' >
                            <div className='flex flex-col gap-2 md:gap-6 lg:gap-6'>
                                <h2 className='text-[1rem] md:text-[1.5rem] lg:text-[1.5rem] md:w-[100%] lg:w-[70%] font-bold  text-[#0E1C29] '>
                                    {featureData[activeIndex].title}
                                </h2>
                                <span className='w-[80%] text-sm text-[#0E1C29]'>
                                {featureData[activeIndex].description}
                                </span>
                                <h4 className='text-md md:text-lg lg:text-lg font-bold text-[#0E1C29]'>What It Does:</h4>
                                <ul className='flex flex-col px-2 gap-2 list-disc'>
                                {featureData[activeIndex].details.map((item, index) => (
                  <li className='text-[#212121]  text-[.8rem] md:text-[1rem] lg:text-[1rem]' key={index}>{item}</li>
                ))}

                                </ul>
                                <h4 className='text-[#0E1C29] text-md md:text-lg lg:text-lg font-bold'>Why It Matters:</h4>
                                <ul className='flex flex-col gap-2 px-2 list-disc'>
                                {featureData[activeIndex].benefits.map((item, index) => (
                  <li className='text-[#212121]  text-[.8rem] md:text-[1rem] lg:text-[1rem]' key={index}>{item}</li>
                ))}

                                </ul>
                            </div>
                        </div>
                        <div className='rightSide'>
                            <KeyFeatureCarousel featureData={featureData} activeindex={activeIndex} setActiveIndex={setActiveIndex}    />
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default KeyFeatureSection