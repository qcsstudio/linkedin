"use client";

const { createContext, useState } = require("react");

const initialData = {
  GetGrowthDataAPI: () => {},
  growthData: null,
  setGrowthData: () => {},
  GetTopPostsAPI: () => {},
  topPostsData: null,
  setTopPostsData: () => {},
  posts: null,
  setPosts: () => {},
  GetLinkedinPostsAPI: () => {},
  recentPosts: null,
  setRecentPosts: () => {},
  GetLinkedinRecentsPost: () => {},
  GetAllViewsAPI: () => {},
  allViews: null,
  setAllViews: () => {},
  allFollowers:null,
  setAllFollowers:()=>{},
};

const analyticsContext = createContext(initialData);

export const AnalyticsContextProvider = ({ children }) => {
  const [growthData, setGrowthData] = useState(initialData.growthData);
  const [topPostsData, setTopPostsData] = useState(initialData.topPostsData);
  const [posts, setPosts] = useState(initialData.posts);
  const [recentPosts, setRecentPosts] = useState(initialData.recentPosts);
  const [allViews, setAllViews] = useState(initialData.allViews);
  const [allFollowers, setAllFollowers] = useState(initialData.allViews);

  const GetGrowthDataAPI = async ({ id, token }) => {
    try {
      const response = await fetch("/api/linkedin/linkedin-growth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, token }),
      });

      if (!response.ok) throw new Error("Failed to fetch growth data");

      const data = await response.json();
      setGrowthData(data);
    } catch (err) {
      console.error("Error fetching LinkedIn growth data:", err);
    }
  };

  const GetTopPostsAPI = async ({ data }) => {
    console.log("data", data);
    try {
      const response = await fetch("/api/linkedin/top-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organizations: data,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch top posts: ${response.statusText}`);
      }

      const result = await response.json();
      setTopPostsData(result.topPosts);
    } catch (error) {
      console.error("Error fetching LinkedIn top posts:", error);
    }
  };

  const GetLinkedinPostsAPI = async ({ id, token }) => {
    if (!id || !token) return;
    try {
      const response = await fetch("/api/linkedin/all-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, token }),
      });

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch LinkedIn posts:", err);
    }
  };

  const GetLinkedinRecentsPost = async (organizations) => {
    try {
      const response = await fetch("/api/linkedin/recent-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organizations }), // send whole array
      });

      const result = await response.json();
      setRecentPosts(result.data); // you may want to store differently based on UI
    } catch (err) {
      console.error("Failed to fetch LinkedIn posts:", err);
    }
  };

  const GetAllViewsAPI = async (organizations) => {
    try {
      const response = await fetch("/api/linkedin/all-views", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ organizations }), 
      });

      const result = await response.json();
      console.log("resultXXXX" ,result)
      setAllViews(result.dailyCombinedViews); 
      
    } catch (err) {
      console.error("Failed to fetch LinkedIn posts:", err);
    }
  };

  const GetAllFollowersAPI = async(organizations) =>{
    try {
      const response = await fetch("/api/linkedin/all-followers",{
        method:'POST',
        headers:{
          "Content-type":"application/json",
        },
        body:JSON.stringify({organizations})
      })

      const result = await response.json();
      console.log("reult of the followers",result);
      setAllFollowers(result)
      
    } catch (err) {
      console.error("Failed to fetch LinkedIn Followers:", err);
    }
  }

  return (
    <analyticsContext.Provider
      value={{
        GetGrowthDataAPI,
        setGrowthData,
        growthData,
        GetTopPostsAPI,
        topPostsData,
        posts,
        setPosts,
        GetLinkedinPostsAPI,
        recentPosts,
        setRecentPosts,
        GetLinkedinRecentsPost,
        GetAllViewsAPI,
        allViews, 
        setAllViews,
        allFollowers,
        GetAllFollowersAPI,
      }}
    >
      {children}
    </analyticsContext.Provider>
  );
};

export default analyticsContext;
