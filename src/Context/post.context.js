"use client";

import { createContext, useState } from "react";

const initialData = {
    schedulePost: () => {},
    postLinkedin: () => {},
};

const PostContext = createContext(initialData);

export const PostContextProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ Schedule Post Function
    const schedulePost = async (data) => {
        try {
            setLoading(true);
            console.log("data", data);

            const res = await fetch("/api/schedulePost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // ✅ Fixed Header Typo
                },
                body: JSON.stringify(data),
            });

            const resData = await res.json();

            if (!res.ok) throw new Error(resData.message);

            setLoading(false);
            return resData; // ✅ Return response data if needed
        } catch (error) {
            console.error("Unable to perform schedulePost:", error);
            setError(true);
            setLoading(false);
        }
    };

    // ✅ LinkedIn Post Function
    const postLinkedin = async (data) => {
        try {
            setLoading(true);
            console.log("User Data:-----", data);

            const response = await fetch("/api/linkedin/post/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("LinkedIn post failed.");

            setLoading(false);
        } catch (error) {
            console.error("Unable to post on LinkedIn:", error);
            setError(true);
            setLoading(false);
        }
    };

    return (
        <PostContext.Provider value={{ loading, setLoading, error, setError, postLinkedin, schedulePost }}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContext;
