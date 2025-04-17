import connectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { getCookie } from "@/utils/getCookie";
import { verifyToken } from "@/utils/tokenGenerator";
import bcrypt from "bcryptjs"

export const POST = async(req)=>{

    try {
        const data = await req.json();
        const {password} = data;
        connectDB();

        const jwt_data = await getCookie("access_token");
        const token = await verifyToken(jwt_data?.value);
        const userId = token.userId;

        const userData = await User.findById(userId);

        if(!userData){
            return Response.json({message:"Unable to verify User",success:false,status:404},{status:404})
        }

        const passwordMatch = await bcrypt.compare(password,userData.password);

        if(passwordMatch){
            return Response.json({message:"User Verified Successfully",status:201,success:true},{status:200});
        }else{
            return Response.json({message:"User Password Incorrect!",status:401,success:false},{status:201});
        }

    } catch (error) {
        console.log("Unable to verify password (Backend): ",error);
        return Response.json({message:"Server Error Unable to Verify Password",success:false,status:500},{status:500});
        
    }

}