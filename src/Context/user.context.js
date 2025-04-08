"use client";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { getCookie } from "@/utils/getCookie";
import { setupInactivityTimer } from "@/utils/inactivityHandler";

const initialData = {
  planType: "single",
  loading: false,
  userData: null,
  linkedinAccounts: null,
  linkedinProfileData: null,
  linkedinOrganizationId: null,
  linkedinOrganizationData: null,
  oneOrganizationAnalticsData: null,
  organizationFollowerCount: null,
  setPlanType: () => {},
  setLoading: () => {},
  setUserData: () => {},
  loginAPI: () => {},
  registerAPI: () => {},
  updateUserPlatforms: () => {},
  setLinkedinAccounts: () => {},
  getUserLinkedinProfiles: () => {},
  setLinkedinProfileData: () => {},
  setLinkedinOrganizationId: () => {},
  getLinkedinOrganizationsProfiles: () => {},
  setLinkedinOrganizationData: () => {},
  getOrganizationAnalyticsData: () => {},
  setOneOrganizationAnalticsData: () => {},
  setOrganizationFollowerCount: () => {},
  getAllOrganizationsData:()=>{},
  views:null,
  setViews:()=>{},
  linkedinCombinedData:[],
  setLinkedinCombinedData:()=>{}
};

export const userContext = createContext(initialData);

