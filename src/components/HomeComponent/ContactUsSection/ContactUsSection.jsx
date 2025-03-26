import React from 'react';

const ContactUsSection = () => {
    return (
        <div id="contact" className=" w-[100%]   px-[3.3rem] relative   z-10">
            <div className="innerContainer flex   gap-10 w-[100%] h-[100%] bg-[#FFFFFF]/35 rounded-[.5rem] z-[10] pl-[3.37rem]  ">

                <div className=" p-6 py-[3rem] w-[50%] flex flex-col gap-4 ">
                    <h2 className="text-5xl text-[#0E1C29] font-bold ">Get in Touch</h2>
                    <p className="text-[#3F4142]">Feel free to reach out to us for any inquiries or assistance.</p>
                    <form className="space-y-4">
                        <input type="text" placeholder="Contact Name" className="w-full placeholder-gray-600 bg-transparent text-gray-600 p-3 border-b border-gray-500 focus:outline-none" />
                        <input type="text" placeholder="State" className="w-full p-3 placeholder-gray-600  bg-transparent text-gray-600 border-b border-gray-500 focus:outline-none" />
                        <input type="text" placeholder="Contact Phone" className="w-full placeholder-gray-600  bg-transparent p-3 border-b border-gray-500 focus:outline-none" />
                        <input type="email" placeholder="E-mail" className="w-full placeholder-gray-600  bg-transparent p-3 border-b border-gray-500 focus:outline-none" />
                        <button className="w-full  bg-[rgb(14,28,41)] bg-gradient-to-r from-[rgba(14,28,41,1)] to-[rgba(50,61,104,1)] text-white py-3 rounded-lg hover:bg-blue-700 transition">SUBMIT</button>
                    </form>
                </div>


                <div className=" flex w-[50%]  relative ">

                    <div className='w-[50%]'>

                    </div>
                    <div className='w-[50%]   bg-[#CCCCCC]'>

                    </div>
                    <iframe
                        className="absolute py-[3rem] pr-[3.37rem] h-[100%] w-[100%]  "
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
