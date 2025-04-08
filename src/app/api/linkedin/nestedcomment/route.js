export const POST = async(req)=>{

    try {
        const data = await req.json();
        
        console.log("Nested Comment Data : ",data);
        const {replySelectedAccount,replyComment,selectedCommentURN,selectedCommentObject} = data;
        const userId = replySelectedAccount.uniqueId;
        const userToken = replySelectedAccount.token;
        const accountType = replySelectedAccount.type;

        const nestedCommentURL = `https://api.linkedin.com/v2/socialActions/${selectedCommentURN}/comments`;

        const payload = {
            "actor": `urn:li:${accountType}:${userId}`,
            "message": {
                "text": `${replyComment}`
            },
            "object": `${selectedCommentObject}`,
            "parentComment": `${selectedCommentURN}`
        }

        const res = await fetch(nestedCommentURL,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${userToken}` 
            },
            body:JSON.stringify(payload)
        });

        if(res.status === 201){
            return Response.json({message:"Commented Successfully",data:data,status:200,success:true},{status:200});
        }else{
            return Response.json({message:"Commente Un-Successfully !!!",data:data,status:500,success:flase},{status:500});
        }

        
    } catch (error) {
        console.log("Unable to nested comment : /linkedin/nestedcomment : ",error);
        return Response.json({message:"Server Error Unable to post nested comment",success:false,status:500},{status:500});
    }

}