import connectDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const GET = async(req) => {
    try {

        await connectDB();
        const {email,password} = await req.json();

        // Empty Field Check
        if(!email || !password){
            return NextResponse({message:"All Fields Required"},{status:400});
        }
        console.log("Empty Field Pass");

        // User Check
        const userExist = await User.findOne({email});

        if(!userExist){
            return NextResponse({message:"User Not Register !"},{status:404});
        }
        console.log("User Exist Pass");

        // Password Match
        const passwordMatch = await bcrypt.compare(password,userExist.password);
        console.log("Password Match : ",passwordMatch);

        if(!passwordMatch){
            return NextResponse({message:"Incorrect credential"},{status:409});
        }
        console.log("Password Match Pass");

        // Jwt Create




    } catch (error) {
        console.log("User Login Error");
        return NextResponse({message:"User Login Failed"},{status:500});
    }
}