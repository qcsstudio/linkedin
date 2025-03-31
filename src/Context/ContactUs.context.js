"use client"
import { createContext, useState, useEffect } from "react"


const ContactUsIntialData = {
    status: "",
    setStatus: () => { },
}
export const ContactUsContext = createContext(ContactUsIntialData);

export const ContactUsContextProvider = ({ children }) => {

    const [status, setStatus] = useState("");

    const handleSendMail = async (formData) => {
        setStatus("Sending...");
        console.log(formData);

        formData.toMail = "company";

        if (!formData.message) {
            formData.message = "Any Message";
        }

        const res = await fetch("/api/contact-us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setStatus("Contact form submitted successfully!");


            formData.toMail = "user";
            formData.message = "Thanks for contacting us! We will get back to you soon.";
            handleUserSendMail(formData);
        } else {
            setStatus("Error sending message.");
        }
    };


    const handleUserSendMail = async (formData) => {

        console.log(formData);


        const res = await fetch("/api/contact-us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
        } else {

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleSendMail(formData);

    }

    useEffect(() => {
        if (status === "contact successfully!") {
            toast.success("Message submit successfully!");
        }
    }, [status])


    return (
        <ContactUsContext.Provider
            value={
                {
                    handleSendMail,
                    status
                }
            }
        >
            {children}
        </ContactUsContext.Provider>
    )

}