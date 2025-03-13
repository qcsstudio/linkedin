import connectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { verifyToken } from "@/utils/tokenGenerator";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const PATCH = async(req) => {
    try {
        await connectDB();
        const data = await req.json();

        // getting access_token from Cookie
        const cookieStore = cookies();
        const jwtToken = await cookieStore.get("access_token");
        console.log('JWT Token',jwtToken);
        const userObject = await verifyToken(jwtToken.value);
        const {userId} = userObject;

        // Updating User
        const updatedUser = await User.findByIdAndUpdate(userId,{planType:data},{new:true});
        console.log(updatedUser);

        console.log("Plan Updated !");


        return NextResponse.json({message:"plan Updated !",userData:updatedUser},{status:200});
    } catch (error) {
        console.log("Plan Not Updated !");
        return NextResponse.json({message:"Unable to Update Plan !"},{status:500});
    }
}