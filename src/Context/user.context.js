"use client"
import { useRouter } from "next/navigation";
import {  createContext, useState } from "react";

const initialData = {
    planType:"single",
    setPlanType:()=>{ },
    loading:false,
    setLoading:()=>{ },
    userData:{},
    setUserData:()=>{}

}

export const userContext = createContext(initialData);

export const UserContextProvider = ({children})=>{
    const [userData,setUserData] = useState(initialData.userData);
    const [planType,setPlanType] = useState(initialData.planType);
    const [loading,setLoading] = useState(initialData.loading);

    const router = useRouter();

    const updatePlan = async(plan) =>{

        try { 
            const response = await fetch('/api/plan',{
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(plan)
            });

            if(response.status === 200){
                const result = await response.json();
                console.log(result);
                setUserData(result);
                router.push("/dashboard");
            }
        } catch (error) {
            console.log("Unable to Update Plan /user.context");
            console.log(error);
        }
    }

    return <userContext.Provider value={{planType,setPlanType,updatePlan}}>
        {children}
    </userContext.Provider>
}

export default UserContextProvider;