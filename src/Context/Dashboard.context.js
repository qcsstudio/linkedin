"use client"
import { createContext, useState } from "react"

export const dashboardContext = createContext('');

const DashboardContextProvider = ({children}) => {
    const [currentComponent,setCurrentComponent] = useState('home');
    return (
        <>
            <dashboardContext.Provider value={{currentComponent,setCurrentComponent}}>
                {children}
            </dashboardContext.Provider>
        </>
    )
}

export default DashboardContextProvider