import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }
},{timestamps:true});

const Users = mongoose.models.User || mongoose.model("User",userSchema);
export default Users;