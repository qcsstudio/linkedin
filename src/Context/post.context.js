"use client";

const { createContext, useState } = require("react");

const initialData = {
    schedulePost:()=>{},
    error : false,
    setError:()=>{},
    loading:false,
    setLoading:()=>{}
}

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
