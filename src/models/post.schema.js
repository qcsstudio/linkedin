import mongoose from "mongoose";

const SchedulePostSchema = new mongoose.Schema({
  formImage: [
    {
      imageFile: { type: String, required: true } // Base64 image data
    }
  ],
  postCaption: { type: String, required: true }, // HTML formatted caption
  privacy: { type: String, enum: ["Public", "Private"], default: "Public" }, // Privacy setting
  selectedAccount: [
    {
      organizations: [
        {
          organizationalTarget: { type: String, required: true }, // Organization ID (URN)
          role: { type: String, required: true }, // Role (ADMINISTRATOR)
          roleAssignee: { type: String, required: true }, // Role Assignee ID (URN)
          state: { type: String, required: true } // State (APPROVED)
        }
      ],
      token: { type: String, required: true } // Authorization token
    }
  ],
  user: {
    email: { type: String, required: true }, // User email
    email_verified: { type: Boolean, required: true }, // Email verification status
    family_name: { type: String, required: true }, // User's last name
    given_name: { type: String, required: true }, // User's first name
    locale: {
      country: { type: String, required: true }, // Country code (e.g., US)
      language: { type: String, required: true } // Language code (e.g., en)
    },
    name: { type: String, required: true }, // Full name
    picture: { type: String, required: true }, // Profile picture URL
    sub: { type: String, required: true } // Unique user ID
  }
}, { timestamps: true });

const SchedulePost = mongoose.models.SchedulePost || mongoose.model("SchedulePost", SchedulePostSchema);
export default SchedulePost;
