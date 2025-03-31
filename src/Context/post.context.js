"use client"

const { createContext, useState } = require("react")


const initialData = {
    error : false,
    setError:()=>{},
    loading:false,
    setLoading:()=>{},
    generatedCaption:false,
    setGeneratedCaption:()=>{}
}

const postContext = createContext(initialData);

export const PostContextProvider = ({ children })=>{

    // States -------------------------------------------------
    const [error,setError] = useState(initialData.error);
    const [loading,setLoading] = useState(initialData.loading);
    const [generatedCaption,setGeneratedCaption] = useState(initialData.generatedCaption);
    

    // Linkedin Post function -------------------------------------------------
    const postLinkedin = async(data)=>{
        try {
            setLoading(true);

            console.log("User Data:-----",data);
            
            console.log("User Data :->",data);
            const response = await fetch("/api/linkedin/post/",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data)
            })
            // console.log(response);
            setLoading(false);
        } catch (error) {
            console.log("Unable to post on Linkedin /context/post.context : ",error);
            setError(true);
            setLoading(false);
        }
    }

    // generate caption function -------------------------------------------------
    const generatePostCaption = async(data)=>{
        try {
            setLoading(true);

            const response = await fetch("/api/chatgpt/",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data)
            })
            // console.log(response);
            if(response.status === 200){
                const result = await response.json();
                setGeneratedCaption(result?.data?.choices[0].message.content);

            }
            // console.log(response.data);
            // setGeneratedCaption()
            setLoading(false);
        } catch (error) {
            console.log("Unable to post on Linkedin /context/post.context : ",error);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <postContext.Provider value={{loading,setLoading,error,setError,postLinkedin,generatePostCaption,generatedCaption,setGeneratedCaption}}>
            {children}
        </postContext.Provider>
    )
}

export default postContext;