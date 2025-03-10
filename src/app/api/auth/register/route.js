import ConnectDB from "@/libs/mongodb";
import User from "@/models/user.schema"; 
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Client from "@/models/client.schema";

export const POST = async(req)=>{
    try {
        await ConnectDB();
        const data = await req.json();

        let {firstName,lastName,email,phoneNumber,clientName,planType,clientDomain,role} = data;
        const Password = data.password;
        // Checking Role
        if(!role){
            role = "admin";
        }

        // Checking PlanType
        if(!planType){
            planType = "single";
        }

        // Checking ClientDomain
        if(!clientDomain){
            clientDomain = clientName;
        }

        // Empty Field Check
        if(!firstName || !lastName || !email || !phoneNumber || !Password || !clientName ){
            return NextResponse.json({message:"All Fields Required! "},{status:400});
        }
        console.log("Empty Field Pass");

        // User Check 
        const userEmailExist = await User.findOne({email});
        const userPhoneExist = await User.findOne({phoneNumber});
        if(userEmailExist || userPhoneExist){
            return NextResponse.json({message:"User Already Exist ! "},{status:409});  
        }
        console.log("User Exist Pass");

        // Create Client
        const clientCreated = await createClient({clientName,planType,clientDomain});

        if(!clientCreated){
            return NextResponse.json({message:"Server is Unable to Create Client ! "},{status:500});
        }

        // Password Hash
        const hashedPassword = await bcrypt.hash(Password,10);

        // User Create
        const newUser = new User({firstName,lastName,email,phoneNumber,password:hashedPassword,role,clientName,planType,clientDomain});
        const SavedUser = await newUser.save();
        console.log("User Save Pass");

        // Send Response
        const {password, ...userData} = SavedUser._doc;

        return NextResponse.json({message:"User Post Successfully",data:userData},{status:200});
    } catch (error) {
        console.log("User Register Error !!!");
        return NextResponse.json({message:"User Register Failed",error:error},{status:500});
    }
}


// Create Client Method
export const createClient = async(data)=>{
    try {
        const {clientName,planType,clientDomain} = data;
        const newClient = Client({clientName,planType,clientDomain});
        const savedClient = await newClient.save();
        if(savedClient){
            console.log(savedClient);
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log("Client Not Created Error !!! : ",error);
        return false;
    }
}