export const UserContextProvider = ({ children }) => {
  
  const [userData, setUserData] = useState(initialData.userData);
  const [planType, setPlanType] = useState(initialData.planType);
  const [loading, setLoading] = useState(initialData.loading);
  const [linkedinAccounts, setLinkedinAccounts] = useState(initialData.linkedinAccounts);
  const [linkedinProfileData, setLinkedinProfileData] = useState(initialData.linkedinProfileData);
  const [linkedinOrganizationId, setLinkedinOrganizationId] = useState(initialData.linkedinOrganizationId);
  const [linkedinOrganizationData, setLinkedinOrganizationData] = useState(initialData.linkedinOrganizationData);
  const [oneOrganizationAnalticsData, setOneOrganizationAnalticsData] = useState(initialData.oneOrganizationAnalticsData);
  const [organizationFollowerCount, setOrganizationFollowerCount] = useState(initialData.organizationFollowerCount);
  const [views , setViews] = useState(initialData.views);

  const [linkedinCombinedData,setLinkedinCombinedData] = useState(initialData.linkedinCombinedData);
  const router = useRouter();

  const updatePlan = async (plan) => {
    try {
      const response = await fetch("/api/plan", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      });

      if (response.status === 200) {
        const result = await response.json();
        setUserData(result);
        router.push("/dashboard");
        window.location.href = "/welcome";
      }
    } catch (error) {
      console.log("Unable to Update Plan /user.context");
      console.log(error);
    }
  };

  const loginAPI = async (formData) => {
    const { email, password } = formData;

    if (!email || !password) {
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        console.error("Error:", json.message || "Something went wrong!");
        return;
      }

      setUserData(result.data);
      console.log(result.data);

      window.location.href = "/welcome";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const registerAPI = async (form) => {
    const { firstName, lastName, email, password } = form;
    if (!firstName || !lastName || !email || !password) {
      return;
    }

    const data = { firstName, lastName, email, password };

    try {
      const res = await fetch("/api/auth/user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("Error:", json.message || "Something went wrong");
        alert(json.message || "Registration failed. Please try again.");
        return;
      }

      window.location.href = "/plans";
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const updateUserPlatforms = async (userId, platformName, accessToken) => {
    try {
      const response = await fetch(`/api/auth/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platformName,
          accessToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update user information"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw error;
    }
  };

  const getUserLinkedinProfiles = async () => {
    try {
      const res = await fetch("/api/linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinAccounts }),
      });

      if (res.ok) {
        const { successful, failed } = await res.json();

        console.log('Linkedin User Data : ',successful);

        const userLinkedinData = successful.map((item)=>{
          return {
            token:item.token,
            type:'person',
            uniqueId:item.user.sub,
            name:item.user.name
          }
        });

        setLinkedinCombinedData(prev=>{
          const map = new Map();
          [...prev,...userLinkedinData].forEach(item=>{
            map.set(`${item.uniqueId}-${item.type}`,item);
          });

          return Array.from(map.values());

        });


        setLinkedinProfileData(successful);
        const allOrganizations = successful
          .flatMap((user) =>
            user.organizations.map((org) => ({
              ...org, // Spread existing org properties
              token: user.token, // Attach the user's token to the org
            }))
          )
          .map((org) => ({
            roleAssignee: org.roleAssignee,
            state: org.state,
            role: org.role,
            organizationalTarget: org.organizationalTarget,
            token: org.token, // Now accessible via the org object
          }));

        setLinkedinOrganizationId(allOrganizations);


        if (failed.length > 0) {
          console.warn("Failed requests:", failed);
        }
      } else {
        console.error("Failed to fetch LinkedIn data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLinkedinOrganizationsProfiles = async () => {
    const res = await fetch("/api/linkedin/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organizations: linkedinOrganizationId }),
    });

    if (res.ok) {
      const data = await res.json();

      console.log(
        "Organization Data ================--------------->",
        data.organizations
      );

      const organizationLinkedinData = data?.organizations?.map((item)=>{
        return {
          token:item.token,
          type:'organization',
          uniqueId:item.id,
          name:item.vanityName
        }
      });

      setLinkedinCombinedData(prev=>{
        const map = new Map();
        [...prev,...organizationLinkedinData].forEach(item=>{
          map.set(`${item.uniqueId}-${item.type}`,item);
        });

        return Array.from(map.values());

      });

      setLinkedinOrganizationData(data.organizations);
    }
  };

  const getOrganizationAnalyticsData = async ({ id, token }) => {
    try {
      if (!id) {
        throw new Error("Organization ID is required");
      }
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      const url = `/api/linkedin/analytics/${id}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch analytics data");
      }

      const data = await response.json();
      setOneOrganizationAnalticsData(data?.analyticsData?.elements);
      setOrganizationFollowerCount(data?.followers);
      setViews(data?.totalPageViews);
      return {
        success: true,
        data: data.analyticsData,
        message: data.message,
      };
    } catch (error) {
      console.error("Error fetching organization analytics:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  const getAllOrganizationsData = async (data) => {
    try {

        const organizations = data.map(org => ({
            id: org.id,     
            token: org.token  
        }));

        console.log("Formatted organizations:", organizations);

        const url = "/api/linkedin/analytics";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(organizations)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error fetching analytics:", errorData);
            return { error: errorData.message };
        }

        const result = await response.json();
        console.log("result" , result);
        setOneOrganizationAnalticsData(result?.data?.analyticsData?.elements);
        setOrganizationFollowerCount(result?.data?.followers)
        setViews(result?.data?.views)
    } catch (error) {
        console.error("Failed to fetch organization data:", error);
        return { error: "An error occurred while fetching data." };
    }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getCookie("access_token");
        const userId = await getCookie("user_id");

        if (token && userId) {
          const res = await fetch(`/api/auth/user/${userId?.value}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const result = await res.json();
            setUserData(result.user_data);

            const linkedinPlatforms = result.user_data.platforms.filter(
              (platform) => platform.platformName === "linkedin"
            );

            setLinkedinAccounts(linkedinPlatforms);
          } else {
            console.error("Failed to fetch user:", res.status);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const cleanup = setupInactivityTimer()
    return () => cleanup() 
  }, [])


  return (
    <userContext.Provider
      value={{
        planType,
        userData,
        linkedinAccounts,
        linkedinProfileData,
        linkedinOrganizationId,
        linkedinOrganizationData,
        setPlanType,
        updatePlan,
        loginAPI,
        registerAPI,
        updateUserPlatforms,
        getUserLinkedinProfiles,
        setLinkedinProfileData,
        setLinkedinOrganizationData,
        getLinkedinOrganizationsProfiles,
        setLinkedinOrganizationData,
        linkedinOrganizationData,
        oneOrganizationAnalticsData,
        getOrganizationAnalyticsData,
        organizationFollowerCount, 
        setOrganizationFollowerCount,
        getAllOrganizationsData,
        views,
        linkedinCombinedData
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
