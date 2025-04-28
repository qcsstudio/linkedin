"use client";

import React, { useEffect, useState } from "react";

export default function InstagramPage() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstagramData() {
      try {
        const res = await fetch("/api/instagram/posts");
        const data = await res.json();

        if (data.success) {
          setProfile(data.profile);
          setPosts(data.posts);
        } else {
          console.error("Error fetching Instagram data:", data.error);
        }
      } catch (err) {
        console.error("Error fetching Instagram data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading Instagram Data...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Failed to load Instagram Profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={profile.profile_picture_url}
          alt="Profile Picture"
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
        />
        <h1 className="text-2xl font-bold mt-4">{profile.username}</h1>
        <p className="text-gray-600">
          Followers: {profile.followers_count.toLocaleString()} | Posts: {profile.media_count}
        </p>
      </div>

      {/* Posts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            {post.media_type === "VIDEO" ? (
              <video src={post.media_url} controls className="w-full h-64 object-cover" />
            ) : (
              <img src={post.media_url} alt={post.caption || "Instagram Post"} className="w-full h-64 object-cover" />
            )}
            <div className="p-4">
              <p className="text-sm text-gray-700 truncate">{post.caption || "No Caption"}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(post.timestamp).toLocaleString()}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
