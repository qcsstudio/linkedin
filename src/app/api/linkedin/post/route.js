export const POST = async(req)=>{
    try {
        const data = await req.json();
        // console.log(data);

        const postImages = data.formImage;
        // console.log("Post Images",postImages);

        const imageData = postImages.map((item)=>{
            return item.imageFile;
        })

        console.log(imageData.length);


        // // User Linkedin Data payload ---------------------------------------------
        const linkedInUser = await data?.selectedaccount;
        const linkedInUserAuthToken = await data?.selectedaccount;



        // console.log(data?.selectedaccount.length);

        for(let i = 0;i < data?.selectedaccount.length;i++){
            const linkedinUserObject = linkedInUser[i]?.user;
            const linkedinUserID = linkedInUser[i]?.user?.sub;
            const linkedinUserAuthToken = linkedInUserAuthToken[i]?.token;
            
            // All image uploaded urns;
            const filesData = [];

            // Payload 
            const uploadPayload = {
                "registerUploadRequest": {
                    "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
                    "owner": `urn:li:person:${linkedinUserID}`
                }
            };

            // Image Registery:
            const result = await imageData.map(async(file,index)=>{

                // Preprocessing:
                const base64Data = file.split(',')[1];
                const imageType = file.split(',')[0].split(':')[1].split(';')[0].replace('/',".");
                if(index == 0){
                    // console.log("Base64 Data : ", base64Data);
                    // console.log("Temp Type : ", imageType);
                }
                
                // Fetching the Data to 
                const response = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload',{
                    method:"POST",
                    headers:{
                        'Authorization':`Bearer ${linkedinUserAuthToken}`,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(uploadPayload)
                });
                // If response is 200 then the 
                if(response.status === 200){
                    const result = await response.json();
                    const uploadURL = result.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
                    const assetURN = result.value.asset;
                    const imageBlob = await fetch(`data:image/jpeg;base64,${base64Data}`).then(res => res.blob());

                    const formData = new FormData();
                    formData.append('file', imageBlob, imageType); 

                    const uploadedImageResponse = await fetch(uploadURL,{
                        method:"PUT",
                        headers:{
                            'Authorization':`Bearer ${linkedinUserAuthToken}`,
                        },
                        body:formData
                    });
                    

                    if(uploadedImageResponse.status == 201){
                        console.log("Image Upload Success");
                        filesData.push(assetURN);
                    }else{
                        console.log("Error in upload Image.",uploadedImageResponse);
                        return false;
                    }

                    return result;
                }else{
                    return false;
                }
            })

            // if(file){
            //     console.log(file);
            // }else{
            //     console.log(false);
            // }

        }


        return Response.json({message:"Linkedin Post Uploaded SuccessFully.",success:true},{status:200});
    } catch (error) {
        console.log("Unable to create Linkedin POST ");
        return Response.json({message:"Unable Upload Linkedin Post!!!",error:error},{status:500});

    }
}