"use client"
import Plans from "@/components/HomeComponent/Plans/Plans"
import Link from "next/link";
import { useState } from "react"
import { IoInformationCircleOutline } from "react-icons/io5";

const Subscription = () => {

    const initialData = {
        open:false,
        planType:""
    }

    const [popUp, setPopUp] = useState(initialData)
    const [openRazorPay,setOpenRazorPay] = useState(initialData);
    const [term,setTerm] = useState(false);
    const [error,setError] = useState(false);


    const handleRazorPay = ()=>{
        const tempData = {
            open:true,
            planType:popUp?.planType
        }

        if(term){
            setOpenRazorPay(tempData);
        }else{
            setError("Accept term & conditions");
        }


    }

    const handleCancel = ()=>{
        setPopUp(initialData);
    }

    return (
        <>
            <div className={`mainContainer relative w-[100%] ${popUp?.open ? "h-[100vh]" : "h-[100%]"}   overflow-hidden bg-gradient-to-r from-purple-200 to-blue-300 flex justify-center items-center`}>

                <div className="innerContainer w-[100%] h-[100%] flex justify-center items-center">

                    <Plans setPopUp={setPopUp} popUp={popUp} openRazorPay={openRazorPay} setOpenRazorPay={setOpenRazorPay} />

                </div>

                {popUp.open && <div className="fade bg absolute w-[100%] h-[100vh] bg-[#000000]/50 z-50 flex justify-center items-center">

                    {/* POP up container */}
                    <div className="popUp w-[40%] px-[2rem] py-[2rem] bg-[#ffffff] rounded-[1rem]">

                        {/* Heading container */}
                        <div className="headingContianer w-[100%] flex justify-center items-center">
                            <h3 className="text-center text-[1.5rem] flex items-center"><IoInformationCircleOutline className=" mr-[.5rem] text-[#38bdf8]" />Refund Information</h3>
                        </div>
                        <p className="mt-[1rem] text-justify">As part of the account verification process, a small charge of ₹5 has been applied temporarily. This amount will be automatically refunded to your original payment method within 24 hours — no action is required from your end.</p>

                        {/* Term and conditions section */}
                        <div className="termAndConditions flex items-center gap-2 w-full text-sm mt-[1.5rem]">
                            <div className="relative w-5 h-5">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    value={term}
                                    onChange={(e)=>setTerm(e.target.value)}
                                    className="appearance-none peer w-full h-full border-2 border-gray-300 rounded-md checked:bg-[#38bdf8] checked:border-[#38bdf8] transition-colors cursor-pointer"
                                />
                                <svg
                                    className="absolute top-0.5 left-0.5 w-4 h-4 text-white hidden peer-checked:block pointer-events-none"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-gray-700">
                                I agree to the&nbsp;
                                <Link href="#" className="text-[#38bdf8] underline hover:underline">
                                    Terms & Conditions
                                </Link>
                            </p>
                        </div>

                        {error && <div className="errorContainer">
                            <p className="text-[#df4949]">    
                                {error}
                            </p>
                        </div>}



                        {/* button container */}
                        <div className="buttonContainer w-[100%] flex justify-between mt-[1rem]">
                            <button className="w-[48%] py-[.5rem] rounded-[.7rem] bg-[#f3f3f3]  text-[#111111]" onClick={()=>handleCancel()}>Cancel</button>

                            <button className="w-[48%] py-[.5rem] rounded-[.7rem] bg-[#38bdf8] hover:bg-[#21aeeb] text-[#ffffff]" onClick={()=>handleRazorPay()}>Next</button>

                        </div>
                    </div>
                </div>}

            </div>
        </>
    )
}

export default Subscription