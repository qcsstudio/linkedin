import ConnectDB from "@/libs/mongodb";
import Users from "@/models/user"; 

export async function POST(req){
    try {
        ConnectDB();
        const {firstName,lastName,email,phoneNumber,password} = await req.json();
        console.log({firstName,lastName,email,phoneNumber,password});

        // Empty Field Check
        if(firstName === "" || lastName === "" || email === "" || phoneNumber === "" || password === ""){
            return Response.json({message:"All Fields Required !"},{status:400});
        }
        console.log("Empty Field Pass");

        //  User Check 
        const userExist = await Users.findOne({email});
        if(userExist){
            return Response.json({message:"User Already Exist !"},{status:400});
        }
        console.log("User Exist Pass");

        // User Create
        const newUser = new Users({firstName,lastName,email,phoneNumber,password});
        // const SavedUser = await newUser.save();

        // console.log("Saved User :",SavedUser);

        return Response.json({message:"User Post Successfully",data:"Success"},{status:200});
    } catch (error) {
        console.log("User Post Error !!!");
        return Response.json({message:"User Post Failed",error:error},{status:500});
    }
}