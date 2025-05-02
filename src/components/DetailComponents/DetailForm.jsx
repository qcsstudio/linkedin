"use client"
import { useContext, useRef, useState } from "react";
import Loading from "@/components/common/Loading"
import { userContext } from "@/Context/user.context";
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useRouter } from "next/navigation";

const DetailForm = () => {
    const toast = useRef(null);
    const router = useRouter()

    const {createClient,loading} = useContext(userContext);

    const [formData,setFormData] = useState({
        clientName:"",
        clientDomain:"",
    });

    const show = (popUp) => {
        toast.current.show({ severity: popUp?.severity, summary: popUp?.summary, life: 1000 });
    };


    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData(prev=>({...prev,[name]:value}));
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const result = await createClient(formData);
        if(result?.severity === "success"){
            setFormData({
                clientName:"",
                clientDomain:"",
            });
            router.push("/dashboard");

        }
        show(result);
    }
    

    // const loading = false;
    return (
        <>
            <div className="mainContainer w-[100%] h-[100vh] bg-gradient-to-r from-purple-200 to-blue-300">
            <Toast ref={toast} position="top-right" />
                <div className="innerContainer w-[100%] h-[100%] flex justify-center items-center">

                    <form onSubmit={handleSubmit} className="detailForm w-[40%] bg-[#fff]/30 rounded-[1rem] px-[1rem] py-[1rem] flex gap-[1rem] flex-col">

                        <div className="headingContainer w-[100%] flex justify-center ">
                            <p className="heading text-[1.5rem] font-semibold text-[#000]">Company Detail</p>
                        </div>

                        <div className="inputField">

                            <label htmlFor="clientName">Company Name</label>
                            <div className="inputContainer w-full h-[4rem] px-[1.3rem]  rounded-[.5rem] border border-white bg-[#ffffff]/70 flex items-center gap-[3rem]">
                                <input
                                    id="clientName"
                                    placeholder="Enter Company Name"
                                    type="text"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    name="clientName"
                                    className="w-[100%] h-[100%] border-none bg-transparent focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="inputField">

                            <label htmlFor="clientDomain" className="mt-[1rem]">Company Domain</label>
                            <div className="inputContainer w-full h-[4rem] px-[1.3rem]  rounded-[.5rem] border border-white bg-[#ffffff]/70 flex items-center gap-[3rem]">
                                <input
                                    id="clientDomain"
                                    placeholder="Enter Company Domain (optional)"
                                    type="text"
                                    value={formData.clientDomain}
                                    onChange={handleChange}
                                    name="clientDomain"
                                    className="w-[100%] h-[100%] border-none bg-transparent focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="buttonContainer w-[100%] flex justify-end mt-[1rem]">

                            <button className={`w-[100%] px-[1.5rem] py-[1rem] ${loading ? "bg-[#b9b9b9] cursor-not-allowed flex justify-center items-center" : "bg-[#FFFFFF] hover:bg-[#f9f9f9]"} text-[#000000] rounded-[.5rem]  hover:scale-[.97] `}> {loading ? <Loading/> : "Submit" }</button>

                        </div>

                    </form>

                </div>

            </div>
        </>
    )
}

export default DetailForm