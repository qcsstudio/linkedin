"use client";
import { useEffect, useState } from "react";
import DashboardContainer from "@/containers/DashboardContainer/DashboardContainer";
import Image from "next/image";

export default function Home() { 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const startOAuth = () => {
    window.location.href = '/api/auth/linkedin';
  };


  return (
    <div className="homeContainer">
      <h1>Home</h1>
      <button onClick={startOAuth}>Sign in with LinkedIn</button>

      {loading && <p>Loading user data...</p>}
      {user && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
      <DashboardContainer/>
    </div>
  );
}
