import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming there’s a User model
      required: true,
    },
    postDescription: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      enum: ["Public", "Private", "Friends"], // Ensuring valid privacy options
      required: true,
    },
    formImage: [
      {
        name: { type: String, required: true },
        lastModified: { type: Number, required: true },
        lastModifiedDate: { type: Date, required: true },
        size: { type: Number, required: true },
        type: { type: String, required: true }, // e.g., "image/png"
        webkitRelativePath: { type: String, default: "" },
      },
    ],
    selectedAccount: [
      {
        user: {
          email: { type: String, required: true },
          email_verified: { type: Boolean, default: false },
          family_name: { type: String, required: true },
          given_name: { type: String, required: true },
          name: { type: String, required: true },
          locale: {
            country: { type: String, required: true },
            language: { type: String, required: true },
          },
          picture: { type: String, required: true }, // Profile image URL
          sub: { type: String, required: true }, // Unique user ID
        },
        token: { type: String, required: true }, // Authentication token
        organizations: [
          {
            orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
            name: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Prevent multiple model declarations in Next.js
const Post = mongoose.models.SchedulePost || mongoose.model("SchedulePost", postSchema);

export default Post;
