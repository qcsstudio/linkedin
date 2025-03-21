export async function POST(req){

    try {
        const data = await req.json();

        const organizationId = data.organizationId;
        
        
        const analyticsURL = `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${organizationId}`;

        const analyticsData = await fetch(analyticsURL,{
            Method:"GET",
            headers:{
                "Authorization":`Bearer ${data?.token}`
            }
        });
        const analytic = await analyticsData.json();
        
        return Response.json({analyticsData:analytic,message:"Organization Analytics fetched Successfully"},{status:200});

    } catch (error) {
        console.log("Linkedin Analytics error /linkedin/analytics : ",error);
        return Response.json({message:"Unable to fetch Analytics",error:error},{status:500});
    }

}