"use client";

const { createContext, useState } = require("react");

const initialData = {
    schedulePost:()=>{}
};

const postContext = createContext(initialData);

export const PostContextProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const schedulePost = async (data) =>{
        try{
            setLoading(true);
              console.log("data",data);
              
            const res = await fetch("/api/schedulePost",{
                method:"POST",
                headers:{
                    "Context-Type":"application/json"
                },
                body: JSON.stringify(data)
            })

            const resData = await res;

            if(!res.ok) throw new Error(resData.message);

            setLoading(false)
        }
        catch(error){
            console.error("Unable to perform shit", error);
            setError(true);
            setLoading(false);
        }
    }

    const postLinkedin = async (data) => {
        try {
            setLoading(true);

            // Construct JSON payload
            const payload = {
                user_id: data.user_id, 
                postDescription: data.postCaption, 
                privacy: data.privacy, 
                formImage: data.formImage, 
                selectedAccount: data.selectedaccount 
            };

            console.log("Sending Data:", payload);

            const response = await fetch("/api/post", {  // ✅ Ensure this matches your API route
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const responseData = await response.json();
            console.log("Response:", responseData);

            if (!response.ok) throw new Error(responseData.message);

            setLoading(false);
        } catch (error) {
            console.error("Unable to post on LinkedIn /context/post.context:", error);
            setError(true);
            setLoading(false);
        }
    };

    return (
        <postContext.Provider value={{ loading, setLoading, error, setError, postLinkedin ,schedulePost }}>
            {children}
        </postContext.Provider>
    );
};

export default postContext;
