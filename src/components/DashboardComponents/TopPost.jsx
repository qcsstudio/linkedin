import Image from "next/image";
import React from "react";

function TopPost({ data }) {
  if (!data) return <p>No top post data available</p>;

  const {
    text = "No caption available",
    content,
    impressions = 0,
    clicks = 0,
    likes = 0,
    comments = 0,
    createdAt,
  } = data;

  const imageUrl =
    content?.contentEntities?.[0]?.thumbnails?.[0]?.resolvedUrl ||
    "/images/dashboardImages/recentpost.png";

  const createdDate = new Date(createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Top Performing Post</h2>

      <div className="flex flex-row gap-4 items-start">
        <div className="w-[110px] h-[85px] relative rounded-md overflow-hidden border">
          <Image
            src={imageUrl}
            alt="Top Post Image"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <p className="font-semibold text-[15px] text-gray-800 truncate">
            {text}
          </p>
          <p className="text-gray-400 text-sm">{createdDate}</p>

          <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-gray-600">
            <div>👀 Impressions: <b>{impressions}</b></div>
            <div>❤️ Likes: <b>{likes}</b></div>
            <div>💬 Comments: <b>{comments}</b></div>
            <div>🖱️ Clicks: <b>{clicks}</b></div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="text-sm px-4 py-1.5 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
          View In Detail
        </button>
      </div>
    </div>
  );
}

export default TopPost;
