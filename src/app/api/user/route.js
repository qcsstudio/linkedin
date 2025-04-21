import connectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { getCookie } from "@/utils/getCookie";
import { verifyToken } from "@/utils/tokenGenerator";


export const PATCH = async(req)=>{

    try {
        await connectDB();
        const data = await req.json();
        console.log("User Data Pass : ",data);

        const jwt_data = await getCookie("access_token");
        const token = await verifyToken(jwt_data.value);
        const userId = token?.userId;
        console.log("User Token PASS : ",userId);
        
        const oldEmail = await setOldEmail(userId);

        if(!oldEmail){
            return Response.json({message:"Unable to Update User!",status:500,success:false},{status:500});
        }

        const userData = await User.findByIdAndUpdate(userId,{...data,$push:{oldEmail:oldEmail}},{new:true});
        console.log("User Updated : ",userData);

        const { password, ...user_data } = userData._doc;
        console.log("User Data without Password:",user_data);

        return Response.json({message:"User Data Updated Successfully",data:user_data,success:true,status:200},{status:200});



    } catch (error) {
        console.log("Unable to update User Data (Backend) : ",error );
        return Response.json({message:"Server Error Unable to update user data",success:false,status:500},{status:500});
    }

}


const setOldEmail = async(userId)=>{
    try {
        await connectDB();

        const userData = await User.findById(userId);

        return userData?.email;
        
    } catch (error) {
        console.log("Unable to update old email array! ",error);
        return false;
    }
}