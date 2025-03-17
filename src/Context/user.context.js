"use client";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

const initialData = {
  planType: "single",
  setPlanType: () => {},
  loading: false,
  setLoading: () => {},
  userData: {},
  setUserData: () => {},
  loginAPI: () => {},
  registerAPI:()=>{ }
};

export const userContext = createContext(initialData);

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialData.userData);
  const [planType, setPlanType] = useState(initialData.planType);
  const [loading, setLoading] = useState(initialData.loading);

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
        console.log(result);
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
      // Send login request to the API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      // Handle API response
      if (!response.ok) {
        console.error("Error:", json.message || "Something went wrong!");
        return;
      }
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const registerAPI = async () => {
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

      // Handle response
      if (!res.ok) {
        console.error("Error:", json.message || "Something went wrong");
        alert(json.message || "Registration failed. Please try again.");
        return;
      }

      // Reset form on success
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      console.log("Registration successful!", json);
      // alert("Registration successful!");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <userContext.Provider
      value={{
        planType,
        setPlanType,
        updatePlan,
        loginAPI,
        registerAPI
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
