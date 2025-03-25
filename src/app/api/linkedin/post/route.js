export const POST = async(req)=>{
    try {
        const data = await req.json();
        console.log(data);

        // const postImages = data.formImage;

        // console.log("Post Images Data",postImages[0]);

        // // User Linkedin Data payload ---------------------------------------------
        // const linkedInUser = await data?.selectedaccount;
        // const linkedInUserAuthToken = await data?.selectedaccount;

        // const linkedinUserObject = linkedInUser[0]?.user;
        // const linkedinUserID = linkedInUser[0]?.user?.sub;
        // const linkedinUserAuthToken = linkedInUserAuthToken[0]?.token;

        return Response.json({message:"Linkedin Post Uploaded SuccessFully.",success:true},{status:200});
    } catch (error) {
        console.log("Unable to create Linkedin POST ");
        return Response.json({message:"Unable Upload Linkedin Post!!!",error:error},{status:500});

    }
}