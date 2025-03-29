import mongoose from "mongoose";

const SchedulePostSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Only storing user ID

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
    scheduled:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const SchedulePost =
  mongoose.models.SchedulePost || mongoose.model("SchedulePost", SchedulePostSchema);
export default SchedulePost;
