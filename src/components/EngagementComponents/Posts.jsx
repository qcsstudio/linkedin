"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { userContext } from "@/Context/user.context";
import { Dropdown } from "primereact/dropdown";
import { CiCircleRemove } from "react-icons/ci";
import postContext from "@/Context/post.context";
import { getLinkedinAccounts } from "@/utils/getLinkedinAccounts";

const Posts = ({ data , selectedOrganization }) => {
  // Use States
  const [replyBoxOpen, setReplyBoxOpen] = useState({});
  const [replyText, setReplyText] = useState({});
  const [replies, setReplies] = useState({}); // Temporary local state to simulate replies
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedCommentURN, setSelectedCommentURN] = useState("");
  const [selectedCommentObject, setSelectedCommentObject] = useState("");
  const [replyAccountOption,setReplyAccountOption] = useState([]);
  const [replySelectedAccount,setReplySelectedAccount] = useState(null);
  const [comment,setComment] = useState("");

  // Use Context
  const { userData, getUserLinkedinProfiles, linkedinProfileData, linkedinAccounts, getLinkedinOrganizationsProfiles, linkedinOrganizationId, linkedinOrganizationData,linkedinCombinedData } = useContext(userContext);

  const { nestedComment,postComment,loading,commentSuccess,setCommentSuccess } = useContext(postContext);





  // Use Effect
  useEffect(() => {
    if (linkedinAccounts) {
      getUserLinkedinProfiles();
    }

  }, [linkedinAccounts]);


  useEffect(() => {
      if(commentSuccess == true){
        setComment("");
        setSelectedAccount(null);
        setCommentSuccess(false);
      }

  }, [commentSuccess]);



  // Use Effect
  useEffect(() => {
    const URN = selectedOrganization[`$URN`];
    console.log("Selected organization :",  selectedOrganization.id,selectedOrganization.vanityName);
    if (linkedinProfileData) {
      console.log("Linkedin Profile Data Receives : +++++++++ ",linkedinProfileData);
      const values = linkedinProfileData.filter((item,index)=>{
          console.log("needed ORganization : ",URN);
          if(item.organizations.length > 0){

            return item.organizations.some((val)=>val.organizationalTarget === URN)
          }

      });

      const ownerOfOrganization = {
        token:values[0]?.token,
        type:'person',
        uniqueId:values[0]?.user?.sub,
        name:values[0]?.user?.name
      }
      const selectedOrganizationData = {
        token:selectedOrganization?.token,
        type:'organization',
        uniqueId:selectedOrganization?.id,
        name:selectedOrganization?.vanityName
      }
      setReplyAccountOption(prev=>{
        const map = new Map();
        [...prev,ownerOfOrganization].forEach((val)=>{
            map.set(`${val.uniqueId}-${val.type}`,val);
        })
        return Array.from(map.values());
      });
      setReplyAccountOption(prev=>{
        const map = new Map();
        [...prev,selectedOrganizationData].forEach((val)=>{
            map.set(`${val.uniqueId}-${val.type}`,val);
        })
        return Array.from(map.values());
      });
    }

  }, [linkedinProfileData]);

  // Togel Reply Button
  const toggleReplyBox = (postIndex, commentIndex) => {
    setReplyBoxOpen((prev) => ({
      ...prev,
      [`${postIndex}-${commentIndex}`]: !prev[`${postIndex}-${commentIndex}`],
    }));
  };

  // Handle Reply Change input
  const handleReplyChange = (postIndex, commentIndex, value, comment) => {
    // console.log("Trigger Comment", comment);
    setSelectedCommentURN(comment['$URN']);
    setSelectedCommentObject(comment['object']);
    setReplyText((prev) => ({
      ...prev,
      [`${postIndex}-${commentIndex}`]: value,
    }));
  };

  // Handle Reply Submit input
  const handleReplySubmit = (postIndex, commentIndex) => {
    const key = `${postIndex}-${commentIndex}`;
    const newReply = replyText[key]?.trim();
    if (!newReply) return;
    const replyComment = replyText[key];
    nestedComment({ replySelectedAccount, replyComment, selectedCommentURN, selectedCommentObject });

    setReplies((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newReply],
    }));
    setReplyText((prev) => ({ ...prev, [key]: "" }));
    setReplyBoxOpen((prev) => ({ ...prev, [key]: false }));
  };


  if (!data || data.length === 0) {
    return <p className="text-gray-500">No posts available.</p>;
  }


  // Code for Drop Down 


  const handleAccountRemove = (e) => {
    e.stopPropagation();
    setSelectedAccount(null);
    getAllOrganizationsData(linkedinOrganizationData);
  };

  const accountOptionTemplate = (option) => (
    <div className="flex items-center justify-between w-full px-2 py-1">
      <span className="font-medium">{option.name}</span>
    </div>
  );

  const selectedAccountTemplate = (option) =>
    !option ? (
      <span>Select an account</span>
    ) : (
      <div className="flex items-center gap-2 flex-nowrap overflow-x-auto">
        <Image
          src={"/images/createPostImages/linkdin.png"}
          alt="linkedin"
          width={50}
          height={50}
          className="w-5 h-5 rounded-full"
        />
        <span className="font-medium">{option.name}</span>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={handleAccountRemove}
        >
          <CiCircleRemove />
        </button>
      </div>
    );


    // Code for comment
    const submitComment = async(e,index)=>{
      e.preventDefault();
      const postId = data[index].activity;
      await postComment({selectedAccount,comment,postId});

    }


  return (
    <div className="space-y-6">
      {data.map((post, index) => {
        const text = post.text?.text || "No content available";
        const createdAt = new Date(post.created?.time || post.createdAt).toLocaleString();
        const image = post.content?.contentEntities?.[0]?.thumbnails?.[0]?.resolvedUrl;
        const comments = post.comments || [];

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
          >
            {/* Post Section */}
            <div className="flex flex-col md:flex-row gap-4 p-4">
              {image && (
                <div className="flex-shrink-0 w-full md:w-48 h-32 relative rounded-md overflow-hidden">
                  <Image
                    src={image}
                    alt="Post thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-grow space-y-2">
                <h3 className="text-gray-800 font-semibold text-lg">
                  Post #{index + 1}
                </h3>
                <p className="text-gray-700 whitespace-pre-line z-20">{text}</p>
                <p className="text-sm text-gray-500 z-20">Posted on: {createdAt}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 z-20" />

            {/* Comments Section */}
            <div className="bg-gray-50 px-4 py-3">
              <h4 className="text-blue-600 font-semibold text-sm mb-2 z-20">Comments</h4>

              {/* Comment Box */}
              <div className="commentBox w-[100%] bg-white px-[.5rem] py-[.5rem] border border-[#e1e1e1] rounded-[.4rem] mb-[1rem]">
                <form onSubmit={(e)=>submitComment(e,index)} className="commentBox w-[100%] bg-white px-[.5rem] py-[.5rem] border border-[#e1e1e1] rounded-[.4rem] mb-[1rem]"> 

                
                <textarea name="comment" id="" cols="50" className="w-[100%] focus:outline-none" placeholder="Add a comment..." value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                <div className="postButtonContainer w-[100%] flex justify-between mt-[1rem]">
                  {linkedinCombinedData && (
                    <div className="w-[30%]">
                      <Dropdown
                        value={selectedAccount}
                        onChange={(e) => setSelectedAccount(e.value)}
                        options={linkedinCombinedData}
                        optionLabel="vanityName"
                        placeholder="Select Platform"
                        className="w-full md:w-14rem border border-[#9b9b9b] outline-none focus:outline-none z-20"
                        itemTemplate={accountOptionTemplate}
                        valueTemplate={selectedAccountTemplate}
                      />
                    </div>
                  )}
                  <button className="px-[2rem] py-[.4rem] bg-[#3B82F6] hover:bg-[#165ca2] rounded-[.3rem]  text-[#ffffff]" >Post</button>
                  
                </div>
                </form>
              </div>


              {comments.length === 0 ? (
                <p className="text-sm text-gray-400 italic z-20">No comments available.</p>
              ) : (
                <div className="space-y-4 z-20" >
                  {comments.map((comment, commentIdx) => {
                    const commentKey = `${index}-${commentIdx}`;
                    const replyList = replies[commentKey] || [];

                    return (
                      <div
                        key={commentIdx}
                        className="bg-white p-3 rounded-md shadow-sm border space-y-2 z-20"
                      >
                        <p className="text-sm text-gray-800">
                          {comment.message?.text || "No comment text"}
                        </p>

                        {/* Show previous replies */}
                        {replyList.length > 0 && (
                          <div className="ml-4 space-y-1">
                            {replyList.map((r, i) => (
                              <p key={i} className="text-sm text-gray-600 italic z-20">
                                ↳ {r}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Toggle Reply Box */}
                        {replyBoxOpen[commentKey] ? (
                          <div className="space-y-2 mt-2">
                            <textarea
                              className="w-full border rounded-md px-2 py-1 text-sm z-20"
                              rows={2}
                              value={replyText[commentKey] || ""}
                              onChange={(e) =>
                                handleReplyChange(index, commentIdx, e.target.value, comment)
                              }
                              placeholder="Write your reply..."
                            />
                            <div className="flex gap-2 justify-between">
                              <div className="accountSelect w-[30%]">
                                {replyAccountOption && (
                                  <div className="w-[100%]">
                                    <Dropdown
                                      value={replySelectedAccount}
                                      onChange={(e) => setReplySelectedAccount(e.value)}
                                      options={replyAccountOption}
                                      optionLabel="vanityName"
                                      placeholder="Select Platform"
                                      className="w-full md:w-14rem border border-[#9b9b9b] outline-none focus:outline-none z-20"
                                      itemTemplate={accountOptionTemplate}
                                      valueTemplate={selectedAccountTemplate}
                                    />
                                  </div>
                                )}
                              </div>

                              <div className="actionButtons  flex justify-between gap-[1.5rem] py-[.5rem]">

                                <button
                                  onClick={() => handleReplySubmit(index, commentIdx)}
                                  className="px-7 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 z-20"
                                >
                                  Reply
                                </button>
                                <button
                                  onClick={() => toggleReplyBox(index, commentIdx)}
                                  className="px-7 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 z-20"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleReplyBox(index, commentIdx)}
                            className="text-blue-500 text-sm mt-1 hover:underline z-20"
                          >
                            Reply
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
