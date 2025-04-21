"use client";
import { createContext, useEffect, useState } from "react";

const initialContext = {
  openPopUp: false,
  setOpenPopUp: () => {},
  otpCorrect: false,
  setOtpCorrect: () => {},
  otpError: false,
  setOtpError: () => {},
  openEmailPopUp: false,
  setEmailOpenPopUp: () => {},
  emailOtpCorrect: false,
  setEmailOtpCorrect: () => {},
  emailOtpError: false,
  setEmailOtpError: () => {},
  emailChange: {email:"",change:false},
  setEmailChange: () => {},
  passwordDataCorrect:false,
  setPasswordDataCorrect:()=>{},
  firstName:"",
  setFirstName:()=>{},
  lastName:"",
  setLastName:()=>{},
  email:"",
  setEmail:()=>{},
  phone:"",
  setPhone:()=>{},
  avatar:null,
  setAvatar:()=>{},
};

export const uiContext = createContext(initialContext);

export const UiContextProvider = ({ children }) => {
  const [openPopUp, setOpenPopUp] = useState(initialContext.openPopUp);
  const [otpCorrect, setOtpCorrect] = useState(initialContext.otpCorrect);
  const [otpError, setOtpError] = useState(initialContext.otpError);

  const [openEmailPopUp, setEmailOpenPopUp] = useState(initialContext.openEmailPopUp);
  const [emailOtpCorrect, setEmailOtpCorrect] = useState(initialContext.emailOtpCorrect);
  const [emailOtpError, setEmailOtpError] = useState(initialContext.emailOtpError);
  const [emailChange, setEmailChange] = useState(initialContext.emailChange);
  const [passwordDataCorrect,setPasswordDataCorrect] = useState(initialContext.passwordDataCorrect);

  const [firstName,setFirstName] = useState(initialContext.firstName);
  const [lastName,setLastName] = useState(initialContext.lastName);
  const [email,setEmail] = useState(initialContext.email);
  const [phone,setPhone] = useState(initialContext.phone);
  const [avatar,setAvatar] = useState(initialContext.avatar);
  const [editMode,setEditMode] = useState(false);

  return (
    <uiContext.Provider value={{ openPopUp, setOpenPopUp,setOtpCorrect,otpCorrect,otpError, setOtpError ,openEmailPopUp, setEmailOpenPopUp, emailOtpCorrect, setEmailOtpCorrect, emailOtpError, setEmailOtpError, emailChange, setEmailChange,setPasswordDataCorrect,passwordDataCorrect,firstName,setFirstName,lastName,setLastName,email,setEmail,phone,setPhone,editMode,setEditMode,avatar,setAvatar}}>
      {children}
    </uiContext.Provider>
  );
};
