import { OTP_Store2 } from "../route";

export const POST = async(req)=>{
    try {
        
        const data = await req.json();
        const {OTP,email} = data;
        console.log("DATA PASS",data);

        const otpData = OTP_Store2.get(email);
        console.log("otp  Data",otpData.expiresAt);

        if(!otpData){
            return Response.json({message:"Invalid User",status:400,success:false},{status:400});
        }
        console.log("otp data 2");

        if(Date.now() > otpData.expiresAt){
            OTP_Store2.delete(email);
            return Response.json({message:"OTP Expires!",status:401,success:false},{status:401});
        }
        console.log("otp expiry Pass");

        if(otpData.OTP != OTP){
            return Response.json({message:"Invalid OTP!",status:400,success:false},{status:400});
        }

        console.log("otp Pass")

        OTP_Store2.delete(email);

        return Response.json({message:"OTP Verified Successfully",status:201,success:true},{status:201})

    } catch (error) {
        console.log("Unable to generate otp !",error);
        return Response.json({message:"Server Error ! Unable to generate otp! ",status:500,success:true,error:error},{status:500});
    }
}

