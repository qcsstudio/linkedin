"use client"
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import AddAccountCard from "./AddAccountCard";
import { platFromData } from "@/data/platform.data";
import { useContext } from "react";
import { userContext } from "@/Context/user.context";

const AddAccounts = () => {

    const {openAddAccount, setOpenAddAccount} = useContext(userContext);

    return (
        <>
            <div className="fadeBG absolute w-[100%] h-[100vh] overflow-hidden bg-[#000000]/50 z-[100] flex justify-center items-center" onDoubleClick={() => setOpenAddAccount(false)}>

                {/* Popup Conatiner */}
                <div className="popUp w-[65%] bg-[#fff] px-[1.5rem] py-[1.5rem] rounded-[.7rem]">

                    {/* heading container */}
                    <div className="headingContainer w-[100%] flex justify-between items-center">

                        <div className="headingData">
                            <p className="heading font-semibold text-[1.3rem]">Add Your Social Accouts</p>
                        </div>

                        <div className="closeButton w-[2rem] h-[2rem] flex justify-center items-center hover:bg-[#eeeeee]/80 rounded-[50%] cursor-pointer" onClick={() => setOpenAddAccount(false)}>
                            <IoClose className="text-[1.3rem] cursor-pointer " />
                        </div>

                    </div>

                    <div className="lowerContainer w-[100%]  max-h-[50vh] overflow-y-scroll mt-[2rem] flex gap-[2rem] flex-wrap no-scrollbar">

                        {
                            platFromData.map((data, index) => {
                                return (
                                    <AddAccountCard key={index} data={data} />
                                )
                            })
                        }

                        {/* <AddAccountCard/>
                        <AddAccountCard/>
                        <AddAccountCard/>
                        <AddAccountCard/>
                        <AddAccountCard/>
                        <AddAccountCard/>
                        <AddAccountCard/>
                        <AddAccountCard/> */}
                        

                    </div>

                </div>

            </div>
        </>
    )
}

export default AddAccounts