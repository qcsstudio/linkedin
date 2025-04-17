import connectDB from "@/libs/mongodb";
import User from "@/models/user.schema";
import { getCookie } from "@/utils/getCookie";
import { verifyToken } from "@/utils/tokenGenerator";
import nodemailer from "nodemailer";

export const OTP_Store2 = new Map();

export const POST = async(req)=>{
    try {
        
        // connectDB();

        const data = await req.json();
        console.log("otp Data",data);
        
        const {email} = data;
        console.log("Email otp ",email);

        // Generate otp
        const OTP = generateOTP(); 
        console.log("OTP PASS",OTP);


        // OTP store
        OTP_Store2.set(email,{OTP,expiresAt: Date.now() + 5 * 60 * 1000})

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

        const htmlTemplate = `<div style="background-color: #0f172a; padding: 50px 0; font-family: 'Segoe UI', 'Inter', sans-serif;">
            <div style="max-width: 600px; margin: auto; background-color: #1e293b; border-radius: 12px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); overflow: hidden;">

            <!-- Header -->
            <div style="background: linear-gradient(90deg, #3b82f6, #6366f1); padding: 30px; text-align: center;">
                <h2 style="color: #fff; margin: 0; font-size: 22px;"> Verify Your Email</h2>
                <p style="color: #e2e8f0; margin-top: 8px; font-size: 14px;">Secure your account with the code below</p>
            </div>

            <!-- OTP Section -->
            <div style="padding: 40px 30px; text-align: center;">
                <p style="font-size: 15px; color: #cbd5e1;">Your One-Time Password (OTP):</p>
                <div style="margin: 20px 0; padding: 16px 28px; background-color: #0ea5e9; color: #ffffff; font-size: 32px; font-weight: 700; border-radius: 10px; letter-spacing: 8px; display: inline-block;">
                ${OTP}
                </div>
                <p style="font-size: 14px; color: #94a3b8;">This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.</p>
            </div>

            <!-- Footer -->
            <div style="padding: 0 30px 30px 30px; text-align: center; border-top: 1px solid #334155;">
                <p style="font-size: 13px; color: #64748b; margin: 20px 0 8px;">If you didn’t request this, no action is required.</p>
                <p style="font-size: 13px; color: #64748b; margin: 0;"> QuantumCrafters Studio</p>
            </div>
            </div>

            <div style="text-align: center; font-size: 12px; color: #94a3b8; margin-top: 24px;">
            Need help? <a href="mailto:support@quantumcrafters.com" style="color: #60a5fa; text-decoration: underline;">Contact Support</a>
            </div>
        </div>`;
        

        const mail = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject:"Verify the Account",
            html: htmlTemplate,
        });
        console.log("Mail PASS !!!!",mail);

        return Response.json({message:"OTP generated Successfully",success:true,status:201},{status:201});

    } catch (error) {
        console.log("Unable to generate otp !",error);
        return Response.json({message:"Server Error ! Unable to generate otp! ",status:500,success:true,error:error},{status:500});
    }
}

// export const POST = async(req)=>{
//     try {
        
//         const data = await req.json();
//         const {OTP,email} = data;
//         console.log("DATA PASS",data);

//         const jwt_data = await getCookie("access_token");
//         const token = await verifyToken(jwt_data.value);

//         const userId = token.userId;
//         console.log("Token Pass");

//         const userData = await User.findById(userId);
        
//         const userEmail = userData?.email;
//         console.log("User Data",userEmail);

//         const otpData = OTP_Store2.get(userEmail);
//         console.log("otp  Data",otpData.expiresAt);

//         if(!otpData){
//             return Response.json({message:"Invalid User",status:400,success:false},{status:400});
//         }
//         console.log("otp data 2");

//         if(Date.now() > otpData.expiresAt){
//             OTP_Store2.delete(userEmail);
//             return Response.json({message:"OTP Expires!",status:401,success:false},{status:401});
//         }
//         console.log("otp expiry Pass");

//         if(otpData.OTP != OTP){
//             return Response.json({message:"Invalid OTP!",status:400,success:false},{status:400});
//         }

//         console.log("otp Pass")

//         OTP_Store2.delete(userEmail);

//         return Response.json({message:"OTP Verified Successfully",status:201,success:true},{status:201})

//     } catch (error) {
//         console.log("Unable to generate otp !",error);
//         return Response.json({message:"Server Error ! Unable to generate otp! ",status:500,success:true,error:error},{status:500});
//     }
// }

const generateOTP = ()=>{
    let number = Math.random();
    number = number * 1000000;
    const OTP = Math.floor(number);
    return OTP;
}
