import express, { Request, Response } from "express";
import { connectDB, sequelize } from "./connection";
import userSchema from "./model/user.model";
import * as userService from "./service/user.service";
import * as todoService from "./service/todo.service"
import auth from "./auth.middleware";
import todoSchema from "./model/todo.model";

const app = express();
app.use(express.json());

//connect db
connectDB()

//associations
todoSchema.belongsTo(userSchema, {
  foreignKey: "userId",
  as: "user", // alias for the association
});
userSchema.hasMany(todoSchema, { foreignKey: 'userId', onDelete: 'CASCADE' }); // A User has many Todos

(async()=>{
    try{
        await sequelize.sync({alter: true});
    }
    catch(err){
        console.log(err);
        
    }
})()

app.get("/", (req: Request, res: Response): any => {
  return res.status(200).send({
    message: "Service is running",
  });
});

app.post("/reg", userService?.register)
app.post("/login", userService?.login)

app.post("/upsert", auth, todoService?.upsert)
app.post("/fetch", auth, todoService?.fetch)


app.listen(3000, () => {
  console.log("aerevr is ip");
});
