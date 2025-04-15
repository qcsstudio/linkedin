import connectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { getCookie } from "@/utils/getCookie";
import { verifyToken } from "@/utils/tokenGenerator";
import nodemailer from "nodemailer";

export const OTP_Store = new Map();

export const GET = async(req)=>{
    try {
        
        connectDB();

        const jwt_data = await getCookie("access_token");
        const token = await verifyToken(jwt_data.value);

        const userId = token.userId;
        console.log("Token PASS",userId);

        // Get user Data
        const userData = await User.findById(userId);
        console.log("User Data PASS");

        // Generate otp
        const OTP = generateOTP(); 
        console.log("OTP PASS",OTP);


        // OTP store
        OTP_Store.set(userData?.email,{OTP,expiresAt: Date.now() + 5 * 60 * 1000})

        // mail logic
        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        console.log("Transporter PASS",OTP);

        const mail = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: userData?.email,
            subject:"Verify the Account",
            text: `Your OTP is ${OTP}. It expires in 5 minutes.`,
        });
        console.log("Mail PASS !!!!",mail);

        return Response.json({message:"OTP generated Successfully",success:true,status:201},{status:201});

    } catch (error) {
        console.log("Unable to generate otp !",error);
        return Response.json({message:"Server Error ! Unable to generate otp! ",status:500,success:true,error:error},{status:500});
    }
}

export const POST = async(req)=>{
    try {
        
        const data = await req.json();
        const {OTP} = data;
        console.log("DATA PASS",data);

        const jwt_data = await getCookie("access_token");
        const token = await verifyToken(jwt_data.value);

        const userId = token.userId;
        console.log("Token Pass");

        const userData = await User.findById(userId);
        
        const userEmail = userData?.email;
        console.log("User Data",userEmail);

        const otpData = OTP_Store.get(userEmail);
        console.log("otp  Data",otpData.expiresAt);

        if(!otpData){
            return Response.json({message:"Invalid User",status:400,success:false},{status:400});
        }
        console.log("otp data 2");

        if(Date.now() > otpData.expiresAt){
            OTP_Store.delete(userEmail);
            return Response.json({message:"OTP Expires!",status:401,success:false},{status:401});
        }
        console.log("otp expiry Pass");

        if(otpData.OTP != OTP){
            return Response.json({message:"Invalid OTP!",status:400,success:false},{status:400});
        }

        console.log("otp Pass")

        OTP_Store.delete(userEmail);

        return Response.json({message:"OTP Verified Successfully",status:201,success:true},{status:201})

    } catch (error) {
        console.log("Unable to generate otp !",error);
        return Response.json({message:"Server Error ! Unable to generate otp! ",status:500,success:true,error:error},{status:500});
    }
}

const generateOTP = ()=>{
    let number = Math.random();
    number = number * 1000000;
    const OTP = Math.floor(number);
    return OTP;
}
