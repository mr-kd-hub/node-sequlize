import { Request, Response } from "express";
import validator from "validator"
import userSchema from "../model/user.model";
import { decryptPassword, encryptPassword, generateToken } from "../helper";

export const register = async (req:Request,res:Response):Promise<any> => {
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(403).json({ message: "All fields are required" });
        }

        if(!validator.isEmail(email)) return res.status(403).json({ message: "Email is nort valide" });
        const hashed = await encryptPassword(password)
        const data = {
            email, password: hashed
        }
       
        const user = await userSchema.create(data)
        return res.status(201).send({
            message:"Success",
            user
        })
    }
    catch(err:any){
        return res.status(500).json({ message: err.message || "Server error" });
    }
}

export const login = async (req:Request,res:Response):Promise<any> => {
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(403).json({ message: "All fields are required" });
        }

        if(!validator.isEmail(email)) return res.status(403).json({ message: "Email is nort valide" });
        let user:any = await userSchema.findOne({ where: { email: email } });
        if(!user) return res.status(201).json({ message: "User not found"});
        user = user.toJSON()
        const valid = await decryptPassword(password,user.password);
        
        if(!valid) return res.status(403).json({ message: "Invalid password"});

        const token = await generateToken(user.id)
        return res.status(201).send({
            token
        })
    }
    catch(err:any){
        return res.status(500).json({ message: err.message || "Server error" });
    }
}