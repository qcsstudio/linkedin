import { TiTick } from "react-icons/ti";
import Image from "next/image";
import cloud from '../../../../public/images/homeImages/cloud.png'




const Plans = () => {
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
        <div className=" w-[100%]  bg-[#5E788F]/85 px-[3.3rem] py-[1.87rem] relative z-[10]">
            <div className="cloudContainer h-full w-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1] ">
                <Image src={cloud} alt="cloud" className="w-full h-[100%] imageDrag" />
            </div>
            <div className="innerContainer flex flex-col gap-12 justify-center items-center w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10]  pb-[3rem] px-[7.0625rem]">


                <div>
                    <p className="aboutHeading text-[6.25rem] text-center opacity-30">
                        Flexible Plans
                    </p>
                    <div className="upperContainer w-[100%] gap-3 z-[10] flex flex-col justify-center items-center">
                        <p className="text-[3rem] font-semibold text-center text-white/50">
                            Flexible Pricing for Every Social Media Superhero
                        </p>
                        <p className="text-white/50 text-xl text-center max-w-6xl leading-8">At ElevatrX, we make social media marketing simple and affordable. Our flexible plans grow with your business—choose yours and streamline your success.</p>
                        <div className="flex bg-white p-2 rounded-lg space-x-10">
                            <button className="px-4 py-2 bg-[#5E788F]/20  border text-xl rounded-md text-gray-700 hover:bg-gray-200">
                                Monthly
                            </button>
                            <button className="px-4 text-xl text-gray-500 py-2">
                                Yearly <span className='text-black'>Save 20%</span>
                            </button>

                        </div>
                    </div>

                </div>






                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full ">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`cardContainer relative z-10 flex flex-col gap-5 py-[2.5rem]  bg-white/40 rounded-[1rem]  ${plan.popular ? "border-2 " : ""
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute top-10 left-32 bg-gray-500/50 text-white px-3 py-1 text-lg rounded-full">
                                    Popular
                                </span>
                            )}
                            <div className="border-b-[3px] px-[1.8rem] pb-5 flex flex-col gap-5 border-gray-500 border-dashed">
                                <h3 className="text-md font-thin text-gray-800 ">
                                    {plan.title}
                                </h3>
                                <div className="flex items-center justify-start gap-2">
                                    <p className="text-5xl font-bold text-gray-900">{plan.price}</p>
                                    <p className="text-md font-thin text-gray-500">{plan.duration}</p>
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


                                <button className="w-full mt-auto bg-gradient-to-r from-gray-800/40   to-white/50 border-2 border-gray-200 text-white py-2 rounded-lg hover:bg-[#B0BAC4]">
                                    Start 14 Day Free Trial
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Plans;