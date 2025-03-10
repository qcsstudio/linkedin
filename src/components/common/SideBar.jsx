"use client"
import Image from "next/image"
import { useContext } from "react"
import {sideBarData} from "@/data/sideBar.data"
import { dashboardContext } from "@/Context/Dashboard.context"

const SideBar = () => {

    const {currentComponent,setCurrentComponent} = useContext(dashboardContext);

    return (
        <>
            <div className='flex flex-col w-[100%] gap-3 py-[2rem]'>
                {/* Upper Dropdown */}
                <div className='flex justify-center gap-3 items-center rounded-2xl py-5  w-full  min-w-[200px] bg-[#ffffff]/60 '>
                    <h6 className='font-bold text-[20px]'>
                        QUANTUM
                    </h6>
                    {/* <Image src={`/images/dashboardImages/dropdownicon.png`} width={1024} height={1024} className='object-fit w-[1.8rem]' alt='sidebarImage'/> */}
                </div>

                {/* Lower Sidebar */}
                <div className="w-[100%]  min-w-[241px] min-h-[516px]  bg-white/50 rounded-xl p-5 z-[100]">

                {/* Item's */}
                    {sideBarData.map((data, index) => (
                        <div key={index}>
                            <div className={` border-[#D8CFE8] py-1 hover:bg-[#B4F2FC]/70 hover:rounded-[1rem] hover:border-none transition cursor-pointer ${currentComponent == data?.path ? "bg-[#B4F2FC]/70 rounded-[1rem] text-[#ffffff]" : "bg-transparent"}`} key={index} onClick={()=>setCurrentComponent(data.path)}>
                                <div
                                    className="flex items-center space-x-3 w-full h-[53px] rounded-xl p-2 py-4"
                                    >
                                    {
                                        currentComponent == data?.path ? 

                                        <Image src={data.activeImage} alt={data.heading} width={1024} height={1024} className="w-[1.8rem]"/>:

                                        <Image src={data.inActiveImage} alt={data.heading} width={1024} height={1024} className="w-[1.8rem]"/>
                                    }
                                    

                                    <h4 className={`text-left text-md font-semibold select-none  ${currentComponent == data?.path ? "text-[#ffffff]" : "text-[#9E9E9E]"}`}>{data.heading}</h4>
                                </div>
                            </div>
                            <hr className="border border-[#dadada]/70 my-[2px]"/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SideBar