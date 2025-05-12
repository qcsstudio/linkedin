import ConnectDB from "@/libs/mongodb";
import User from "@/models/user.schema"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Client from "@/models/client.schema";
import { serialize } from "cookie";
import { generateToken, verifyToken } from "@/utils/tokenGenerator";
import { getCookie } from "@/utils/getCookie";

export const POST = async(req)=>{
    try {
        await ConnectDB();
        const data = await req.json();

        let {firstName,lastName,email,planType,role,phone,country} = data;
        console.log("Data in backend",data);
        const Password = data.password;
        // Checking Role
        if(!role){
            role = "admin";
        }
        
        let cookieUserId;
        // if role exist
        if(role != "admin"){
            const jwt_data = await getCookie("access_token");
            const token = await verifyToken(jwt_data?.value);
            cookieUserId = token?.userId;
        }

        // Checking PlanType
        if(!planType){
            planType = "single";
        }

        // Empty Field Check
        if(!firstName || !lastName || !email  || !Password ){
            return NextResponse.json({message:"All Fields Required! "},{status:400});
        }

        // User Check 
        const userEmailExist = await User.findOne({email});
        if(userEmailExist ){
            return NextResponse.json({message:"User Already Exist ! "},{status:409});  
        }

        // Password Hash
        const hashedPassword = await bcrypt.hash(Password,10);

        // User Create
        let SavedUser
        if(role === "admin"){
            const newUser = new User({firstName,lastName,email,password:hashedPassword,role,planType,phone,country});
            SavedUser = await newUser.save();
        }else{
            // getting client detail
            const creatorData = await User.findById(cookieUserId);
            const {clientDetail} = creatorData;

            // creating user
            const newUser = new User({firstName,lastName,email,password:hashedPassword,role,planType,phone,clientDetail});
            SavedUser = await newUser.save();

            // updating client detail
            const updatedClient = await Client.findByIdAndUpdate(clientDetail?.id,{
                $push:{users:{id:SavedUser?._id,name:`${SavedUser?.firstName} ${SavedUser?.lastName}`,email:SavedUser?.email,avatar:SavedUser?.avatar,role:SavedUser?.role}}
            },{new:true});


        }

        const userId = SavedUser?._id;

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

        // Send Response
        const {password, ...userData} = SavedUser._doc;

        const response = NextResponse.json({message:"User Register Successfully",data:userData},{status:200});
        response.headers.set("Set-Cookie",cookie);

        return response;

    } catch (error) {
   
        return NextResponse.json({message:"User Register Failed",error:error},{status:500});
    }
}

