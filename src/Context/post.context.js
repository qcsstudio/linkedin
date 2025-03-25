"use client"

const { createContext, useState } = require("react")


const initialData = {

}

const postContext = createContext(initialData);

export const PostContextProvider = ({ children })=>{

    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);

    const postLinkedin = async(data)=>{
        try {
            setLoading(true);
            const formData = new FormData();

            // form Data handle
            formData.append("postCaption",data.postCaption);
            formData.append("privacy",data.privacy);
            formData.append("privacy",JSON.stringify(data.selectedaccount));

            if (data.formImage && data.formImage.length > 0) {
                data.formImage.forEach((file, index) => {
                    formData.append(`image_${index}`, file);  // ✅ Appends each file separately
                });
            }

            console.log("User Data :->",data);
            const response = await fetch("/api/linkedin/post/",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:formData
            })
            // console.log(response);
            setLoading(false);
        } catch (error) {
            console.log("Unable to post on Linkedin /context/post.context : ",error);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <postContext.Provider value={{loading,setLoading,error,setError,postLinkedin}}>
            {children}
        </postContext.Provider>
    )
}

export default postContext;