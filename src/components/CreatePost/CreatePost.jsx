"use client";
import React, { useContext, useEffect, useState } from "react";
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
import TextEditor from "@/components/common/TextEditor";
import { userContext } from "@/Context/user.context";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,Navigation } from 'swiper/modules';
import postContext from "@/Context/post.context";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CreatePost = () => {

    // Use Context 
    const { userData, getUserLinkedinProfiles, linkedinProfileData, linkedinAccounts, getLinkedinOrganizationsProfiles, linkedinOrganizationId, linkedinOrganizationData  } =
        useContext(userContext);


    const { loading, setLoading, error, setError, postLinkedin,generatePostCaption,generatedCaption,setGeneratedCaption } = useContext(postContext);



    // use State
    const [selectedButton, setSelectedButton] = useState("");
    const [selectedaccount, setSelectedaccount] = useState([]);

    const [suggestionButton, setSuggestionButton] = useState([
        {
            name: "Captions",
            id: 1
        }, {
            name: "Hashtags",
            id: 2
        }, {
            name: "Best Time",
            id: 3
        }
    ]);

    // Post Input Data -------------------------------------
    const [postCaption, setPostCaption] = useState("");
    const [privacy, setPrivacy] = useState("Public");
    const [formImage, setFormImage] = useState([]);
    const [formVideo,setFormVideo] = useState([]);

    // Post States (Right Section) --------------------------
    const [showText, setShowText] = useState(false);
    const [fileType, setFileType] = useState(false);
    const [postImages, setPostImages] = useState([]);
    const [postVideos, setPostVideos] = useState([]);
    const [prompt, setPrompt] = useState("");

    console.log("Caption data:",postImages);

    const [activeSocialButton, setActiveSocialButton] = useState(1);
    const [socialButton, setsocialButton] = useState([
        {
            img: "/images/postImages/instagram.svg",
            social: "instagram",
            id: 1
        }, {
            img: "/images/postImages/linkedin.png",
            social: "linkedin",
            id: 2
        }, {
            img: "/images/postImages/facebook.png",
            social: "facebook",
            id: 3
        }
    ]);
    const [activeButton, setActiveButton] = useState(1);

    // const countries = [
    //     {
    //         name: "QCS Limited Private",
    //         code: "insta",
    //         image: "/images/createPostImages/insta.png",
    //     },
    //     {
    //         name: "QCS Limited Private",
    //         code: "facebook",
    //         image: "/images/createPostImages/facebook.png",
    //     },
    //     {
    //         name: "QCS Limited Private",
    //         code: "linkdin",
    //         image: "/images/createPostImages/linkdin.png",
    //     },
    // ];

    // Use Effect.
    useEffect(() => {
        if (linkedinAccounts) {
            getUserLinkedinProfiles();
        }
    }, [linkedinAccounts]);
    console.log("Linkedin Profile Data : ", linkedinProfileData && linkedinProfileData[0]?.user);
    console.log("Linkedin Organization Data : ", linkedinOrganizationData);

    useEffect(() => {
        if (linkedinOrganizationId) {
            getLinkedinOrganizationsProfiles();
        }
    }, [linkedinOrganizationId]);


    const selectedaccountTemplate = (option) => {
        if (!option) return <span>Select a account</span>;

        return (
            <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">
                <img
                    src={"/images/createPostImages/linkdin.png"}
                    alt={"linkedin"}
                    className="w-5 h-5 rounded-full"
                />
                <span className="font-medium">{option.user.name}</span>

                <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedaccount(
                            selectedaccount.filter((c) => c.user.name !== option.user.name)
                        );
                    }}
                >
                    <CiCircleRemove />
                </button>
            </div>
        );
    };

    const accountOptionTemplate = (option) => (
        <div className="flex items-center justify-between w-full px-2 py-1">
            <span className="font-medium">{option.user.name}</span>
            <img
                src={option.image}
                alt={option.name}
                className="w-5 h-5 rounded-full"
            />
        </div>
    );

    const handleSelectButton = (type) => {
        setSelectedButton(type);

    };


    // Post Submit 
    const HandleSubmit = () => {
        // console.log({ postCaption, privacy, formImage, selectedaccount, fileType, formVideo });
        postLinkedin({ postCaption, privacy, formImage, selectedaccount, fileType, formVideo  });
    }

    // Image Upload handle
    const handleFileChange = async (e) => {
        try {

            const images = Array.from(e.target.files);

            const imagesUrl = images.map(file => URL.createObjectURL(file));
            setPostImages(prev => [...prev, ...imagesUrl]);
            setFileType("image");

            // Convert images to base64 string
            const base64Images = await Promise.all(
                images.map(async (file) => {
                    const base64 = await convertToBase64(file); // Convert each file to base64
                    return { imageFile: base64 };
                })
            );

            setFormImage(prev => [...prev, ...base64Images]);
            setFormVideo([]);


        } catch (error) {
            console.log("Unable to upload Images Please Try again Later");

        }
    }

    // Video Upload handle
    const handleVideoFileChange = async(e) => {
        try {
            // converting file type into array
            const videos = Array.from(e.target.files);

            // Converting videos to url:
            const videoUrl = videos.map((file)=>URL.createObjectURL(file));
            setPostVideos(prev => [...prev,...videoUrl]);
            setFileType("video");

            // Converting video into base64 
            const base64Videos = await Promise.all(
                videos.map(async(file)=>{
                    const base64Data = await convertToBase64(file);
                    return {videoFile:base64Data};
                })
            );

            setFormVideo(prev=>[...prev,...base64Videos]);
            setFormImage([]);

            
        } catch (error) {
            console.log("Unable to upload Video File.");
        }
    }
    
    console.log("video Url Data: ",postVideos);


    
    // Function to convert a file to a Base64 string
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result); // On success, resolve with base64 string
            reader.onerror = reject; // Reject on error
            reader.readAsDataURL(file); // Read the file as base64
        });
    };


    // generate caption
    const generateCaption = ()=>{
        generatePostCaption({prompt});
    }

    return (
        <div className="w-[95%] mx-auto mt-8 flex gap-1 ">
            <div className="bg-white/50 w-[60%] z-10 flex flex-col gap-5 rounded-lg p-4 h-[80vh] scrollbar-hide overflow-y-scroll">

                {/* Social Buttons (Instagram, Facebook, Linkedin, pintrest) */}
                <div className=" flex justify-start gap-2 items-center ">
                    <button
                        className={`${selectedButton == "Instagram"
                            ? "bg-white text-[#4379EE]"
                            : "bg-[#4379EE] text-white"
                            } py-2 w-[20%] rounded-md text-sm`}
                        onClick={() => handleSelectButton("Instagram")}
                    >
                        Instagram
                    </button>
                    <button
                        className={`${selectedButton == "Facebook"
                            ? "bg-white text-[#4379EE]"
                            : "bg-[#4379EE] text-white"
                            } py-2 w-[20%] rounded-md text-sm `}
                        onClick={() => handleSelectButton("Facebook")}
                    >
                        Facebook
                    </button>
                    <button
                        className={`${selectedButton == "Linkdin"
                            ? "bg-white text-[#4379EE]"
                            : "bg-[#4379EE] text-white"
                            } py-2 w-[20%] rounded-md text-sm  `}
                        onClick={() => handleSelectButton("Linkdin")}
                    >
                        Linkdin
                    </button>
                    <button
                        className={`${selectedButton == "Pinterest"
                            ? "bg-white text-[#4379EE]"
                            : "bg-[#4379EE] text-white"
                            } py-2 w-[20%] rounded-md text-sm`}
                        onClick={() => handleSelectButton("Pinterest")}
                    >
                        Pinterest
                    </button>
                </div>

                {/* Select Post ID */}

                <div className="p-5 flex flex-col gap-2 bg-white/50 rounded-lg">
                    <h2 className=" font-bold text-lg">Posting on</h2>
                    {linkedinProfileData &&
                        <MultiSelect
                            value={selectedaccount}
                            onChange={(e) => setSelectedaccount(e.value)}
                            options={linkedinProfileData ? linkedinProfileData : ""}
                            optionLabel="name"
                            placeholder="Select Platforms"
                            filter
                            selectedItemTemplate={selectedaccountTemplate}
                            itemTemplate={accountOptionTemplate}
                            display="chip"
                            className="w-full bg-white border rounded-md px-3 py-2 shadow focus:ring-0 focus:outline-none"
                        />
                    }

                </div>


                {/* Media  Accounts  options (instagram, facebook, linkedin) */}
                <div className="p-5 flex flex-col gap-3 bg-white/50 rounded-lg">
                    <h2 className=" font-bold text-lg">Media</h2>
                    <p className="text-sm text-[#565656]">
                        Share photos or a video. Instagram posts can’t exceed 20 photos.
                    </p>
                    <div className=" flex justify-start gap-4 items-center">
                        <button className="bg-[#4379EE] text-white py-2 w-[20%] rounded-md text-sm">
                            Photos
                        </button>
                        <button className="bg-[#4379EE] text-white py-2 w-[20%] rounded-md text-sm">
                            Videos
                        </button>
                    </div>
                </div>

                {/* Post Details (caption, images, privacy etc...) */}
                <div className="p-5 flex flex-col gap-3 bg-white/50 rounded-lg">
                    <h2 className="font-bold text-lg">Post Details</h2>
                    <p className="text-sm text-[#565656]">
                        Add your caption or Let Qur AI craft a catchy one for you!
                    </p>

                    {/* Text Editor Component */}
                    <TextEditor setPostCaption={setPostCaption} />

                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 ">
                            {/* Image upload input field */}
                            <label htmlFor="imageUpload" className="input">
                                <CiImageOn className="text-[#4379EE] cursor-pointer" />
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="imageUpload"
                                multiple
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                            {/* Video upload input field */}
                            <label htmlFor="videoUpload" className="input">
                                <CiYoutube className="text-[#4379EE] cursor-pointer" />
                            </label>
                            <input
                                type="file"
                                accept="video/*"
                                id="videoUpload"
                                style={{ display: "none" }}
                                onChange={handleVideoFileChange}
                            />
                            
                            
                            <IoLocation className="text-[#4379EE]" />
                            <CiFaceSmile className="text-[#4379EE]" />
                            <LuMessageCircleMore className="text-[#4379EE]" />
                        </div>

                        <div className="flex gap-3  items-center ">
                            <p className="text-sm text-[#565656]">Let our AI do something!</p>
                            <CiHashtag className="text-[#4379EE]" />
                            <button className="bg-[#4379EE] text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2">
                                <Image
                                    src="/images/createPostImages/ai.png"
                                    width={15}
                                    height={15}
                                    alt=""
                                />
                                Assistant
                            </button>
                        </div>
                    </div>
                </div>


                {/* Schedule Post  */}
                <div className="p-5 flex justify-between bg-white/50 rounded-lg">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold text-lg">Scheduling Options</h2>
                        <p className="text-sm text-[#565656]">
                            Set your optimal posting times
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2  rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-5 peer-checked:bg-[#4379EE] after:absolute after:top-1 after:start-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                        </label>
                    </div>
                </div>


                {/* Privacy Setting (private,public etc...) */}
                <div className="p-5 flex flex-col gap-3 bg-white/50 rounded-lg">
                    <h2 className="font-bold text-lg">Privacy Settings</h2>
                    <p className="text-sm text-[#565656]">
                        Adjust visibility settings to control who sees your posts across
                        platforms
                    </p>

                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer" onClick={() => setPrivacy("Public")}>
                            <input
                                type="radio"
                                name="privacy"
                                value="public"
                                className="hidden peer"
                                defaultChecked
                            />
                            <div className="w-7 h-7 border-2 border-[#4379EE] rounded-full flex items-center justify-center peer-checked:bg-[#4379EE] peer-checked:border-transparent">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <div>
                                <span className="text-lg">Public</span>
                                <p className=" text-[#565656] text-sm">
                                    Anyone will be able to see your post.
                                </p>
                            </div>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer" onClick={() => setPrivacy("restricted")}>
                            <input
                                type="radio"
                                name="privacy"
                                value="restricted"
                                className="hidden peer"
                            />
                            <div className="w-7 h-7 border-2 border-[#4379EE] rounded-full flex items-center justify-center peer-checked:bg-[#4379EE] peer-checked:border-transparent">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <div>
                                <span className="text-lg">Restricted</span>
                                <p className=" text-[#565656] text-sm">
                                    Choose who can see your post.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Publish Button OR (Post/submit Button) */}
                <div className="p-5 flex flex-col gap-3 bg-white/50 rounded-lg">
                    <div className="flex justify-end gap-3">
                        <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md text-sm">
                            Cancel
                        </button>
                        <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md text-sm">
                            Save as Draft
                        </button>
                        <button className="bg-[#4379EE] text-white px-4 py-2 rounded-md text-sm" onClick={HandleSubmit}>{loading ? "•••" : "Publish"}

                        </button>
                    </div>
                </div>

                {/* Ai section */}
                <div className="aiSection w-[100%] bg-[#ffffff]/50 rounded-[.5rem] px-[1.25rem] py-[1.375rem]">
                    {/* Upper Container */}
                    <div className="upperAiContainer">
                        {/* Heading  */}
                        <div className="heading mb-[0.9rem]"><p className="text-[.98rem] font-bold">AI Suggestions</p></div>

                        {/* Input */}
                        <div className="textFieldBox w-[100%] h-[3.5rem] rounded-[.5rem] bg-[#ffffff] pl-[1.25rem] pr-[1.375rem] py-[0.56rem] flex gap-[3rem]">
                            <input type="text" name="aiPrompt" id="aiPrompt" placeholder="Tell me what should i generate for you!" className="w-[70%] focus:border-none focus:outline-none text-[.80rem]" onChange={(e)=>setPrompt(e.target.value)} />
                            <button onClick={generateCaption} type="button" className="bg-[#4379EE] text-[#ffffff] px-[2rem] rounded-[.5rem]">Generate</button>
                        </div>

                        {/* Suggestions */}
                        <div className="suggestionXontainer w-[50%] h-[2.78rem] flex items-center justify-between bg-[#ffffff] rounded-[.5rem] px-[.93rem] py-[0.5rem] mt-[0.75rem] text-[0.8rem] ">
                            

                            {
                                suggestionButton.map((data) => {
                                    return <p className={`cursor-pointer select-none ${data.id === activeButton ? "px-[0.75rem] py-[0.5rem] bg-[#F1F5F9] rounded-[.5rem]" : ""}`} key={data.id} onClick={() => setActiveButton(data.id)}>{data.name}</p>
                                })
                            }


                        </div>
                    </div>

                    <div className=" w-[100%] h-[.1rem] bg-[#ffffff] mt-[.65rem] mb-[0.75rem]" />

                    {/* Lower Container */}
                    <div className="lowerAiContainer flex flex-col gap-[1rem]">
                        <div className="suggestions w-[100%] h-[3rem] bg-[#ffffff]/50 flex items-center px-[0.75rem] py-[0.81rem] rounded-[.5rem]"><p className="text-[0.75rem]">{generatedCaption && generatedCaption}</p></div>
                        <div className="suggestions w-[100%] h-[3rem] bg-[#ffffff]/60 flex items-center px-[0.75rem] py-[0.81rem] rounded-[.5rem]"><p className="text-[0.75rem]">Success on social media isn’t just about posting—it’s about tracking performance, understanding engagement, and making data-driven decisions!</p></div>
                        <div className="suggestions w-[100%] h-[3rem] bg-[#ffffff]/70 flex items-center px-[0.75rem] py-[0.81rem] rounded-[.5rem]"><p className="text-[0.75rem]">Success on social media isn’t just about posting—it’s about tracking performance, understanding engagement, and making data-driven decisions!</p></div>
                    </div>

                    {/* Text Editor */}

                </div>
            </div>

            {/* Right Section */}
            <div className="bg-white/50 w-[41%] z-10 rounded-lg h-[80vh] py-[1.12rem] px-[0.68rem] overflow-y-scroll overflow-x-hidden scrollbar-hide">
                {/* heading */}
                <div className="heading"><p className="text-[0.93] font-semibold mb-[0.93rem]">Previewing on</p></div>

                {/* options */}
                <div className="options w-[100%] h-[3rem] rounded-[.5rem] bg-[#ffffff] px-[1.18rem]  py-[0.3rem] flex items-center gap-[.8rem] mb-[0.62rem]">

                    {

                        socialButton.map((data, index) => {
                            return <Image key={index} onClick={() => setActiveSocialButton(data.id)} src={data.img} width={32} height={32} alt="instagram" className={` ${data.id === activeSocialButton ? "w-[2.5rem] h-[2.4rem]" : "w-[2.rem] h-[2.rem]"} object-fill cursor-pointer `} />

                        })
                    }
                    {/* shadow-[0px_0px_22px_-3px_rgba(84,85,106,1)] */}

                    {/* <Image src="/images/postImages/facebook.png" width={32} height={32} alt="instagram" className=" w-[2.5rem] h-[2.4rem] object-fill cursor-pointer " />

                    <Image src="/images/postImages/linkedin.png" width={32} height={32} alt="instagram" className=" w-[2.rem] h-[2.rem] object-fill cursor-pointer " />

                    <Image src="/images/postImages/instagram.svg" width={32} height={32} alt="instagram" className=" w-[2rem] h-[2rem] object-fill cursor-pointer " /> */}
                </div>

                {/* Post */}
                <div className="post w-[100%] min-h-[30rem] bg-[#ffffff] rounded-[.5rem] ">

                    {/* User Detail */}
                    <div className="upperContainer h-[3.12rem] py-[.81rem] pl-[.43rem] pr-[.6rem] flex items-center justify-between">

                        <div className="leftPostDetail flex items-center">

                            <div className="avatar w-[2.25rem] h-[2.25rem] rounded-[50%] ">
                                <Image src="/images/postImages/avatar.png" width={36} height={36} alt="avatar" className="w-[100%] h-[100%] object-fill" />
                            </div>

                            <div className="name text-[0.8rem] ml-[.5rem]"><span className="text-[#000000] font-bold">qcsstudio</span> • just now</div>
                        </div>

                        <div className="rightPostDetail">
                            <p className="more text-[1rem] cursor-pointer select-none">•••</p>
                        </div>

                    </div>

                            

                    <div className={`postTextContent px-[.43rem] py-[.3rem]  ${showText ? "" : "postText"} `} dangerouslySetInnerHTML={{ __html: postCaption }}>
                    </div>
                    {postCaption.length>165 && 
                        <span className="text-[#4d7ef9] select-none cursor-pointer px-[.43rem]" onClick={() => setShowText(!showText)}>{showText ? "less" : "more"}</span>
                    }

                    {/* User Post Image */}
                    <div className={`middleContainer w-[100%] h-[24.3rem] ${postImages.length <= 0 ? "bg-[#E0E0E0]/40" : "bg-transparent"}`}>
                        <Swiper pagination={true} navigation={true} modules={[Pagination,Navigation]} className="mySwiper w-[100%] h-[24.3rem]">

                        {
                            fileType === "image" ? (
                                postImages.length === 0 ? (
                                    <div className="w-[100%] h-[100%] bg-[#E0E0E0]"></div>
                                ) : (
                                    postImages.map((item, index) => {
                                        console.log("item data",item)
                                        return <SwiperSlide key={index}>
                                            <Image
                                                src={item}
                                                width={390}
                                                height={390}
                                                alt="post"
                                                className="w-[100%] h-[100%] object-fill "
                                            />
                                        </SwiperSlide>
                                    })
                                )
                            ) : (
                                postVideos.length === 0 ? (
                                    <div className="w-[100%] h-[100%] bg-[#E0E0E0]">data</div>
                                ) : (
                                    postVideos.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <video width="320" height="240" controls className="w-[100%] h-[100%] object-fill">
                                                <source src={item} type="video/mp4" />
                                            </video>
                                        </SwiperSlide>
                                    ))
                                )
                            )
                        }


                        </Swiper>

                    </div>

                    <div className="lowerContainer h-[2.75rem] px-[.75rem] flex items-center justify-between">

                        <div className="leftContainer w-[70%] h-[100%] flex items-center gap-[1rem]">
                            <Image src="/images/postImages/like.png" width={24} height={24} alt="avatar" className="w-[1.5rem] h-[1.5rem] cursor-pointer" />
                            <Image src="/images/postImages/comment.png" width={24} height={24} alt="avatar" className="w-[1.5rem] h-[1.5rem] cursor-pointer" />
                            <Image src="/images/postImages/share.png" width={24} height={24} alt="avatar" className="w-[1.5rem] h-[1.5rem] cursor-pointer" />
                        </div>

                        <div className="rightContainer">
                            <Image src="/images/postImages/save.png" width={24} height={24} alt="avatar" className="w-[1.2rem] h-[1.5rem] cursor-pointer" />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreatePost;
