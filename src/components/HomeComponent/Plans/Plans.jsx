'use client'
import { TiTick } from "react-icons/ti";
import Image from "next/image";
import cloud from '../../../../public/images/homeImages/cloud.png'
import Heading from "../Heading/Heading";
import Subheading from '../Subheading/Subheading'
import Description from '../Description/Description'
import Link from "next/link";
import { AiOutlineFire } from "react-icons/ai";
import { useState } from "react";




const Plans = () => {
    const [buttonPlans,setButtonPlans]=useState('Monthly');
    const pricingPlans = [
        {
            title: "Starter",
            price: "$09",
            duration: "user/month",
            cardsHeading: 'Everything in starter plan',
            features: [
                "Up to 5 Social Media Accounts",
                "AI Content Generation",
                "Automated Scheduling",
                "Basic Analytics",
                "Email Support",
            ],
        },
        {
            title: "Pro",
            price: "$29",
            duration: "user/month",
            popular: true,
            cardsHeading: 'Everything in Pro plan',
            features: [
                "Up to 20 Social Media Accounts",
                "Advanced Engagement Analytics",
                "Competitor Tracking & Insights",
                "Unlimited Scheduling & Auto-Posting",
                "Content Library & Curation",
                "Priority Email & Live Chat Support",
            ],
        },
        {
            title: "Agency",
            price: "$79",
            duration: "user/month",
            cardsHeading: 'Everything in Agency plan',
            features: [
                "Unlimited Social Media Accounts",
                "Advanced Team Management & Collaboration",
                "Customizable User Roles & Permissions",
                "Comprehensive Reporting & Analytics",
                "White-Label Reports & Branded Content",
                "Dedicated Account Manager",
                "Premium Priority Support",
                "Early Access to Exclusive Beta Features",
            ],
        },
    ];

    return (
        <div id='pricing' className="w-[100%]   px-[3.3rem] relative ">
            <div className="cloudContainer h-full w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] ">
                <Image src={cloud} alt="cloud" className="w-full h-[100%] imageDrag" />
            </div>
            <div className="innerContainer flex flex-col gap-12 justify-center items-center w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem]  pb-[3rem] px-[7.0625rem] z-20">


                <div>
                    <Heading heading={"Flexible Plans"}/>
                    <div className="upperContainer w-[100%] gap-3  flex flex-col justify-center items-center z-20">
                        
                        <Subheading subHeading={" Flexible Pricing for Every Social Media Superhero"}/>
                        
                        <Description description={"At ElevatrX, we make social media marketing simple and affordable. Our flexible plans grow with your business—choose yours and streamline your success."}/>
                        <div className="flex bg-white p-2 rounded-lg  z-20">
                            <button onClick={()=>setButtonPlans('Monthly')}  className={`${buttonPlans==='Monthly'?"bg-[#5E788F]/50 ":""} px-4 py-2    text-xl rounded-md text-gray-700 `}>
                                Monthly
                            </button>
                            <button onClick={()=>setButtonPlans('yearly')} className={`${buttonPlans==="yearly"?"bg-[#5E788F]/50 ":""}px-4 text-xl rounded-md text-gray-700 py-2 z-20`}>
                                Yearly <span className='text-black z-20'>Save 20%</span>
                            </button>

                        </div>
                    </div>

                </div>






                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-20">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`cardContainer relative z-10 flex flex-col gap-5 py-[2.5rem]  bg-white/40 rounded-[1rem]  ${plan.popular ? "border-2 " : ""
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute flex items-center justify-center gap-1 top-10 left-32 bg-[#5E788F] text-white px-3 py-1 text-lg rounded-full z-20">
                                  <AiOutlineFire />
                                  Popular
                                </span>
                            )}
                            <div className="border-b-[3px] px-[1.8rem] pb-5 flex flex-col gap-5 border-gray-500 border-dashed z-20">
                                <h3 className="text-md font-thin text-gray-800 z-20">
                                    {plan.title}
                                </h3>
                                <div className="flex items-center justify-start gap-2">
                                    <p className="text-5xl font-bold text-gray-900">
                                    {buttonPlans === "yearly"
        ? `$${(parseFloat(plan.price.replace("$", "")) * 12 * 0.8).toFixed(0)}`
        : plan.price}
                                        </p>
                                    <p className="text-md font-thin text-gray-500"> {buttonPlans === "yearly" ? "user/year" : plan.duration}</p>
                                </div>

                            </div>

                            <div className=" last-contianer flex flex-col justify-between gap-5 h-full px-[1.8rem]">

                                <ul className="space-y-3 flex-grow">
                                    <h1 className="font-semibold">{plan.cardsHeading}</h1>
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="text-gray-600 flex items-center">
                                            <TiTick className="font-thin text-lg" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>


                              <Link href='/register'> <button className={`w-full mt-auto ${plan.popular?"bg-[#5E788F]":"bg-gradient-to-r from-[#5E788F]   to-white/50"}  border-2 border-gray-200 text-white py-2 rounded-lg hover:bg-[#B0BAC4]`}>
                                    Start 14 Day Free Trial
                                </button></Link> 
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Plans;