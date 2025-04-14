"use client"

const { createContext, useState } = require("react")


const initialData = {
    error : false,
    setError:()=>{},
    loading:false,
    setLoading:()=>{},
    generatedCaption:[],
    setGeneratedCaption:()=>{},
    commentSuccess:false,
    setCommentSuccess:()=>{},
    scheduledPostData:[],
    setScheduledPostData:()=>{}
}

const postContext = createContext(initialData);

export const PostContextProvider = ({ children })=>{

    // States -------------------------------------------------
    const [error,setError] = useState(initialData.error);
    const [loading,setLoading] = useState(initialData.loading);
    const [generatedCaption,setGeneratedCaption] = useState(initialData.generatedCaption);
    const [commentSuccess,setCommentSuccess] = useState(initialData.commentSuccess);
    const [scheduledPostData,setScheduledPostData] = useState(initialData.scheduledPostData);
    

    // Linkedin Post function -------------------------------------------------
    const postLinkedin = async(data)=>{
        try {
            setLoading(true);

            const response = await fetch("/api/linkedin/post/",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data)
            })

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
            const response = await fetch("/api/chatgpt/",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data)
            })

            if(response.status === 200){
                const result = await response.json();
                setGeneratedCaption(prev=>[...prev,result?.data?.choices[0].message.content]);

            }

        } catch (error) {
            console.log("Unable to post on Linkedin /context/post.context : ",error);
        }
    }

    // Linkedin Post Schedule function -------------------------------------------------
    const postSchedule = async(data)=>{
        try {
            setLoading(true);


            const res = await fetch("/api/schedulepost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if(res.status == 200){
                const resData = await res.json();
                console.log("Scheduling Data : ",resData);
            }

            setLoading(false);
        } catch (error) {
            console.error("Unable to Schedule Post /context/post.context : ",error);
            setError(true);
            setLoading(false);
        }
    }

    // Linkedin Get Schedule function -------------------------------------------------
    const getSchedulePost = async(data)=>{
        try {
            setLoading(true);


            const res = await fetch("/api/schedulepost",{

            });
            console.log(res);


            if(res.status == 200){
                const resData = await res.json();
                console.log("Response from get schedule post : ",resData.data)
                setScheduledPostData(resData.data);
                console.log("Scheduling Data : ",resData);
            }

            setLoading(false);
        } catch (error) {
            console.error("Unable to Schedule Post /context/post.context : ",error);
            setError(true);
            setLoading(false);
        }
    }

    // Linkedin Nested Comment function -------------------------------------------------
    const nestedComment = async(data)=>{
        try {
            setLoading(true);


            const res = await fetch("/api/linkedin/nestedcomment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if(res.status == 200){
                const resData = await res.json();
                console.log("Scheduling Data : ",resData);
            }

            setLoading(false);
        } catch (error) {
            console.error("Unable to Schedule Post /context/post.context : ",error);
            setError(true);
            setLoading(false);
        }
    }

    // Linkedin Comment function -------------------------------------------------
    const postComment = async(data)=>{
        try {
            setLoading(true);
            

            const response = await fetch("/api/linkedin/comment/",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data)
            });
            
            setLoading(false);
            setCommentSuccess(true);
        } catch (error) {
            console.log("Unable to post on Linkedin /context/post.context : ",error);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <postContext.Provider value={{loading,setLoading,error,setError,postLinkedin,generatePostCaption,generatedCaption,setGeneratedCaption,postSchedule,nestedComment,postComment,commentSuccess,setCommentSuccess,getSchedulePost,scheduledPostData,setScheduledPostData}}>
            {children}
        </postContext.Provider>
    )
}

export default postContext;