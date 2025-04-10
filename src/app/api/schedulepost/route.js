import SchedulePost from "@/models/schedule.schema";
import connectDB from "@/libs/mongodb";
import { getCookie } from "@/utils/getCookie";
import { verifyToken } from "@/utils/tokenGenerator";

export const POST = async(req)=>{

    try {
        await connectDB();
        const data = await req.json();
        const jwtToken = await getCookie("access_token");
        const userId = await verifyToken(jwtToken?.value);

        const {fileType,formImage,formVideo,timeStamp,postCaption,privacy,selectedaccount} = data;

        console.log("time stamp Data:",timeStamp);

        const imagesData = formImage.map((image)=>{
            return image.imageFile;
        })

        let videoData
        if(formVideo.length > 0){
            videoData = formVideo[0].videoFile;
        }

        const selectedAccountData = selectedaccount.map((account)=>{
                return {
                    linkedinId:account.user.sub,
                    linkedinToken:account.token
                }
        });
        console.log("Selected Accounts :",selectedAccountData);

        const schedulePostInstance = new SchedulePost({userId:userId.userId,fileType,formImage:imagesData,formVideo:videoData,postCaption,privacy,selectedAccount:selectedAccountData,scheduled:"schedule",scheduleTime:timeStamp});

        const savedScheduleObject = await schedulePostInstance.save();
        // const cronJobCall = await fetch(`${process.env.URL}/api/cron`);
        return Response.json({message:"Post Scheduled Successfully",data:savedScheduleObject,status:200,success:true},{status:200});

    } catch (error) {
        console.log("Unable to schedule POST",error);
        return Response.json({message:"Unable to Schedule Post",error,status:500,success:false},{status:500})
    }

}

export const GET = async(req)=>{
    try {   
        
        connectDB();
        const jwtToken = await getCookie("access_token");
        const userId = await verifyToken(jwtToken?.value);

        // console.log();

        const scheduleData = await SchedulePost.find({scheduled:"schedule",userId:userId.userId});

        console.log("Schedule Data : ",scheduleData);

        return Response.json({message:"Schedule Post's fetched Successfully",data:scheduleData,success:true,status:200},{status:200});
    } catch (error) {
        console.log("Unable to get Posts",error);
        return Response.json({message:"Server error unable to get post's",status:500,success:false},{status:500});
    }
}