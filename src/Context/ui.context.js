"use client";
import { createContext, useEffect, useState } from "react";

const initialContext = {
  openPopUp: false,
  setOpenPopUp: () => {},
  otpCorrect: false,
  setOtpCorrect: () => {},
  otpError: false,
  setOtpError: () => {},
};

export const uiContext = createContext(initialContext);

export const UiContextProvider = ({ children }) => {
  const [openPopUp, setOpenPopUp] = useState(initialContext.openPopUp);
  const [otpCorrect, setOtpCorrect] = useState(initialContext.otpCorrect);
  const [otpError, setOtpError] = useState(initialContext.otpError);


  return (
    <uiContext.Provider value={{ openPopUp, setOpenPopUp,setOtpCorrect,otpCorrect,otpError, setOtpError }}>
      {children}
    </uiContext.Provider>
  );
};
