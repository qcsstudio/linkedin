"use client";
import React, { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { CiCircleRemove } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import Image from "next/image";
import { CiYoutube } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import { LuMessageCircleMore } from "react-icons/lu";
import { CiHashtag } from "react-icons/ci";





const Page = () => {
    const [selectedButton, setSelectedButton] = useState("");
    const [selectedaccount, setSelectedaccount] = useState([]);

    const countries = [
        { name: "QCS Limited Private", code: "insta", image: "/images/createPostImages/insta.png" },
        { name: "QCS Limited Private", code: "facebook", image: "/images/createPostImages/facebook.png" },
        { name: "QCS Limited Private", code: "linkdin", image: "/images/createPostImages/linkdin.png" },
    ];

   
    const selectedaccountTemplate = (option) => {
        if (!option) return <span>Select a account</span>;

        return (
            <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">
                <img src={option.image} alt={option.name} className="w-5 h-5 rounded-full" />
                <span className="font-medium">{option.name}</span>

                <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={(e) => {
                        e.stopPropagation(); 
                        setSelectedaccount(selectedaccount.filter((c) => c.code !== option.code));
                    }}
                >
                    <CiCircleRemove />
                </button>
            </div>
        );
    };

    const accountOptionTemplate = (option) => (
        <div className="flex items-center justify-between w-full px-2 py-1">
            <span className="font-medium">{option.name}</span>
            <img src={option.image} alt={option.name} className="w-5 h-5 rounded-full" />
        </div>
    );

    const handleSelectButton = (type) => {
        setSelectedButton(type);
    };

    return (
        <div className="pt-8 pb-5 flex gap-1 overflow-hidden">
        
            <div className="bg-white/50 w-[60%] z-10 flex flex-col gap-5 rounded-lg p-10 overflow-y-auto h-[100%]">
                <div className=' flex justify-start gap-2 items-center'>
                    <button className={`${selectedButton == 'Instagram' ? 'bg-white text-[#4379EE]' : 'bg-[#4379EE] text-white'} py-2 w-[20%] rounded-md text-sm`} onClick={() => handleSelectButton('Instagram')}>Instagram</button>
                    <button className={`${selectedButton == 'Facebook' ? 'bg-white text-[#4379EE]' : 'bg-[#4379EE] text-white'} py-2 w-[20%] rounded-md text-sm `} onClick={() => handleSelectButton('Facebook')}>Facebook</button>
                    <button className={`${selectedButton == 'Linkdin' ? 'bg-white text-[#4379EE]' : 'bg-[#4379EE] text-white'} py-2 w-[20%] rounded-md text-sm  `} onClick={() => handleSelectButton('Linkdin')}>Linkdin</button>
                    <button className={`${selectedButton == 'Pinterest' ? 'bg-white text-[#4379EE]' : 'bg-[#4379EE] text-white'} py-2 w-[20%] rounded-md text-sm`} onClick={() => handleSelectButton('Pinterest')}>Pinterest</button>
                </div>


                <div className="p-5 flex flex-col gap-2 bg-white/50 rounded-lg">
                    <h2 className=" font-bold text-lg">Posting on</h2>  
                    <MultiSelect
                        value={selectedaccount}
                        onChange={(e) => setSelectedaccount(e.value)}
                        options={countries}
                        optionLabel="name"
                        placeholder="Select Platforms"
                        filter
                        selectedItemTemplate={selectedaccountTemplate}
                        itemTemplate={accountOptionTemplate}
                        display="chip"
                        className="w-full bg-white border rounded-md px-3 py-2 shadow focus:ring-0 focus:outline-none"
                    />
                </div>

                <div className="p-5 flex flex-col gap-3 bg-white/50 rounded-lg">
                    <h2 className=" font-bold text-lg">Media</h2>
                    <p className="text-sm text-[#565656]">Share photos or a video. Instagram posts can’t exceed 20 photos.</p>
                    <div className=' flex justify-start gap-4 items-center'>
                        <button className='bg-[#4379EE] text-white py-2 w-[20%] rounded-md text-sm'>Instagram</button>
                        <button className='bg-[#4379EE] text-white py-2 w-[20%] rounded-md text-sm'>Facebook</button>
                        <button className='bg-[#4379EE] text-white py-2 w-[20%] rounded-md text-sm'>Linkdin</button>
                    </div>
                </div>
                <div className="p-5 flex flex-col gap-3 bg-white/50 rounded-lg">

                    <h2 className="font-bold text-lg">Post Details</h2>
                    <p className="text-sm text-[#565656]">
                        Add your caption or Let Qur AI craft a catchy one for you!
                    </p>


                    <textarea
                        className="w-full h-24 p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#4379EE]"
                        placeholder="Write a caption..."
                    ></textarea>


                    <div className="flex justify-between items-center">

                        <div className="flex gap-3 ">
                            <CiImageOn className="text-[#4379EE]" />
                            <CiYoutube className="text-[#4379EE]" />
                            <IoLocation className="text-[#4379EE]" />
                            <CiFaceSmile className="text-[#4379EE]" />
                            <LuMessageCircleMore className="text-[#4379EE]" />
                        </div>

                        <div className="flex gap-3  items-center " >
                            <p className="text-sm text-[#565656]">Let our AI do something!</p>
                            <CiHashtag className="text-[#4379EE]" />
                            <button className="bg-[#4379EE] text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2">
                                <Image src='/images/createPostImages/ai.png' width={15} height={15} alt='' ></Image>  Assistant
                            </button>
                        </div>
                    </div>
                </div>

              
<div className="p-5 flex justify-between bg-white/50 rounded-lg">
<div className="flex flex-col gap-1">
 <h2 className="font-bold text-lg">Scheduling Options</h2>
  <p className="text-sm text-[#565656]">Set your optimal posting times</p>
</div>

 
  <div className="flex justify-between items-center">
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2  rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-5 peer-checked:bg-[#4379EE] after:absolute after:top-1 after:start-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
    </label>
  </div>
</div>


<div className="p-5 flex flex-col gap-3 bg-white/50 rounded-lg">
  <h2 className="font-bold text-lg">Privacy Settings</h2>
  <p className="text-sm text-[#565656]">
    Adjust visibility settings to control who sees your posts across platforms
  </p>


  <div className="flex flex-col gap-2">
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="radio" name="privacy" value="public" className="hidden peer" defaultChecked />
      <div className="w-7 h-7 border-2 border-[#4379EE] rounded-full flex items-center justify-center peer-checked:bg-[#4379EE] peer-checked:border-transparent">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <div>
      <span className="text-lg">Public</span>
      <p className=" text-[#565656] text-sm">Anyone will be able to see your post.</p>
      </div>
     
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input type="radio" name="privacy" value="restricted" className="hidden peer" />
      <div className="w-7 h-7 border-2 border-[#4379EE] rounded-full flex items-center justify-center peer-checked:bg-[#4379EE] peer-checked:border-transparent">
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
      <div>
      <span className="text-lg">Restricted</span>
      <p className=" text-[#565656] text-sm">Choose who can see your post.</p>
      </div>
      

    </label>
  </div>
</div>


<div className="p-5 flex flex-col gap-3 bg-white/50 rounded-lg">
  <div className="flex justify-end gap-3">
    <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md text-sm">Cancel</button>
    <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md text-sm">Save as Draft</button>
    <button className="bg-[#4379EE] text-white px-4 py-2 rounded-md text-sm">Publish</button>
  </div>
</div>


            </div>



            {/* Right Section */}
            <div className="bg-white/50 w-[40%] z-10 rounded-lg h-screen">
            
            </div>
        </div>

    );
};

export default Page;
