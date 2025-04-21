"use client"
import { uiContext } from "@/Context/ui.context";
import { useContext, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { userContext } from "@/Context/user.context";

const EmailChangePopUp = () => {

    // useContext's ================================================
    const { openEmailPopUp, setEmailOpenPopUp, emailOtpCorrect, setEmailOtpCorrect, emailOtpError, setEmailOtpError , emailChange, setEmailChange,firstName, setFirstName, lastName, setLastName, email, setEmail, phone, setPhone,editMode,setEditMode ,avatar } = useContext(uiContext);

    const {verifyPassword, generateOTP,verifyGeneratedOTP,updateUserInfo } = useContext(userContext);

    // useState's ================================================
    const [seconds, setSeconds] = useState(29);
    const [otpData, setOtpData] = useState("");

    const [passwordData,setPasswordData] = useState("");
    const [passwordDataCorrect,setPasswordDataCorrect] = useState(false);
    const [showOtpFields,setShowOtpFields] = useState(false);

    // useEffect =================================================
    useEffect(() => {
        if (seconds > 1) {
            const interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [seconds]);


    // Method's =================================================

    // Handle PopUp close
    const handlePopClose = () => {
        setEmailOpenPopUp(false);
    }

    // handle Otp Resend Timer
    const handleOtpResendTimer = () => {
        if (seconds == 1) {
            setSeconds(29);
            getOTP();
        }
    }

    // Handle Verify Password
    const handleVerifyPassword = async(e) =>{
        e.preventDefault();
        const password = passwordData;
        const result = await verifyPassword({password});
        if(result){
            setPasswordDataCorrect(true);
            if(emailChange?.change){
                setShowOtpFields(true);
                await generateOTP({email:emailChange?.email});
            }else{
                setEmailOpenPopUp(false);
                const result = await updateUserInfo({firstName,lastName,phone,avatar});
                if(result){
                    setEmailOpenPopUp(false);
                    setEditMode(false);
                }
            }
        }else{
            setPasswordDataCorrect(false);
        }
    }

    // Handle otp verification
    const handleVerifyOtp = async(e)=>{
        e.preventDefault();
        const email = emailChange.email;
        const OTP = otpData;
        const result = await verifyGeneratedOTP({email,OTP});
        if(result){

            const response = await updateUserInfo({firstName,lastName,phone,email,avatar});
            if(response){
                setEmailOpenPopUp(false);
                setEditMode(false);
                            // setEmailOtpCorrect(true);
            }
        }else{
            setEmailOtpCorrect(false);
        }
    }

    return (
        <>
            <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-[#111]/70 overflow-hidden z-[120] flex justify-center items-center">

                <div className="popUp w-[40%] px-[2rem] py-[2rem] rounded-[1rem] bg-[#fff] flex flex-col items-center">

                    {/* Close Tab */}
                    <div className={`closeTab flex  justify-end w-[100%]`}>

                        <IoCloseSharp className="text-[#747474] hover:text-[#ff6363] transform ease-in-out transition-all cursor-pointer text-[1.5rem]" onClick={handlePopClose} />
                    </div>

                    <div className="headingContainer my-[1rem]">
                        <p className="heading text-center text-[1.5rem] font-medium ">Verify Account</p>
                    </div>

                    {/* PASSWORD FORM */}
                    {!passwordDataCorrect && <form onSubmit={handleVerifyPassword} className="w-[100%] flex flex-col items-center gap-[1.5rem]">

                        <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                            <label htmlFor="otp" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] ${emailOtpError ? "text-[#fb4f4f]" : "text-[#111]"}`}>Enter Password</label>

                            <input type="password" value={passwordData} onChange={(e) => setPasswordData(e.target.value)} name="otp" id="otp" className={`border-[.1rem] ${emailOtpError ? "border-[#fb4f4f] focus:border-[#fb4f4f] " : "border-[#747474] focus:border-[#843af3]"} px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] `} placeholder="******" required/>
                            {emailOtpError && <div className="w-[100%] ">
                                <p className="text-[.8rem] text-[#fb4f4f] ml-[.2rem]">{emailOtpError && emailOtpError}</p>
                            </div>}
                        </div>

                        

                        <div className={`buttonTab flex justify-end w-[95%] items-center`}>
                            <button className="px-[1rem] py-[.5rem] bg-[#843af3] hover:bg-[#6e25db] rounded-[.5rem] text-[#fff]">Verify</button>
                        </div>

                    </form>}
                    
                    {/* OTP FORM */}
                    {showOtpFields && <form onSubmit={handleVerifyOtp} className="w-[100%] flex flex-col items-center gap-[1.5rem]">

                        {/* otp Field */}
                        {!emailOtpCorrect && <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                            <label htmlFor="otp" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] ${emailOtpError ? "text-[#fb4f4f]" : "text-[#111]"}`}>Enter OTP</label>

                            <input type="text" value={otpData} onChange={(e) => setOtpData(e.target.value)} name="otp" id="otp" className={`border-[.1rem] ${emailOtpError ? "border-[#fb4f4f] focus:border-[#fb4f4f] " : "border-[#747474] focus:border-[#843af3]"} px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] `} placeholder="******" />
                            {emailOtpError && <div className="w-[100%] ">
                                <p className="text-[.8rem] text-[#fb4f4f] ml-[.2rem]">{emailOtpError && emailOtpError}</p>
                            </div>}
                        </div>}

                        {!emailOtpCorrect && <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                            <p className={`text-[.8rem] ${seconds == 1 ? " text-[#595959] hover:text-[#843af3] hover:underline" : "text-[#969696]"} ml-[.2rem] cursor-pointer`} onClick={handleOtpResendTimer}>Resend {seconds > 1 && seconds}</p>
                        </div>}

                        
                        <div className={`buttonTab flex justify-end w-[95%] items-center`}>
                            <button className="px-[1rem] py-[.5rem] bg-[#843af3] hover:bg-[#6e25db] rounded-[.5rem] text-[#fff]">Verify</button>
                        </div>

                    </form>}

                    

                </div>

            </div>
        </>
    )
}

export default EmailChangePopUp