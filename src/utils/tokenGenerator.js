import jwt from "jsonwebtoken";

export const generateToken = async(userId)=>{
    try {

        const token = jwt.sign(userId,process.env.ACCESS_TOKEN_SECRET);
        return token;
    } catch (error) {
        console.log("Token Generation Error !");
        console.log(error);
        return false;
    }
}