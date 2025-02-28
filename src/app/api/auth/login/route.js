import connectDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {serialize} from "cookie";
import { generateToken } from "@/utils/tokenGenerator";

export const POST = async(req) => {
    
    try {
        
        await connectDB();
        const data = await req.json();

        const {email} = data;

        // Empty Field Check
        if(!email || !data.password){
            return NextResponse.json({message:"All Fields Required"},{status:400});
        }
        console.log("Empty Field Pass");

        // User Check
        const userExist = await User.findOne({email});

        if(!userExist){
            return NextResponse.json({message:"User Not Register !"},{status:404});
        }
        console.log("User Exist Pass");

        // Password Match
        const passwordMatch = await bcrypt.compare(data.password,userExist.password);

        if(!passwordMatch){
            return NextResponse.json({message:"Incorrect credential"},{status:409});
        }
        console.log("Password Match Pass");

        const userId = userExist._id;

        // Jwt Create
        const token = await generateToken({userId});


        if(!token){
            return NextResponse.json({message:"Server Not Able To Generate Token"},{status:500});
        }

        // Setting Cookie
        const cookie = serialize("access_token",token,{
            httpOnly:true,
            sameSite:"strict",
            path:"/",
            maxAge: 60 * 60 * 24
        });
        console.log("Cookie Creation Pass");


        // sending response
        const  {password,...userData} = userExist._doc;

        const response = NextResponse.json({message:"User Logined In Successfully",data:userData},{status:200});
        response.headers.set("Set-Cookie",cookie);



        return response;

    } catch (error) {
        console.log("User Login Error");
        return NextResponse.json({message:"User Login Failed"},{status:500});
    }
}