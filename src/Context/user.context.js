"use client";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";
import { getCookie } from "@/utils/getCookie";

const initialData = {
  planType: "single",
  loading: false,
  userData: null,
  linkedinAccounts: null,
  linkedinProfileData: null,
  linkedinOrganizationId: null,
  linkedinOrganizationData: null,
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
};

export const userContext = createContext(initialData);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialData.userData);
  const [planType, setPlanType] = useState(initialData.planType);
  const [loading, setLoading] = useState(initialData.loading);
  const [linkedinAccounts, setLinkedinAccounts] = useState(
    initialData.linkedinAccounts
  );
  const [linkedinProfileData, setLinkedinProfileData] = useState(
    initialData.linkedinProfileData
  );
  const [linkedinOrganizationId, setLinkedinOrganizationId] = useState(
    initialData.linkedinOrganizationId
  );

  const [linkedinOrganizationData, setLinkedinOrganizationData] = useState(
    initialData.linkedinOrganizationData
  );

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

      window.location.href = "/dashboard";
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
        console.log("Successful data from linkedin ?????//",successful);

        setLinkedinProfileData(successful);
        const allOrganizations = successful
        .flatMap((user) => 
          user.organizations.map((org) => ({
            ...org,          // Spread existing org properties
            token: user.token // Attach the user's token to the org
          }))
        )
        .map((org) => ({
          roleAssignee: org.roleAssignee,
          state: org.state,
          role: org.role,
          organizationalTarget: org.organizationalTarget,
          token: org.token // Now accessible via the org object
        }));
      

        setLinkedinOrganizationId(allOrganizations);
       console.log("allOrganizations" ,allOrganizations);

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
    console.log(linkedinOrganizationId)
    const res = await fetch("/api/linkedin/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ organizations : linkedinOrganizationId }),
    });

    if (res.ok) {
      const data = await res.json();
      setLinkedinOrganizationData(data.organizations);
      
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
        linkedinOrganizationData

      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
