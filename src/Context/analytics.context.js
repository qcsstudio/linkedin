"use client"

const { createContext, useState } = require("react")

const initialData = {
    GetGrowthDataAPI: () => { },
    growthData: null,
    setGrowthData: () => { },
    GetTopPostsAPI:()=>{ },
    topPostsData:null,
    setTopPostsData:()=>{}
}

const analyticsContext = createContext(initialData);

export const AnalyticsContextProvider = ({ children }) => {

    const [growthData, setGrowthData] = useState(initialData.growthData);
    const [topPostsData , setTopPostsData]  = useState(initialData.topPostsData);

    const GetGrowthDataAPI = async ({ id, token }) => {
        try {
          const response = await fetch('/api/linkedin/linkedin-growth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, token }),
          });
      
          if (!response.ok) throw new Error('Failed to fetch growth data');
      
          const data = await response.json();
          setGrowthData(data);
        } catch (err) {
          console.error('Error fetching LinkedIn growth data:', err);
        }
      };

      const GetTopPostsAPI = async ({ data }) => {
        console.log("data", data)
        try {
          const response = await fetch('/api/linkedin/top-posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              organizations: data  
            })
          });
      
          if (!response.ok) {
            throw new Error(`Failed to fetch top posts: ${response.statusText}`);
          }
      
          const result = await response.json();
          setTopPostsData(result.topPosts); 
        } catch (error) {
          console.error('Error fetching LinkedIn top posts:', error);
        }
      };
      

    return (
        <analyticsContext.Provider value={{
            GetGrowthDataAPI,
            setGrowthData,
            growthData,
            GetTopPostsAPI,
            topPostsData
        }}>
            {children}
        </analyticsContext.Provider>
    )
}

export default analyticsContext;