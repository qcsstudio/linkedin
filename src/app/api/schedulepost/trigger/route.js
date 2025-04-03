import SchedulePost from "@/models/schedule.schema";

export const POST = async(req)=>{
    
    try {
        const data = await req.json();
        const postSize = data?.length;
        for(let i=0;i<postSize;i++){
            const res = await fetch(`${process.env.URL}/api/linkedin/schedulepost`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data[i])
            })
            if(res.status == 200){
                console.log("Schedule Post Posted Successfully 😁.");
                const updatedPostData = await SchedulePost.findByIdAndUpdate(data[i]._id,{
                    scheduled:"active"
                },{new:true});
                
            }
        }
        return Response.json({message:"Trigger Schedule post Successfully : ",data:data,status:200,success:true},{status:200});
    } catch (error) {
        console.log("Unable to trigger Schedule Post : ",error);
        return Response.json({message:"Unable to Trigger Schedule post : ",error:error,status:500,success:false},{status:500});
    }

}