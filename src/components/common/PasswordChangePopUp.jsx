import { uiContext } from "@/Context/ui.context";
import { useContext, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { userContext } from "@/Context/user.context";

const PasswordChangePopUp = () => {

    // Context ===================================================
    const { openPopUp, setOpenPopUp, setOtpCorrect, otpCorrect, otpError, setOtpError } = useContext(uiContext);
    const { changePassword , getOTP , verifyOTP , forgetPasswordCall } = useContext(userContext);



    // useState's ================================================
    const [forgetPassword, setForgetPassword] = useState(false);
    const [seconds, setSeconds] = useState(29);

    // Change Password State's
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const [changePasswordMessage,setChangePasswordMessage] = useState({
        message:"",
        success:null
    });

    // Forget Password State's
    const [otpData,setOtpData] = useState("");

    // useEffect =================================================
    useEffect(() => {
        if (seconds > 1 && forgetPassword == true) {
            const interval = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval); // clear on unmount or update
        }
    }, [seconds,forgetPassword]);

    // Method's ===================================================

    // PopUp close
    const handlePopClose = () => {
        setOpenPopUp(false);
    }

    // Go to Forget Password
    const toogleForgetPassword = () => {
        setForgetPassword(true);
        setChangePasswordMessage({
            message:"",
            success:null
        })
        getOTP();

    }

    // Go back from Forget Password 
    const handleForgetBack = () => {
        setForgetPassword(false);
        setOtpError(false);
        setOtpCorrect(false);
        setSeconds(29);
        setOtpData("");
        setChangePasswordMessage({
            message:"",
            success:null
        })
    }
    // handle Forget Password form 
    const handleForgetPassword = async (e) => {
        e.preventDefault();

        if(otpCorrect){
            if(confirmPassword != newPassword){
                const obj = {
                    message:"New Password & Confirm Password are Not same",
                    success:false
                }
                setChangePasswordMessage(obj);
                return;
            }else{
                const result = await forgetPasswordCall({newPassword,confirmPassword});
    
                if(result.success === true){
                    setOpenPopUp(false);
                }
    
                setChangePasswordMessage(result);
            }
            
        }else{
            const OTP = otpData;
            const result = await verifyOTP({OTP});
            setOtpError(result?.message);
            setOtpCorrect(result?.success);
        }
    }

    // handle Otp Resend Timer
    const handleOtpResendTimer = ()=>{
        if(seconds == 1){
            setSeconds(29);
            getOTP();
        }
    }

    // handleChangePassword ------------------
    const handleChangePassword = async(e)=>{
        e.preventDefault();

        if(confirmPassword != newPassword){
            const obj = {
                message:"New Password & Confirm Password are Not same",
                success:false
            }
            setChangePasswordMessage(obj);
            return;
        }else{
            const result = await changePassword({oldPassword,newPassword,confirmPassword});

            if(result.success === true){
                setOpenPopUp(false);
            }

            setChangePasswordMessage(result);
        }
    }

    return (
        // Fade Container
        <div className="absolute top-0 left-0 w-[100vw] h-[100vh] bg-[#111]/70 overflow-hidden z-[120] flex justify-center items-center">

            <div className="popUp w-[40%] px-[2rem] py-[2rem] rounded-[1rem] bg-[#fff] flex flex-col items-center">

                {/* Close Tab */}
                <div className={`closeTab flex ${forgetPassword ? "justify-between" : "justify-end"} w-[100%]`}>
                    {forgetPassword && <FaArrowLeft className="text-[#747474] transform ease-in-out transition-all cursor-pointer text-[1.2rem]" onClick={handleForgetBack} />}

                    <IoCloseSharp className="text-[#747474] hover:text-[#ff6363] transform ease-in-out transition-all cursor-pointer text-[1.5rem]" onClick={handlePopClose} />
                </div>

                <div className="headingContainer my-[1rem]">
                    <p className="heading text-center text-[1.5rem] font-medium ">{forgetPassword ? "Forget Password" : "Change Password"}</p>
                </div>

                {/* Input Fields */}
                {!forgetPassword && <form onSubmit={handleChangePassword} className="inputForm w-[100%] flex flex-col items-center mt-[.5rem] gap-[1.5rem]">

                    {/* Old password Field */}
                    <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                        <label htmlFor="oldPassword" className="absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem]">Old Password</label>
                        <input type="text" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} name="oldPassword" id="oldPassword" className="border-[.1rem] border-[#747474] focus:border-[#843af3] px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] " placeholder="******" required />
                    </div>

                    {/* New password Field */}
                    <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                        <label htmlFor="oldPassword" className="absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem]">New Password</label>
                        <input type="text" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} name="oldPassword" id="oldPassword" className="border-[.1rem] border-[#747474] focus:border-[#843af3] px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] " placeholder="******" required />
                    </div>

                    {/* Confirm password Field */}
                    <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                        <label htmlFor="oldPassword" className="absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem]">Confirm Password</label>
                        <input type="text" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} name="oldPassword" id="oldPassword" className="border-[.1rem] border-[#747474] focus:border-[#843af3] px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] " placeholder="******" required />
                    </div>

                    {changePasswordMessage && <div>
                        <p className={`${changePasswordMessage.success ? "text-[#58ff58] " : "text-[#ff6363]"} text-[.9rem] `}>{changePasswordMessage && changePasswordMessage.message}</p>    
                    </div>}

                    <div className={`buttonTab flex ${forgetPassword ? "justify-end" : "justify-between"} w-[95%] items-center`}>
                        {!forgetPassword && <p className="forgetPassword text-[#843af3] cursor-pointer hover:underline" onClick={toogleForgetPassword}>Forget Password</p>}
                        <button className="px-[1rem] py-[.5rem] bg-[#843af3] hover:bg-[#6e25db] rounded-[.5rem] text-[#fff]">Change Password</button>
                    </div>

                </form>
                }

                {/* Input Fields */}
                {forgetPassword && <form onSubmit={handleForgetPassword} className="inputForm w-[100%] flex flex-col items-center mt-[.5rem] gap-[1.5rem]">

                    {/* Old password Field */}
                    {!otpCorrect && <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                        <label htmlFor="otp" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] ${otpError ? "text-[#fb4f4f]" : "text-[#111]"}`}>Enter OTP</label>

                        <input type="text" value={otpData} onChange={(e)=>setOtpData(e.target.value)} name="otp" id="otp" className={`border-[.1rem] ${otpError ? "border-[#fb4f4f] focus:border-[#fb4f4f] " : "border-[#747474] focus:border-[#843af3]"} px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] `} placeholder="******" />
                        {otpError && <div className="w-[100%] ">
                            <p className="text-[.8rem] text-[#fb4f4f] ml-[.2rem]">{otpError && otpError}</p>
                        </div>}
                    </div>}
                    
                    {!otpCorrect && <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                        <p className={`text-[.8rem] ${seconds == 1 ? " text-[#595959] hover:text-[#843af3] hover:underline" : "text-[#969696]" } ml-[.2rem] cursor-pointer`} onClick={handleOtpResendTimer}>Resend {seconds > 1 && seconds}</p>
                    </div>}





                    {/* New password Field */}
                    {otpCorrect && <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                        <label htmlFor="newPassword" className="absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem]">New Password</label>
                        <input type="text" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} name="newPassword" id="newPassword" className="border-[.1rem] border-[#747474] focus:border-[#843af3] px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] " placeholder="******" />
                    </div>}

                    {/* Confirm password Field */}
                    {otpCorrect && <div className="inputField w-[95%] h-[100%] flex flex-col relative">
                        <label htmlFor="oldPassword" className="absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem]">Confirm Password</label>
                        <input type="text" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  name="oldPassword" id="oldPassword" className="border-[.1rem] border-[#747474] focus:border-[#843af3] px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] " placeholder="******" />
                    </div>}

                    {changePasswordMessage && <div>
                        <p className={`${changePasswordMessage.success ? "text-[#58ff58] " : "text-[#ff6363]"} text-[.9rem] `}>{changePasswordMessage && changePasswordMessage.message}</p>    
                    </div>}

                    <div className={`buttonTab flex ${forgetPassword ? "justify-end" : "justify-between"} w-[95%] items-center`}>
                        {!forgetPassword && <p className="forgetPassword text-[#843af3] cursor-pointer hover:underline" >Forget Password</p>}
                        <button className="px-[1rem] py-[.5rem] bg-[#843af3] hover:bg-[#6e25db] rounded-[.5rem] text-[#fff]">{otpCorrect ? "Change Password" : "Verify"}</button>
                    </div>

                </form>
                }

            </div>

        </div>
    )
}

export default PasswordChangePopUp