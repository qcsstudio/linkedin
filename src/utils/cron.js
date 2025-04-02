import SchedulePost from "@/models/schedule.schema";
import cron from "node-cron";

cron.schedule("* * * * *", async () => {
    try {

        const currTime = new Date();
        const currTimeData = currTime.getTime();
        
        const postData = await SchedulePost.find({
            scheduleTime:{$lte:currTimeData},
            scheduled:"schedule"
        });

        

        console.log("Delayed Posts  : ",JSON.stringify(postData,null,2));
        console.log("Delayed Posts length : ",postData.length);
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