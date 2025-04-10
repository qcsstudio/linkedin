

export const POST = async(req)=>{

    try {
        const data = await req.json();
        // console.log("Comment Data : ",data);
        const {selectedAccount,comment,postId} = data;
        const token = selectedAccount.token;
        const userId = selectedAccount.uniqueId;
        const accountType = selectedAccount.type;

        const payload = {
            "actor": `urn:li:${accountType}:${userId}`,
            "message": {
                "text": comment
            }
        };

        const URL = `https://api.linkedin.com/v2/socialActions/${postId}/comments`
        
        const res = await fetch(URL,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(payload)
        });

        // console.log(res);

        if(res.status === 201){
            console.log("Commented Successfully");
        }


        return Response.json({message:"Commented Successfully",status:200,success:true},{status:200});
    } catch (error) {
        console.log("Unable to post comment !!! ");
        return Response.json({message:"Unable to Comment",status:500,success:false},{status:500});
    }

} 