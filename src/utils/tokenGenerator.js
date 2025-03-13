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

export const verifyToken = async(token)=>{
    try {
        const userId = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        return userId;
    } catch (error) {
        console.log("Token Decode Error !");
        console.log(error);
        return false;
    }
}