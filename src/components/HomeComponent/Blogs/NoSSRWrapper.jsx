"use client";
import React, { useEffect, useState } from "react";

const NoSSRWrapper = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents SSR issues

  return <>{children}</>;
};

export default NoSSRWrapper;
