import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./helper";

const auth = async(req:any,res:Response,next:NextFunction):Promise<any> => {
    try{
        const token = req.header('Authorization')//?.replace('Bearer ','')
        if(!token){
            return res.status(401).json({message: 'No token, authorization denied'})
        }
        //verify token
        const data:any = await verifyToken(token)
        req.userId = data?.userId;
        next()
    }
    catch(error){
        res.status(401).json({message: 'Not authorized to access this resource'})
    }
}
export default auth