"use client";
import React, { useState } from "react";
import Image from "next/image";

const Posts = ({ data }) => {
  const [replyBoxOpen, setReplyBoxOpen] = useState({});
  const [replyText, setReplyText] = useState({});
  const [replies, setReplies] = useState({}); // Temporary local state to simulate replies

  const toggleReplyBox = (postIndex, commentIndex) => {
    setReplyBoxOpen((prev) => ({
      ...prev,
      [`${postIndex}-${commentIndex}`]: !prev[`${postIndex}-${commentIndex}`],
    }));
  };

  const handleReplyChange = (postIndex, commentIndex, value) => {
    setReplyText((prev) => ({
      ...prev,
      [`${postIndex}-${commentIndex}`]: value,
    }));
  };

  const handleReplySubmit = (postIndex, commentIndex) => {
    const key = `${postIndex}-${commentIndex}`;
    const newReply = replyText[key]?.trim();
    if (!newReply) return;

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
                <p className="text-gray-700 whitespace-pre-line">{text}</p>
                <p className="text-sm text-gray-500">Posted on: {createdAt}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Comments Section */}
            
            <div className="bg-gray-50 px-4 py-3">
              <h4 className="text-blue-600 font-semibold text-sm mb-2">Comments</h4>
              {comments.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No comments available.</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment, commentIdx) => {
                    const commentKey = `${index}-${commentIdx}`;
                    const replyList = replies[commentKey] || [];

                    return (
                      <div
                        key={commentIdx}
                        className="bg-white p-3 rounded-md shadow-sm border space-y-2"
                      >
                        <p className="text-sm text-gray-800">
                          {comment.message?.text || "No comment text"}
                        </p>

                        {/* Show previous replies */}
                        {replyList.length > 0 && (
                          <div className="ml-4 space-y-1">
                            {replyList.map((r, i) => (
                              <p key={i} className="text-sm text-gray-600 italic">
                                ↳ {r}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Toggle Reply Box */}
                        {replyBoxOpen[commentKey] ? (
                          <div className="space-y-2 mt-2">
                            <textarea
                              className="w-full border rounded-md px-2 py-1 text-sm"
                              rows={2}
                              value={replyText[commentKey] || ""}
                              onChange={(e) =>
                                handleReplyChange(index, commentIdx, e.target.value)
                              }
                              placeholder="Write your reply..."
                            />
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => handleReplySubmit(index, commentIdx)}
                                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                Reply
                              </button>
                              <button
                                onClick={() => toggleReplyBox(index, commentIdx)}
                                className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => toggleReplyBox(index, commentIdx)}
                            className="text-blue-500 text-sm mt-1 hover:underline"
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
