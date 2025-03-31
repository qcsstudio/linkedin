"use client";
import React, { useContext, useState, useEffect } from "react";
import { ContactUsContext } from "@/Context/ContactUs.context";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import CloudSection from "../CloudSection/CloudSection";

const ContactUsSection = () => {
    const { handleSendMail, status } = useContext(ContactUsContext);
    const [captchaToken, setCaptchaToken] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!captchaToken) {
            toast.error("Please verify that you are not a robot!");
            return;
        }

        const formDataWithCaptcha = { ...formData, captchaToken, toMail: "company" };
        const res = await handleSendMail(formDataWithCaptcha);

        if (res.ok) {
          setFormData({ name: "", email: "", phone: "", message: "" });
            toast.success("Message sent successfully!");

            // RESET CAPTCHA
            setCaptchaToken("");
            grecaptcha.reset(); // Reset CAPTCHA UI

          
           
                const formDataForUser = {
                    ...formData,
                    captchaToken: "", 
                    toMail: "user",
                    message: "Thanks for contacting us! We will get back to you soon.",
                };
                 handleSendMail(formDataForUser);
           
        } else {
            toast.error("Error sending message.");
        }
    };

    

    return (
        <div id="contact" className="relative w-full px-4 lg:px-[3.37rem] md:px-[3.12rem] z-10 ">
            <Toaster
                position="bottom-center"
                toastOptions={{
                    duration: 2000,
                    style: { marginBottom: "50px", background: "rgb(255, 255, 255,0.8)", color: "#3F4142" },
                }}
            />

            
            <div className=" relative innerContainer flex flex-col md:flex-row gap-6 md:gap-10 w-full h-full bg-[#FFFFFF]/35 rounded-lg pl-4 md:pl-[3.12rem] lg:pl-[3.12rem]">
                {/* Form Section */}
                <CloudSection bottom={-30} left={0} opacity={0.7} />
                <div className="p-4 md:p-6 py-8 md:py-[3rem] w-full md:w-1/2 flex flex-col gap-4">
                    <h2 className="text-3xl text-center md:text-start md:text-3xl text-[#0E1C29] font-bold">Get in Touch</h2>
                    <p className="text-[#3F4142] md:text-start text-center">
                        Feel free to reach out to us for any inquiries or assistance.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            onChange={handleChange}
                            name="name"
                            value={formData.name}
                            type="text"
                            placeholder="Your Name"
                            className="w-full placeholder-gray-600 bg-transparent text-gray-600 p-3 border-b border-gray-500 focus:outline-none"
                        />
                        <input
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 placeholder-gray-600 bg-transparent text-gray-600 border-b border-gray-500 focus:outline-none"
                        />
                        <input
                            onChange={handleChange}
                            name="phone"
                            value={formData.phone}
                            type="phone"
                            placeholder="Phone"
                            className="w-full placeholder-gray-600 bg-transparent p-3 border-b border-gray-500 focus:outline-none"
                        />
                        <textarea
                            onChange={handleChange}
                            name="message"
                            value={formData.message}
                            type="message"
                            rows="2"
                            col="2"
                            placeholder="Your Message"
                            className="w-full placeholder-gray-600 bg-transparent p-3 border-b border-gray-500 focus:outline-none"
                        />
                        <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
                        <button className="w-full bg-[rgb(14,28,41)] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white py-3 rounded-lg hover:bg-blue-700 transition">
                            SUBMIT
                        </button>
                    </form>
                </div>
                   {/* Map Section */}
        <div className="flex w-full md:w-[60%] relative">
          <div className="w-[50%] md:w-[70%] md:h-full z-10 right-0 absolute  rounded-tr-lg rounded-br-lg bg-[#CCCCCC]"></div>

          <iframe
            className="absolute top-12 left-0 h-[82%] hidden z-20 md:block  md:top-11 md:w-[80%]  md:border  rounded-lg "
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.7900688590785!2d76.68506357465988!3d30.696182187399774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fefa3c5ea2fd5%3A0x332a8d3fa1ce9747!2sQuantumCrafters%20Studio%20Private%20Limited!5e0!3m2!1sen!2sin!4v1742971534434!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

        </div>
      </div>
    </div>
          
    );
};

export default ContactUsSection;
