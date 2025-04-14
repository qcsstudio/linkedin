"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BlogDataContext } from "@/Context/Blogs.context";
import Image from "next/image";
import dynamic from "next/dynamic";
import NoSSRWrapper from "./NoSSRWrapper";

// Dynamically import JoditReact with SSR disabled
const JoditReact = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});


const UploadBlogs = ({ setADD }) => {
  const { PostBlogData, GetBlogData } = useContext(BlogDataContext);

  const [title, setTitle] = useState("");
  const [imageShow, setImageShow] = useState(null);
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [showOnFront, setShowOnFront] = useState(false);
  useEffect(() => {
    GetBlogData();
  }, []);

  const router = useRouter();

  const processImage = (link) => {
    const match = link.match(/file\/d\/(.*)\/view/);
    return match ? `https://lh3.googleusercontent.com/d/${match[1]}=w1000` : link;
  };

  const handleImageChange = (e) => {
    const file = processImage(e.target.value);
    setThumbnail(file);
    setImageShow(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalTitle = title.toLowerCase().trim().replace(/\s+/g, '_');

    PostBlogData(finalTitle, thumbnail, showOnFront, description, metaTitle, metaDescription);
    setADD(false);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-scroll overflow-x-hidden">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-end">
          <button
            onClick={() => setADD(false)}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-4">Upload Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Enter Blog Title"
            type="text"
            name="heading"
            id="heading"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
          />

          <input
            type="text"
            placeholder="Enter Image URL"
            onChange={handleImageChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg"
          />
          {imageShow && imageShow.startsWith("http") && (
            <div className="flex justify-center">
              <Image src={imageShow} width={100} height={100} alt="Preview" className="rounded-md" />
            </div>
          )}

          <input
            placeholder="Enter Meta Title"
            type="text"
            name="metaTitle"
            id="metaTitle"
            onChange={(e) => setMetaTitle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
          />

          <input
            placeholder="Enter Meta Description"
            type="text"
            name="metaDescription"
            id="metaDescription"
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring focus:ring-blue-200"
          />

          <NoSSRWrapper>
            <JoditReact
              onChange={(content) => setDescription(content)}
              defaultValue={description}
              config={{
                askBeforePasteHTML: false,
                askBeforePasteFromWord: false,
                enableDragAndDropFileToEditor: false,
                uploader: {
                  insertImageAsBase64URI: true,
                },
              }}
            />
          </NoSSRWrapper>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="show_on_front"
              id="show_on_front"
              onChange={(e) => setShowOnFront(e.target.checked)}
              className="w-5 h-5"
            />
            <label htmlFor="show_on_front" className="text-gray-700">
              Show on Front
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition w-full md:w-1/2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBlogs;
