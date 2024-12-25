import { Response } from "express";
import todoSchema from "../model/todo.model";
import { Op } from "sequelize";
import { title } from "process";
import userSchema from "../model/user.model";

export const upsert  = async(req:any, res:Response):Promise<any> => {
    try{
        const { id, title, description, status, due_date } = req.body;
        let todo:any;
        const userId = req.userId
        if(id){
            todo = await todoSchema.findOne({ where: { id } });
        }
        else{
            todo = todoSchema.build();
        }
        todo.userId = userId;
        if(title !== undefined){
            todo.title = title;
        }
        if(description !== undefined){
            todo.description = description;
        }
        if(status !== undefined){
            todo.status = status;
        }
        if(due_date !== undefined){
            todo.due_date = due_date;
        }
        await todo.save();
        return res.status(200).send(todo);
    }
    catch(err:any){
        return res.status(500).send({
            message: err.message || "Server error"
        })
    }
 }

 export const fetch = async(req:any,res:Response):Promise<any> => {
    try{
        const userId = req.userId
        const { status, id, due_date, search } = req.body
        // const todo = await todoSchema.findByPk(userId)
        const query:any = {
            userId
        }
        if(search !== undefined){
            query[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
            ]
        }
        if(id !== undefined){
            query['id'] = id;
        }
        if(status !== undefined){
            query['status'] = status;
        }
        
        const todo = await todoSchema.findAndCountAll({
          where: {
            ...query,
          },

          include: [{ model: userSchema, attributes: ["email"], as: "user" }],
          order: [["createdAt", "DESC"]],
        //   attributes: ["column1", "column2"], // Projection: Select specific columns
          limit: undefined, // Limit: Number of records to return
          offset: undefined,
        });
        return res.status(200).send(todo);
    }
    catch(err:any){
        return res.status(500).send({
            message: err.message || "Server error"
        })
    }
 }