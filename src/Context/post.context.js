"use client"

const { createContext, useState } = require("react")


const initialData = {
    error: false,
    setError: () => { },
    loading: false,
    setLoading: () => { },
    generatedCaption: [],
    setGeneratedCaption: () => { },
    commentSuccess: false,
    setCommentSuccess: () => { },
    scheduledPostData: [],
    setScheduledPostData: () => { }
}

const postContext = createContext(initialData);

export const PostContextProvider = ({ children }) => {

    // States -------------------------------------------------
    const [error, setError] = useState(initialData.error);
    const [loading, setLoading] = useState(initialData.loading);
    const [generatedCaption, setGeneratedCaption] = useState(initialData.generatedCaption);
    const [commentSuccess, setCommentSuccess] = useState(initialData.commentSuccess);
    const [scheduledPostData, setScheduledPostData] = useState(initialData.scheduledPostData);


    // Linkedin Post function -------------------------------------------------
    const postLinkedin = async (data) => {
        try {
            setLoading(true);

            const response = await fetch("/api/linkedin/post/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            setLoading(false);
        } catch (error) {
            console.log("Unable to post on Linkedin /context/post.context : ", error);
            setError(true);
            setLoading(false);
        }
    }

    // generate caption function -------------------------------------------------
    const generatePostCaption = async (data) => {
        try {
            const optimizedPrompt = `
            Act as a senior LinkedIn content strategist with 10+ years experience in viral professional content creation.
            
            About the user: ${data.userContext || "Tech professional looking to grow their network"}
            
            Create a LinkedIn post about: "${data.prompt}"
            
            Requirements:
            1. Post Content:
               - 3-5 short paragraphs (50-80 words total)
               - Vary structure between: 
                 * Thought-provoking questions
                 * Industry insights
                 * Personal anecdotes
                 * Actionable tips
               - Include 1 relevant emoji per paragraph
               - Add a clear CTA (Comment/Share/Save)
            
            2. Hashtags:
               - 5 unique hashtags per generation
               - Mix of: 
                 * Industry-specific (2)
                 * Content-type (1, e.g., #TechTalk)
                 * Community (1, e.g., #WomenInTech)
                 * Trending (1, if relevant)
               - Never reuse exact hashtags from previous outputs
            
            3. Style Guidelines:
               - Tone: ${data.desiredTone || "Professional yet conversational"}
               - Avoid corporate jargon
               - Use power verbs: "Transform", "Master", "Unlock"
               - Include 1 surprising statistic/quote
            
            4. Response Format:
            {
              "post": "(3-5 emoji-decorated paragraphs)",
              "hashtags": ["...", "..."], 
              "sentiment": "positive/motivational/provocative",
              "tone": "encouraging/thoughtful/authoritative"
            }
            `;
    
            const response = await fetch("/api/chatgpt/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ prompt: optimizedPrompt })
            });
    
            if (response.status === 200) {
                const result = await response.json();
                const choices = result?.data?.choices || [];
    
                // ✅ Loop through all choices and add to array state
                const suggestions = choices.map(choice => {
                    const content = choice?.message?.content;
                    try {
                        return JSON.parse(content);  // convert JSON string to object
                    } catch (err) {
                        // fallback if not valid JSON
                        return { post: content, hashtags: [], sentiment: "", tone: "" };
                    }
                });
    
                // ✅ Add all objects to single array state
                setGeneratedCaption(prev => [...prev, ...suggestions]);
            }
    
        } catch (error) {
            console.log("Unable to post on Linkedin /context/post.context :", error);
        }
    }
    
    


    // Linkedin Post Schedule function -------------------------------------------------
    const postSchedule = async (data) => {
        try {
            setLoading(true);


            const res = await fetch("/api/schedulepost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.status == 200) {
                const resData = await res.json();
                console.log("Scheduling Data : ", resData);
            }

            setLoading(false);
        } catch (error) {
            console.error("Unable to Schedule Post /context/post.context : ", error);
            setError(true);
            setLoading(false);
        }
    }

    // Linkedin Get Schedule function -------------------------------------------------
    const getSchedulePost = async (data) => {
        try {
            setLoading(true);


            const res = await fetch("/api/schedulepost", {

            });
            console.log(res);


            if (res.status == 200) {
                const resData = await res.json();
                console.log("Response from get schedule post : ", resData.data)
                setScheduledPostData(resData.data);
                console.log("Scheduling Data : ", resData);
            }

            setLoading(false);
        } catch (error) {
            console.error("Unable to Schedule Post /context/post.context : ", error);
            setError(true);
            setLoading(false);
        }
    }

    // Linkedin Nested Comment function -------------------------------------------------
    const nestedComment = async (data) => {
        try {
            setLoading(true);


            const res = await fetch("/api/linkedin/nestedcomment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.status == 200) {
                const resData = await res.json();
                console.log("Scheduling Data : ", resData);
            }

            setLoading(false);
        } catch (error) {
            console.error("Unable to Schedule Post /context/post.context : ", error);
            setError(true);
            setLoading(false);
        }
    }

    // Linkedin Comment function -------------------------------------------------
    const postComment = async (data) => {
        try {
            setLoading(true);


            const response = await fetch("/api/linkedin/comment/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            setLoading(false);
            setCommentSuccess(true);
        } catch (error) {
            console.log("Unable to post on Linkedin /context/post.context : ", error);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <postContext.Provider value={{ loading, setLoading, error, setError, postLinkedin, generatePostCaption, generatedCaption, setGeneratedCaption, postSchedule, nestedComment, postComment, commentSuccess, setCommentSuccess, getSchedulePost, scheduledPostData, setScheduledPostData }}>
            {children}
        </postContext.Provider>
    )
}

export default postContext;