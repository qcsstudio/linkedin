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

const KeyFeatureSection = () => {
const [activeIndex,setActiveIndex]=useState(0)
    
const featureData = [
    {
        title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
        description:
          "Our AI comes up with better post ideas faster than you can decide on your morning coffee order! ",
        details: [
          "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
          "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
          "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
        ],
        benefits: [
          "Saves hours brainstorming content. ",
          "Keeps your brand voice consistent & engaging.",
          "Ensures your content is always trending & relevant.",
        ],
      },
    {
        title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
        description:
          "Our AI comes up with better post ideas faster than you can decide on your morning coffee order! ",
        details: [
          "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
          "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
          "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
        ],
        benefits: [
          "Saves hours brainstorming content. ",
          "Keeps your brand voice consistent & engaging.",
          "Ensures your content is always trending & relevant.",
        ],
      },
    {
        title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
        description:
          "Our AI comes up with better post ideas faster than you can decide on your morning coffee order! ",
        details: [
          "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
          "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
          "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
        ],
        benefits: [
          "Saves hours brainstorming content. ",
          "Keeps your brand voice consistent & engaging.",
          "Ensures your content is always trending & relevant.",
        ],
      },
    {
        title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
        description:
          "Our AI comes up with better post ideas faster than you can decide on your morning coffee order! ",
        details: [
          "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
          "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
          "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
        ],
        benefits: [
          "Saves hours brainstorming content. ",
          "Keeps your brand voice consistent & engaging.",
          "Ensures your content is always trending & relevant.",
        ],
      },
      {
        title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
        description:
          "Our AI comes up with better post ideas faster than you can decide on your morning coffee order! ",
        details: [
          "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
          "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
          "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
        ],
        benefits: [
          "Saves hours brainstorming content. ",
          "Keeps your brand voice consistent & engaging.",
          "Ensures your content is always trending & relevant.",
        ],
      },
      {
        title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
        description:
          "Our AI comes up with better post ideas faster than you can decide on your morning coffee order! ",
        details: [
          "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
          "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
          "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
        ],
        benefits: [
          "Saves hours brainstorming content. ",
          "Keeps your brand voice consistent & engaging.",
          "Ensures your content is always trending & relevant.",
        ],
      },
      {
        title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
        description:
          "Our AI comes up with better post ideas faster than you can decide on your morning coffee order! ",
        details: [
          "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
          "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
          "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
        ],
        benefits: [
          "Saves hours brainstorming content. ",
          "Keeps your brand voice consistent & engaging.",
          "Ensures your content is always trending & relevant.",
        ],
      },
      {
        title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
        description:
          "Our AI comes up with better post ideas faster than you can decide on your morning coffee order! ",
        details: [
          "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
          "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
          "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
        ],
        benefits: [
          "Saves hours brainstorming content. ",
          "Keeps your brand voice consistent & engaging.",
          "Ensures your content is always trending & relevant.",
        ],
      },
      {
        title: "AI-Enhanced Content Creation – Your Personal Content Assistant",
        description:
          "Our AI comes up with better post ideas faster than you can decide on your morning coffee order! ",
        details: [
          "AI-powered caption & post generator – Write compelling captions and post content in seconds.",
          "Trending hashtags & keyword suggestions – Get AI-backed hashtag recommendations to boost visibility.",
          "Content idea inspiration – Never run out of fresh, relevant content ideas for your brand.",
        ],
        benefits: [
          "Saves hours brainstorming content. ",
          "Keeps your brand voice consistent & engaging.",
          "Ensures your content is always trending & relevant.",
        ],
      },
  ];

    return (
        <>
            {/* Main Container */}
            <div className="mainContainer pt-[30px] w-[100%] bg-[#5E788F]/85 px-[3.37rem]">

                {/* Inner Container */}
                <div className="innerContainer bg-[#FFFFFF]/35 w-[100%] rounded-[.5rem] px-[6.7rem] pb-[3.125rem] z-20">

                    {/* Upper Container */}
                    <div className='upperContainer w-[100%] z-20'>
                        <p className="aboutHeading text-[6.25rem] z-20 text-center opacity-30">Key Features</p>
                    </div>

                    {/* Middle Container */}
                    <div className='middleContainer w-[100%] flex flex-col items-center z-20'>
                        <div className=" flex justify-center items-center headingContainer mb-[1rem] z-20">
                            <p className="text-[36px] font-semibold text-center text-[#D8DFE5] z-20 w-[80%]">ElevatrX Features – Automate, Engage, and Dominate Your Social Media</p>
                        </div>
                        <div className="descriptionContainer w-[80%] text-[#D8DFE5] mb-[3.25rem] z-20">
                            <p className="text-[18px] font-[100] text-center z-20">Managing social media shouldn’t feel like a full-time job. ElevatrX automates, optimizes, and simplifies social media management, helping businesses, agencies, and creators save time, boost engagement, and drive real results.</p>
                        </div>
                    </div>

                    {/* Lower Container */}
                    <div className='lowerContainer w-[100%] text-[#D8DFE5] flex justify-between items-center z-20'>

                        <div className='leftSide' >
                            <div className='flex flex-col gap-6'>
                                <h2 className='text-[22px] w-[70%] '>
                                    {featureData[activeIndex].title}
                                </h2>
                                <span className='w-[80%]'>
                                {featureData[activeIndex].description}
                                </span>
                                <h4 className='text-[19px]'>What It Does:</h4>
                                <ul className='flex flex-col gap-2 list-disc'>
                                {featureData[activeIndex].details.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}

                                </ul>
                                <h4>What It Does:</h4>
                                <ul className='flex flex-col gap-2 list-disc'>
                                {featureData[activeIndex].benefits.map((item, index) => (
                  <li key={index}>{item}</li>
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