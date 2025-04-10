"use client";
import { createContext, useState } from "react";

const blogIntialData = {
  blogData: {},
  setblogData: () => {},
  multipleBlogData: [],
  setmultipleBlogData: () => {},
  showBlogsDataLoader: false,
  setShowBlogsDataLoader: () => {},
  blogLoadingStatus: false,
  setBlogLoadingStatus: () => {}
};

export const BlogDataContext = createContext(blogIntialData);

export const BlogDataContextProvider = ({ children }) => {
  const [blogData, setblogData] = useState(blogIntialData.blogData);
  const [multipleBlogData, setmultipleBlogData] = useState(blogIntialData.multipleBlogData);
  const [showBlogsDataLoader, setShowBlogsDataLoader] = useState(blogIntialData.showBlogsDataLoader);
  const [blogLoadingStatus, setBlogLoadingStatus] = useState(blogIntialData.blogLoadingStatus);

  const GetBlogData = async () => {
    setBlogLoadingStatus(true);
    try {
      const res = await fetch("/api/blogs/");
      if (res.status === 200) {
        const result = await res.json();
        setmultipleBlogData(result.blog_data);
      }
    } catch (error) {
      console.error("Failed to fetch blogs: ", error);
    } finally {
      setBlogLoadingStatus(false);
    }
  };

  const GetSingleBlogData = async (slug) => {
    setShowBlogsDataLoader(true);
    try {
      const res = await fetch(`/api/blogs/${slug}`);
      if (res.status === 200) {
        const result = await res.json();
        setblogData(result.blog_data);
      }
    } catch (error) {
      console.error("Failed to fetch blog: ", error);
    } finally {
      setShowBlogsDataLoader(false);
    }
  };

  const PostBlogData = async (title, thumbnail, showOnFront, description, metaTitle, metaDescription) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, thumbnail, showOnFront, description, metaTitle, metaDescription })
      });

      const data = await res.json();
      console.log("Post Blog API Response:", data);

      if (res.status === 200) {
        setmultipleBlogData(data.blog_data);
      } else {
        alert("Blog not posted! Check response.");
      }
    } catch (error) {
      console.error("Upload Error: ", error);
      alert("Upload Error! Check console.");
    }
  };

  const UpdateBlog = async (slug, data) => {
    try {
      const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (res.status === 200) {
        const result = await res.json();
        setmultipleBlogData(result.blog_data);
      }
    } catch (error) {
      console.error("Update Error: ", error);
    }
  };

  const DeleteBlog = async (slug) => {
    try {
      const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, {
        method: "DELETE"
      });
      if (res.status === 200) {
        const result = await res.json();
        setmultipleBlogData(result.blog_data);
      }
    } catch (error) {
      console.error("Delete Error: ", error);
    }
  };

  return (
    <BlogDataContext.Provider
      value={{
        blogData,
        setblogData,
        multipleBlogData,
        setmultipleBlogData,
        GetBlogData,
        GetSingleBlogData,
        PostBlogData,
        UpdateBlog,
        DeleteBlog,
        showBlogsDataLoader,
        setShowBlogsDataLoader,
        blogLoadingStatus,
        setBlogLoadingStatus
      }}
    >
      {children}
    </BlogDataContext.Provider>
  );
};
