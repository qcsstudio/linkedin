import Image from "next/image"
import logo from '../../../public/images/registerImages/Logo.png'

const RegisterForm = () => {
    return (
        <>
        <div className=" registerForm flex justify-center items-center w-full ">
        <div className=' hidden md:flex lg:flex justify-center items-center h-screen bg-gradient-to-r from-purple-100 to-blue-200 lg:w-[40%]  '>
    <Image src={logo} height={200} alt='logo' />
</div>
        <div className=" w-full md:w-[60%] lg:w-[60%]  text-black mx-auto">
            <div className="flex bg-gradient-to-r h-screen from-purple-100 to-blue-200 max-w-screen-lg">
                <div className="flex flex-col gap-10 justify-center items-center h-full pl-10 w-[90%]">
                    <div className="container flex flex-col justify-center gap-10 border border-white bg-blue-100/60 rounded-[16px] h-[80%] p-8">
                    <div className="heading items-start">
                        <h1 className="text-[24px] font-bold ">Hi, Register Yourself Here</h1>
                    </div>
                    <div className="inputs  text-black flex flex-col gap-5 w-full">
                        <div className="name flex flex-col lg:flex-row gap-4">

                            <input className=" placeholder:pl-4 h-14 border rounded-lg w-full bg-white/40" type="text" placeholder="First name"/>
                            <input className="h-14 placeholder:pl-4 border rounded-lg w-full bg-white/40" type="text" placeholder="Last name"/>
                        </div>
                        <div className="contact flex flex-col lg:flex-row gap-4 ">
                            <input className="h-14 placeholder:pl-4 border rounded-lg w-full bg-white/40" type="email" placeholder="Email id"/>
                            <div className="phone flex text-center " >
                                <div className=" placeholder:pl-4 label h-14 bg-white w-16 shadow-gray-400 border rounded-lg flex justify-center items-center">
                                    
                                <label className=" " htmlFor="">+91</label>
                                
                                </div> <input className="h-14 placeholder:pl-2 placeholder:text-sm border rounded-tr-lg w-full bg-white/40" type="number" placeholder="Mobile Number" />
                            </div>
                        </div>
                        <input type="text" className="h-14 placeholder:pl-4 border rounded-lg bg-white/40 w-full" placeholder="Create Password" />
                        <div className="button">
                            <button className="w-full h-16 bg-white/40 rounded-[14px]">Sign Up</button>
                        </div>
                    </div>
                    <div className="login flex justify-center items-center">
                        <p>Already Registered, <span className="text-red-500 font-semibold">Log In</span> </p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default RegisterForm