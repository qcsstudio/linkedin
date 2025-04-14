import React from "react";

const PostCard = ({ post }) => {
  const {
    text,
    created,
    analytics,
    content
  } = post;

  const formattedDate = new Date(created?.time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const image =
    content?.contentEntities?.[0]?.thumbnails?.[0]?.resolvedUrl ||
    "/placeholder.jpg";

  const postText = text?.text || "Post Title Here";
  const stats = analytics?.[0]?.totalShareStatistics || {};

  return (
    <div className="flex items-start gap-3 bg-white/90 rounded-lg shadow-sm p-3 hover:shadow-md transition-all duration-300 border border-gray-200">
      <img
        src={image}
        alt="Post Visual"
        className="w-[50px] h-[60px] object-cover rounded-md border border-gray-200"
      />
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
          {postText}
        </h3>
        <p className="text-[11px] text-gray-400 mb-1">{formattedDate}</p>
        <div className="flex justify-between text-[11px] text-gray-600 mt-1">
          <span className="flex items-center gap-1">
            ❤️ {stats.likeCount || 0} <span className="text-[10px]">Likes</span>
          </span>
          <span className="flex items-center gap-1">
            💬 {stats.commentCount || 0} <span className="text-[10px]">Comments</span>
          </span>
          <span className="flex items-center gap-1">
            🔁 {stats.shareCount || 0} <span className="text-[10px]">Shares</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
   