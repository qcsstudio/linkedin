import ConnectDB from "@/libs/mongodb";
import User from "@/models/user.schema"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Client from "@/models/client.schema";
import { serialize } from "cookie";
import { generateToken } from "@/utils/tokenGenerator";

export const POST = async(req)=>{
    try {
        await ConnectDB();
        const data = await req.json();

        let {firstName,lastName,email,planType,role} = data;
        const Password = data.password;
        // Checking Role
        if(!role){
            role = "admin";
        }

        // Checking PlanType
        if(!planType){
            planType = "single";
        }

        // Checking ClientDomain
        // if(!clientDomain){
        //     clientDomain = clientName;
        // }

        // Empty Field Check
        if(!firstName || !lastName || !email  || !Password ){
            return NextResponse.json({message:"All Fields Required! "},{status:400});
        }
       

        // User Check 
        const userEmailExist = await User.findOne({email});
        // const userPhoneExist = await User.findOne({phoneNumber});
        if(userEmailExist ){
            return NextResponse.json({message:"User Already Exist ! "},{status:409});  
        }
       

        // Create Client   (! Temporary Commented)
        // const clientCreated = await createClient({clientName,planType,clientDomain});

        // if(!clientCreated){
        //     return NextResponse.json({message:"Server is Unable to Create Client ! "},{status:500});
        // }

        // Password Hash
        const hashedPassword = await bcrypt.hash(Password,10);

        // User Create
        const newUser = new User({firstName,lastName,email,password:hashedPassword,role,planType});
        const SavedUser = await newUser.save();
       
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


export const createClient = async(data)=>{
    try {
        const {clientName,planType,clientDomain} = data;
        const newClient = Client({clientName,planType,clientDomain});
        const savedClient = await newClient.save();
        if(savedClient){

            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.error("Client Not Created Error !!! : ",error);
        return false;
    }
}