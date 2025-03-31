import { convertToLinkedInFormat } from "@/utils/stringUnicodeConverter";

export const POST = async(req)=>{
    try {

        // Getting Body Data into js object
        const data = await req.json();

        // Getting File Data (image,video)
        const postImages = data.formImage;
        const postVideos = data.formVideo;

        // Caption Data
        const caption = convertToLinkedInFormat(data.postCaption.replace(/<\/?p>/g, ""));

        // Getting File Type (image,video)
        const fileDataType = data.fileType;

        // variables for file base64 array
        let imageData ;
        let videoData ;

        if(fileDataType === "image"){
            imageData = postImages?.map((item)=>{
                return item.imageFile;
            })
        }else if(fileDataType === "video"){
            videoData = postVideos?.map((item)=>{

                return item.videoFile;
            })
        }

        // User Linkedin Data payload ---------------------------------------------
        const linkedInUser = await data?.selectedaccount;
        const linkedInUserAuthToken = await data?.selectedaccount;

        for(let i = 0;i < data?.selectedaccount.length;i++){
            const linkedinUserID = linkedInUser[i]?.user?.sub;
            const linkedinUserAuthToken = linkedInUserAuthToken[i]?.token;
            
            // All files uploaded urns
            const filesData = [];

            // Payload 
            let uploadPayload = {
                "registerUploadRequest": {
                    "recipes": [`urn:li:digitalmediaRecipe:feedshare-${fileDataType}`],
                    "owner": `urn:li:person:${linkedinUserID}`
                }
            };

            let imageUploaded;
            let videoUploaded;

            if(fileDataType === "image"){
                // Image Registery:
                imageUploaded = await imageData.map(async(file,index)=>{

                    // function for get file registry
                    const result = await getRegistryURL(file,linkedinUserAuthToken,uploadPayload);
                    // function for get file urn 
                    const urn = await getUrnId(result,linkedinUserAuthToken);
                    filesData.push(urn);
    
                });
            } else if(fileDataType === "video"){
                videoUploaded = await Promise.all( videoData.map(async(file,index)=>{

                    // function for get file registry
                    const result = await getRegistryURL(file,linkedinUserAuthToken,uploadPayload);
                    console.log("registry of video upload. ",result);
                    // function for get file urn 
                    const urn = await getUrnId(result,linkedinUserAuthToken);
                    filesData.push(urn);
                }));
            }
            
            let dataTypeOfFile
            if(fileDataType === "image"){
                const imageSuccess = await Promise.allSettled(imageUploaded);
                dataTypeOfFile = "IMAGE"
            }else if(fileDataType === "video"){
                const videoSuccess = await Promise.allSettled(videoUploaded || []);
                dataTypeOfFile = "VIDEO"
            }

            console.log("File Urn List",filesData);

            const mediaObject = filesData.map((urn)=>{
                const objectData =  {
                    "status": "READY",
                    "media": `${urn}`,
                }
                return objectData;
            });

            const payloadForPost = {
                "author": `urn:li:person:${linkedinUserID}`,
                "lifecycleState": "PUBLISHED",
                "specificContent": {
                    "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": `${caption}`
                    },
                    "shareMediaCategory": dataTypeOfFile,
                    "media": mediaObject 
                    }
                    },
                    "visibility": {
                    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
                    }
                }
            
                console.log("Post payload",payloadForPost.specificContent['com.linkedin.ugc.ShareContent'].media);

            // const postResponse = await 

            const postResponse = await fetch('https://api.linkedin.com/v2/ugcPosts',{
                method:"POST",
                headers:{
                    'Authorization':`Bearer ${linkedinUserAuthToken}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(payloadForPost)
            })
            console.log("Post Response : ",postResponse);

            if(postResponse.status == 201){
                const result = await postResponse.json();
                console.log("Post Created Successfully",result);
            }

        }


        return Response.json({message:"Linkedin Post Uploaded SuccessFully.",success:true},{status:200});
    } catch (error) {
        console.log("Unable to create Linkedin POST ");
        return Response.json({message:"Unable Upload Linkedin Post!!!",error:error},{status:500});

    }
}


// Get register Url (Linkedin Request) ----------------------------------------------------------------

const getRegistryURL = async(file,linkedinUserAuthToken,uploadPayload) => {
    
    try {
        // Preprocessing:
        const base64Data = file.split(',')[1];
        const fileType = file.split(',')[0].split(':')[1].split(';')[0].replace('/',".");
        
    
        // Fetching the Data to 
        const response = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload',{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${linkedinUserAuthToken}`,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(uploadPayload)
        });
    
        if(response.status === 200){
        
            // Preprocessing
            const result = await response.json();
            result.base64Data = base64Data;
            result.fileType = fileType;
            return result;
        }else{
            console.log("Unable to register file",response.status);
            return false;
        }
    } catch (error) {
        console.log("Error in getRegistryURL : ",error);
        return error;
    }

}

// Get file Urn (Linkedin Request) ----------------------------------------------------------------
const getUrnId = async(result,linkedinUserAuthToken) => {
    try {
            const uploadURL = result.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;

            const assetURN = result.value.asset;

            const fileBlob = await fetch(`data:${result.fileType};base64,${result.base64Data}`).then(res => res.blob());
            
            const formData = new FormData();
            formData.append('file', fileBlob, result.fileType); 
    
            const uploadedImageResponse = await fetch(uploadURL,{
                method:"PUT",
                headers:{
                    'Authorization':`Bearer ${linkedinUserAuthToken}`,
                },
                body:formData
            });
    
    
            if(uploadedImageResponse.status == 201){
                console.log("File Uploaded Successfully");
                // filesData.push(assetURN);
                return assetURN;
            }else{
                console.log("Error in upload File.",uploadedImageResponse.status);
                return false;
            }

    } catch (error) {
        console.log("Unable to upload file",error);
        return error;
    }
}