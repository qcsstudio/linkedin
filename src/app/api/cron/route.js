import SchedulePost from "@/models/schedule.schema";
import cron from "node-cron";

export const GET = async() => {
    console.log("Running scheduled task...");


    try {
        cron.schedule("* * * * *", async () => {
            try {

                const currTime = new Date();
                const currTimeData = currTime.getTime();
                
                const postData = await SchedulePost.find({
                    scheduleTime:{$lte:currTimeData},
                    scheduled:"schedule"
                });

                console.log("Delayed Posts length : ",postData.length);
                console.log("Delayed Posts  : ",JSON.stringify(postData,null,2));
                if(postData.length > 0){
                    const response = await fetch(`${process.env.URL}/api/schedulepost/trigger`,{
                        method:"POST",
                        headers:{
                            'Content-Type':"application/json",
                        },
                        body:JSON.stringify(postData)
                    });
                    if(response.status == 200){
                        console.log("Trigger Successfully");
                    }
                }
                
            } catch (error) {
                console.log("cron error : ",error);
            }
        });
        
    } catch (error) {
        return Response.json({message:"server error"},{status:500});
    }
    return Response.json({message:"running"},{status:200}); 
}