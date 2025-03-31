"use client"

const { createContext, useState } = require("react")

const initialData = {
    GetGrowthDataAPI: () => { },
    growthData: null,
    setGrowthData: () => { }
}

const analyticsContext = createContext(initialData);

export const AnalyticsContextProvider = ({ children }) => {

    const [growthData, setGrowthData] = useState(null);
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
      

    return (
        <analyticsContext.Provider value={{
            GetGrowthDataAPI,
            setGrowthData,
            growthData
        }}>
            {children}
        </analyticsContext.Provider>
    )
}

export default analyticsContext;