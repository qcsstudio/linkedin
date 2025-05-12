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
import CloudSection from "../CloudSection/CloudSection";
import CountUp from "react-countup";

const HomePlan = () => {
    const [buttonPlans, setButtonPlans] = useState('Monthly');
    const pricingPlans = [
        {
            title: "Starter",
            price: "$09",
            duration: "user/month",
            cardsHeading: 'Everything in starter plan',
            features: [
                <>Up to <span className="font-montserrat"> &nbsp;5&nbsp;</span> Social Media Accounts</>,
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
                <>Up to<span className="font-montserrat">&nbsp;20&nbsp;</span> Social Media Accounts</>,
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
        <div id='pricing' className="w-[100%]   px-4 lg:px-[3.37rem] md:px-[3.12rem] relative ">
            <CloudSection bottom={0} left={0} opacity={0.7} />
            <div className="innerContainer px-4 md:px-[3.12rem] lg:px-[3.12rem] py-[1.5rem] flex flex-col gap-12 justify-center items-center w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem]  pb-[3rem]  z-20">


                <div>
                    <Heading heading={"Flexible Plans"} />
                    <div className="upperContainer w-[100%] gap-3  flex flex-col justify-center items-center z-20">

                        <Subheading subHeading={" Flexible Pricing for Every Social Media Superhero"} />

                        <Description description={"At ElevatrX, we make social media marketing simple and affordable. Our flexible plans grow with your business—choose yours and streamline your success."} />
                        <div className="flex bg-white p-1 rounded-lg  z-20">
                            <button onClick={() => setButtonPlans('Monthly')} className={`${buttonPlans === 'Monthly' ? "bg-[#5E788F]/40 " : ""} px-2 md:px-4 lg:px-8   text-md md:text-lg lg:text-lg rounded-md text-gray-700 `}>
                                Monthly
                            </button>
                            <button onClick={() => setButtonPlans('yearly')} className={`${buttonPlans === "yearly" ? "bg-[#5E788F]/50 " : ""} px-1 md:px-4 text-lg lg:px-5 text-md md:text-lg flex gap-3 justify-center items-center lg:text-lg rounded-md text-gray-700 py-1 z-20`}>
                                Yearly <span className='text-black text-md p-1 bg-gray-200/40 z-20  rounded-md  '>Save 20%</span>
                            </button>

                        </div>
                    </div>

                </div>






                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 w-full z-20">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`cardContainer relative z-10 flex flex-col gap-5 py-[2.5rem]  bg-white/40 rounded-[1rem]`}
                        >
                            {plan.popular && (
                                <span className="absolute flex items-center justify-center gap-1 top-[9%] left-[20%] bg-[#5E788F] text-white px-3 py-1 text-lg rounded-full z-20">
                                    <AiOutlineFire />
                                    Popular
                                </span>
                            )}
                            <div className="border-b-[3px] px-[1rem]  pb-5 flex flex-col gap-10 border-gray-500 border-dashed z-20">
                                <h3 className="text-md  z-20">
                                    {plan.title}
                                </h3>
                                <div className="flex items-center justify-start gap-2">
                                    <p className=" font-montserrat text-4xl  text-gray-900">
                                        {buttonPlans === "yearly" ? (
                                            <CountUp
                                                start={0}
                                                end={parseFloat(plan.price.replace("$", "")) * 12 * 0.8}
                                                duration={1.5}
                                                prefix="$"
                                            />
                                        ) : (
                                            plan.price
                                        )}
                                    </p>
                                    <p className="text-md font-thin text-gray-500"> {buttonPlans === "yearly" ? "user/year" : plan.duration}</p>
                                </div>

                            </div>

                            <div className=" last-contianer flex flex-col justify-between gap-5 h-full px-[1rem]">

                                <ul className="space-y-3 flex-grow">
                                    <h1 className="font-semibold">{plan.cardsHeading}</h1>
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="text-gray-600 flex items-center">
                                            <TiTick className="font-thin text-lg" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>


                                <Link href='/register'> <button className={`w-full mt-auto ${plan.popular ? "bg-gradient-to-r from-[#5E788F]   to-[#5E788F]/40   " : "bg-gradient-to-r from-[#5E788F]   to-white/50"}  border-1 border-gray-200 text-white py-2 rounded-lg hover:bg-[#B0BAC4]`}>
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

export default HomePlan;