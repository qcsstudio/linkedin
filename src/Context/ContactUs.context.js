"use client";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const ContactUsInitialData = {
    status: "",
    setStatus: () => {},
    handleSendMail: () => {},
};

export const ContactUsContext = createContext(ContactUsInitialData);

export const ContactUsContextProvider = ({ children }) => {
    const [status, setStatus] = useState("");

    const handleSendMail = async (formData) => {
        try {
            const res = await fetch("/api/contact-us", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json(); // Parse response JSON

            if (!res.ok) {
                console.error("Error sending email:", data);
                setStatus("error");
                return { ok: false, error: data };
            }

            setStatus("contact successfully!");
            return { ok: true, data };
        } catch (error) {
            console.error("Fetch error:", error);
            setStatus("error");
            return { ok: false, error: error.message };
        }
    };

    useEffect(() => {
        if (status === "contact successfully!") {
            toast.success("Message submitted successfully!");
        } else if (status === "error") {
            toast.error("Failed to send message. Please try again.");
        }
    }, [status]);

    return (
        <ContactUsContext.Provider value={{ handleSendMail, status }}>
            {children}
        </ContactUsContext.Provider>
    );
};
