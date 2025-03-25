"use client"

const { createContext, useState } = require("react")


const initialData = {

}

const postContext = createContext(initialData);

export const postContextProvider = ({ children })=>{

    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);

    const postLinkedin = async(data)=>{
        try {
            setLoading(true);
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.log("Unable to post on Linkedin /context/post.context : ",error);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <postContext.Provider value={postLinkedin}>
            {children}
        </postContext.Provider>
    )
}

export default postContext;