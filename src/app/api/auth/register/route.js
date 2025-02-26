import ConnectDB from "@/libs/mongodb";
import User from "@/models/user"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async(req)=>{
    try {
        await ConnectDB();
        const data = await req.json();

        const {firstName,lastName,email,phoneNumber,password} = data;

        // Checking Role
        if(!data.role){
            data.role = "admin";
        }

        // Empty Field Check
        if(!firstName || !lastName || !email || !phoneNumber || !password ){
            return NextResponse.json({message:"All Fields Required! "},{status:400});
        }
        console.log("Empty Field Pass");

        // User Check 
        const userEmailExist = await User.findOne({email});
        const userPhoneExist = await User.findOne({phoneNumber});
        if(userEmailExist || userPhoneExist){
            return NextResponse.json({message:"User Already Exist ! "},{status:409});  
        }
        console.log("User Exist Pass");

        // Password Hash
        const hashedPassword = await bcrypt.hash(password,10);

        // User Create
        const newUser = new User({firstName,lastName,email,phoneNumber,password:hashedPassword,roles:data.role});
        const SavedUser = await newUser.save();
        console.log("User Save Pass");

        // // Send Response
        // const 

        return NextResponse.json({message:"User Post Successfully",data:SavedUser},{status:200});
    } catch (error) {
        console.log("User Register Error !!!");
        return NextResponse.json({message:"User Register Failed",error:error},{status:500});
    }
}