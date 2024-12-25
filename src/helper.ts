import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"
export const encryptPassword = async(password: string) => {
    try{
        return await bcrypt.hash(password,8)
    }
    catch(error){
        console.error("Error encrypting password: ", error);
        return password;
    }
}

export const decryptPassword = async(password: string, hashedPassword:string) => {
    try{
        return await bcrypt.compare(password,hashedPassword)
    }
    catch(error){
        console.error("Error encrypting password: ", error);
        return password;
    }
}

export const generateToken  = async(userId:string) => {
    try{
        return await jwt.sign({userId},"shhhh")
    }
    catch(err){
        console.error("Error generating token: ", err);
        return null;
    }
}

export const verifyToken = async(token: string) => {
    try{
        return await jwt.verify(token,"shhhh")
    }
    catch(err){
        console.error("Error generating token: ", err);
        return null;
    }
}