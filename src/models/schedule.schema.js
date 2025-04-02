import mongoose from "mongoose";

const SchedulePostSchema = new mongoose.Schema(
    {
        userId: { 
            type: String,
            default:null
        },

        fileType:{
            type:String
        },

        formImage: [String],

        formVideo: String,

        postCaption: { 
            type: String
        },

        privacy: { 
            type: String, 
            default: "Public" 
        },

        selectedAccount: [
            {
                linkedinId:{
                    type:String,
                    required:true
                },
                linkedinToken: { 
                    type: String, 
                    required: true 
                }, 
            },
        ],

        scheduled: {
            type: String,
            default: "schedule"
        },
        scheduleTime:{
            type:Number
        }
    },{ timestamps: true });

const SchedulePost = mongoose.models.SchedulePost || mongoose.model("SchedulePost",SchedulePostSchema);
export default SchedulePost;