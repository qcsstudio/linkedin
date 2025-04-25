"use client"
import { MultiSelect } from "primereact/multiselect";
import React, { useContext, useRef, useState } from 'react';
import { IoSparkles } from "react-icons/io5";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { generatePassword } from "@/utils/generatePassword";
import { Toast } from 'primereact/toast';
import { userContext } from "@/Context/user.context";
import Loading from "../common/Loading";


const CreateUserForm = () => {
    const toast = useRef(null);

    const { createUser, loading } = useContext(userContext);

    const [selectedCountries, setSelectedCountries] = useState(null);
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
    });
    const [animateIcon, setAnimateIcon] = useState(false);


    // Toast Message
    const show = (popUp) => {
        toast.current.show({ severity: popUp?.severity, summary: popUp?.summary, life: 1000 });
    };



    // MULTI SELECT (Methods)

    const countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    const panelFooterTemplate = () => {
        const length = selectedCountries ? selectedCountries.length : 0;

        return (
            <div className="py-2 px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    };

    const countryTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };


    // Generate Password
    const generateStrongPassword = () => {
        const strongPassword = generatePassword();
        setPassword(strongPassword);
        // show();
        setAnimateIcon(true);
        setTimeout(() => setAnimateIcon(false), 500);
    }

    // Form Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...formData, password, selectedCountries };
        const response = await createUser(data);
        show(response);
    }




    return (
        <>
            {/* main Container */}
            <div className="mainContainer w-[100%] h-[100%] py-[2rem] px-[2rem] flex justify-center items-center z-[30]">
                <Toast ref={toast} position="top-right" />

                {/* Inner Conatiner */}
                <div className="innerContainer w-[100%] h-[100%] bg-[#ffffff]/60 rounded-[1rem] px-[1.5rem] py-[2rem] flex flex-col z-[30]">


                    <p className="heading text-[1.5rem] font-semibold z-[30]">Create User</p>


                    {/* Form */}
                    <form onSubmit={handleSubmit} className="createUserForm w-[100%] h-[100%] mt-[1rem] bg-[#ffffff]/60 px-[1rem] py-[2rem] rounded-[1rem] z-[30] flex flex-col gap-[1.5rem]">

                        {/* Name field */}
                        <div className="nameFields w-[100%] flex justify-between items-center">


                            {/* First Name */}
                            <div className="inputField w-[49%] h-[3rem] flex flex-col justify-center items-center relative">
                                <label htmlFor="firstName" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] `}>First Name</label>

                                <input type="text" value={formData.firstName} onChange={handleChange} name="firstName" id="firstName" className={`border-[.1rem]  px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] `} placeholder="joe" required />

                            </div>
                            {/* Last Name */}
                            <div className="inputField w-[49%] h-[3rem] flex flex-col justify-center items-center relative">
                                <label htmlFor="lastName" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] `}>Last Name</label>

                                <input type="text" value={formData.lastName} onChange={handleChange} name="lastName" id="lastName" className={`border-[.1rem]  px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] `} placeholder="devis" required />

                            </div>
                        </div>

                        {/* Email */}
                        <div className="inputField w-[100%] h-[3rem] flex flex-col justify-center items-center relative">
                            <label htmlFor="email" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] `}>Email</label>

                            <input type="email" value={formData.email} onChange={handleChange} name="email" id="email" className={`border-[.1rem]  px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] `} placeholder="joe@example.com" required />

                        </div>

                        {/* Password */}
                        <div className="passwordDiv flex justify-between">

                            <div className="inputField w-[90%] h-[3rem] flex flex-col justify-center items-center relative">
                                <label htmlFor="password" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] `}>Password</label>

                                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className={`border-[.1rem]  px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] `} placeholder="Password" required />

                            </div>

                            {/* Auto generate password button  */}
                            <div className="autoGeneratePassword w-[8%]  flex justify-center items-center">
                                <button
                                    type="button"
                                    className="w-full h-full rounded-lg border-2 border-gray-200 bg-white px-4 py-2 flex justify-center items-center transition-all ease-in-out duration-150 hover:bg-[#f7f7f7] hover:scale-[0.95]"
                                    onClick={generateStrongPassword}
                                ><IoSparkles className={`text-xl ${animateIcon ? "animate-sparkleGradient" : "text-[black]"}`} /></button>
                            </div>

                        </div>

                        {/* Phone */}
                        <div className="inputField w-[100%] h-[3rem] flex flex-col justify-center items-center relative">
                            <label htmlFor="email" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] `}>Phone</label>

                            <input type="text" inputMode="numeric" maxLength={10} value={formData.phone} onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, ''); 
                                if (numericValue.length <= 10) {
                                    setFormData((prev) => ({ ...prev, phone: numericValue }));
                                }
                            }} name="phone" id="phone" className={`border-[.1rem]  px-[.5rem] py-[.5rem]  outline-none w-[100%] h-[100%] rounded-[.4rem] focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`} placeholder="1234567890" required />

                        </div>


                        {/* role */}
                        <div className="inputField w-[100%] h-[3rem] flex flex-col justify-center items-center relative">
                            <label htmlFor="email" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] `}>Role</label>

                            <select
                                name="role"
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="border px-[.5rem] py-2 outline-none w-full h-full rounded-md"
                                defaultValue=""
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="brand_manager">Brand Manager</option>
                                <option value="content_creator">Content Creator</option>
                                <option value="analyst">Analyst</option>
                                <option value="client_viewer">Client Viewer</option>
                            </select>
                        </div>

                        {/* Brand */}
                        <div className="inputField w-[100%] h-[3rem] flex flex-col justify-center items-center relative">
                            <label htmlFor="email" className={`absolute top-[-.8rem] left-[1rem] bg-[#fff] px-[.5rem] `}>Organizations</label>

                            <MultiSelect value={selectedCountries} options={countries} onChange={(e) => setSelectedCountries(e.value)} optionLabel="name"
                                placeholder="Select Organizations" itemTemplate={countryTemplate} panelFooterTemplate={panelFooterTemplate} className="w-full md:w-20rem border-2 border-gray-200" display="chip" />
                        </div>


                        <div className="buttonContainer w-[100%] flex justify-end">
                            <button disabled={loading} className={` min-w-[6rem] px-[1.5rem] py-[.5rem] ${loading ? "bg-[#b9b9b9] cursor-not-allowed flex justify-center items-center" : "bg-[#21AEEB] hover:bg-[#1d95c9]"} text-[#ffffff] rounded-[.5rem]  hover:scale-[.97] `}>{loading ? <Loading /> : "Create"}</button>
                        </div>





                    </form>

                </div>

            </div>
        </>
    )
}

export default CreateUserForm