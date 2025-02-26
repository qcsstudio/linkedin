import Image from "next/image";
import logo from '../../../public/images/registerImages/Logo.png';

const RegisterForm = () => {
    return (
        <div className="flex min-h-screen text-black">
            {/* Left Section - Logo */}
            <div className="hidden md:flex lg:flex items-center justify-center h-screen bg-gradient-to-r from-purple-100 to-blue-200 lg:w-2/5">
                <Image src={logo} height={200} alt="logo" />
            </div>

            {/* Right Section - Registration Form */}
            <div className="w-full md:w-3/5 lg:w-3/5 bg-gradient-to-r from-purple-100 to-blue-200 flex items-center justify-center">
                <div className="w-full max-w-lg p-8 bg-blue-100/60 rounded-2xl border border-white">
                    {/* Heading */}
                    <div className="mb-10">
                        <h1 className="text-2xl font-bold">Hi, Register Yourself Here</h1>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-6">
                        {/* Name Fields */}
                        <div className="flex flex-col lg:flex-row gap-4">
                            <input
                                className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500"
                                type="text"
                                placeholder="First name"
                            />
                            <input
                                className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500"
                                type="text"
                                placeholder="Last name"
                            />
                        </div>

                        {/* Contact Fields */}
                        <div className="flex flex-col lg:flex-row gap-4">
                            <input
                                className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500"
                                type="email"
                                placeholder="Email id"
                            />
                            <div className="flex w-full">
                                <div className="h-14 w-16 flex items-center justify-center bg-white border rounded-lg shadow-sm">
                                    <label className="text-gray-700">+91</label>
                                </div>
                                <input
                                    className="w-full h-14 px-4 border rounded-r-lg bg-white/40 placeholder-gray-500 placeholder:text-sm"
                                    type="number"
                                    placeholder="Mobile Number"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <input
                            className="w-full h-14 px-4 border rounded-lg bg-white/40 placeholder-gray-500"
                            type="password"
                            placeholder="Create Password"
                        />

                        {/* Sign Up Button */}
                        <button className="w-full h-16 bg-white/40 rounded-xl hover:bg-white/60 transition-colors">
                            Sign Up
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p>
                            Already Registered?{" "}
                            <span className="text-red-500 font-semibold cursor-pointer">Log In</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;