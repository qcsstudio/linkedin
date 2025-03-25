import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
   postSchema:{
    type:String,
   },
   privacy:{
    type:String,
   },
   formImage:{
    type:[String],
   },
   selectedAccount:{
    type:[String],
   }

  }, { timestamps: true });

const Post = mongoose.model("SchedulePost", postSchema);

module.exports = Post;