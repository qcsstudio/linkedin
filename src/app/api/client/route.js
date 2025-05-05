import connectDB from "@/libs/mongodb";
import Client from "@/models/client.schema";
import User from "@/models/user.schema";
import { getCookie } from "@/utils/getCookie";
import { verifyToken } from "@/utils/tokenGenerator";
import { platform } from "os";

export const GET = async(req)=>{
    try {
        await connectDB();

        // getting userId
        const jwt_data = await getCookie("access_token");
        const token = await verifyToken(jwt_data.value);
        console.log("token get Successfully !",token);
        const userId = token.userId;
        console.log("User ID get Successfully !",userId);
        
        // getting User detail
        const userData = await User.findById(userId);
        console.log("User Data get Successfully !",userData);
        
        const clientId = userData?.clientDetail?.id
        console.log("client id get Successfully !",clientId);
        
        const clientData = await Client.findById(clientId);
        console.log("client data get Successfully !",clientData);

        return Response.json({message:"Client data fetched successfully",data:clientData,status:200,success:false},{satus:200})

    } catch (error) {
        console.log("Unable to get Data : ",error);
        return Response.json({message:"Server error unable to get client data",status:500,success:false},{satus:500});
    }
}

export const POST = async(req)=>{
    try {

        await connectDB();

        // getting data
        const data = await req.json();
        let {clientName,clientDomain} = data;

        const clientExist = await checkClient(clientName);

        if(clientExist){
            console.log("Comapny name already exist!");
            return Response.json({message:"Comapny name already exist",success:false,status:401},{status:401});
        }

        // checking the data
        if(!clientName){
            console.log("comapny Name required!");
            return Response.json({message:"Company name is required",success:false,status:401},{status:401});
        }

        if(!clientDomain){
            clientDomain = null;
        }

        // getting userId
        const jwt_data = await getCookie("access_token");
        const token = await verifyToken(jwt_data.value);
        const userId = token.userId;

        // getting User detail
        const userData = await getUserDetail(userId);

        if(!userData){
            console.log("Unable to find User!");
            return Response.json({message:"Server error unable to find user",success:false,status:500},{status:500});
        }

        const {adminUser,planType} = userData;

        // creating new client
        const newClient = Client({clientName,clientDomain,adminUser,planType,$push:{platform:adminUser}});
        const savedClient = await newClient.save();

        // Updating user detail
        const userUpdated = await updateUserDetail({userId,clientDetail:{id:savedClient._id,name:savedClient.clientName}});

        if(!userUpdated){
            Response.json({message:"Server error unable to update user detail",success:false,status:500},{status:500});
        }

        // sending response
        return Response.json({message:"Information saved successfully",success:true,status:201},{status:201});

    } catch (error) {

        console.log("Unable to create Client (Server):",error);
        return Response.json({message:"Server error unable to create client",success:false,status:500},{status:500});
        
    }
}

export const PATCH = async(req)=>{

    try {
        await connectDB();

        // getting data
        const data = await req.json();
        const {dataType,linkedinData,userId} = data;
        console.log("Data transformation PASS",linkedinData);

        // getting user
        const userData = await User.findById(userId);
        const clientId = userData?.clientDetail?.id;

        const organizationalData = await getOrganizationalData(data?.accessToken);




        // getting linkedIn User Data
        if(dataType === "personal"){
            console.log("Personal condition PASS");
            const updatedClientData = await Client.findByIdAndUpdate(clientId,{
                $push:{platforms:{
                    uniqueId:linkedinData?.sub,
                    userName:linkedinData?.name,
                    platformName:"linkedin",
                    avatar:linkedinData?.picture,
                    accountType:dataType,
                    accessToken:data?.accessToken,
                    show:true
                }}
            },{new:true});
            console.log("Data Updated PASS",updatedClientData);
    
        }

        const organizationFormatedData =  organizationalData.map((organization)=>{
            const organizationObject = {
                platformName:"linkedin",
                userName:organization?.vanityName,
                uniqueId:organization?.id,
                accountType:"organization",
                accessToken:organization?.token,
                show:true
            }
            return organizationObject;
        });

        for(let index = 0;index < organizationFormatedData.length;index++){
            const organization = organizationFormatedData[index];
            const updatedClientData = await Client.findByIdAndUpdate(clientId,{
                $push:{platforms:organization}
            },{new:true});
            console.log("Data Updated PASS",updatedClientData);
        }
        

        console.log("GET ORGANIZATION RESPONSE : ",organizationalData[0]);

        return Response.json({message:"Client data updated successfully",status:201,success:true},{status:201});


    } catch (error) {
        console.log("Unable to update client data! :",error);
        return Response.json({message:"Server error Unable to update client detail",success:false,status:500},{status:500});
        
    }

}

// function: Get organizational Data
export const getOrganizationalData = async(accessToken)=>{

    try {

        console.log("Entered in Organization ");

        //  getting organizational id's        
        // getting organization info
        const orgResponse = await fetch(`https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee`, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            },
        });
        console.log("Organization Id success",orgResponse);

        if (!orgResponse.ok) {
            throw new Error(`Org API failed: ${orgResponse.status}`);
        }

        const orgData = await orgResponse.json();
        const filteredOrgs = orgData.elements.filter((org) => org.state !== "REVOKED");

        console.log("filtered organization",filteredOrgs);

        // if(filteredOrgs.length == 0){
        //     return false;
        // }


        const allOrganizations = filteredOrgs.map((org) => ({...org, token: accessToken}));
        console.log("All  organization",allOrganizations);
        // getting organizational Data
        const response = await fetch("http://localhost:3000/api/linkedin/organizations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ organizations: allOrganizations }),
        });

        console.log("organization fetch successfull",response);
        
        if(response.ok){
            const data = await response.json();
            console.log("Organization Data retrived successfully +++++++++++>",data.organizations);
            return data.organizations;
        }

    } catch (error) {
        console.log("Unable to get organizational Data! :",error);
    }

}

// function: Update User Detail
const updateUserDetail = async(data)=>{
    try {
        await connectDB();

        const userData = await User.findByIdAndUpdate(data.userId,{clientDetail:data.clientDetail});

        return true;

    } catch (error) {
        console.log("Unable to update User client :",error);
        return false;
    }
}

// function: Check Client Exist  
const checkClient = async(clientName)=>{
    try {
        await connectDB();

        const clientData = await Client.findOne({clientName});
        console.log("Client Data : ",clientData);

        if(clientData){
            return true;
        }else{
            return false;
        }


    } catch (error) {
        console.log("Unable to check");
        return true;
    }
}


// function: Get User Detail
export const getUserDetail = async(userId) =>{
    try {
        await connectDB();

        // finding user
        const userData = await User.findById(userId);

        // formating user
        const adminUser = {
            id:userId,
            name:`${userData?.firstName} ${userData?.lastName}`,
            role:userData?.role,
            avatar:userData?.avatar,
            email:userData?.email
        }

        return {adminUser,planType:userData?.planType};

    } catch (error) {
        console.log("Unable to get User!",error);
        return false;
    }
}