import connectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { getCookie } from "@/utils/getCookie";
import { verifyToken } from "@/utils/tokenGenerator";
import bcrypt from "bcryptjs";

export const PATCH = async(req)=>{
    try {
        const data = await req.json();

        const {newPassword,confirmPassword} = data;

        connectDB();
        const jwtToken = await getCookie("access_token");
        const token = await verifyToken(jwtToken?.value);
        const userId = token.userId;

        const userData = await User.findById(userId);
        
        if(!userData){
            return Response.json({message:"Unable to Change Password (no user Exist's)!",data:"no user exist",status:501,success:false},{status:501})
        }

        const newHashedPassword = await bcrypt.hash(newPassword,10);

        const changedPasswordUser = await User.findByIdAndUpdate(userId,{password:newHashedPassword},{new:true});

        return Response.json({message:"Password Change Successfully",data:changedPasswordUser,status:200,success:true},{status:200});

    } catch (error) {
        console.log("Unable to change Password !",error);
        return Response.json({message:"Unable to change Password (Server Error)!",error:error,success:false,status:500},{status:500});
    }
}