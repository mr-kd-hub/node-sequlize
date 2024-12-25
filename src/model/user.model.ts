import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../connection";
import { encryptPassword } from "../helper";
import todoSchema from "./todo.model";

const userSchema = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("email");
        return rawValue ? rawValue.toLowerCase() : null;
      },
      set(value:string) {
        this.setDataValue('email', value.toLowerCase());
      },
    },
    password: {
      type: DataTypes.TEXT,
    //   set(value:string) {
    //     // const hask = encryptPassword(value)
    //     // console.log("sjnsf",hask);
        
    //     encryptPassword(value)
    //     .then((value)=>{
    //         console.log("hashedPassword",value);
    //         this.setDataValue('password',value);
    //     })        
    //   }
    }
  },
  {
    timestamps: true,
    tableName: "users",
  }
);
export default userSchema;
