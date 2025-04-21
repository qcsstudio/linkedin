import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    region:process.env.AWS_REGION,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion:'v4',
});

export const GET = async(req)=>{

    try {
        
        const { searchParams } = new URL(req.url);
        const fileName = searchParams.get('fileName');
        const fileType = searchParams.get('fileType');

        console.log("Search Params:============================================",searchParams);

        const s3Params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `avatars/${fileName}`,
            Expires: 300,
            ContentType: fileType,
        };

        const uploadURL = await s3.getSignedUrlPromise('putObject',s3Params);

        return Response.json({message:"File Uploaded Successfully.",uploadURL,key:s3Params.Key,success:true,status:200},{status:200});
    

    } catch (error) {
        console.log("Unable to upload Image in S3 : ",error);
        return Response.json({message:"Server Error Unable to upload File !",success:false,status:500},{status:500});
    }

}