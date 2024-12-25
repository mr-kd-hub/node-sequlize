import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import userSchema from "./user.model";

const todoSchema = sequelize.define('todo',{
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    status: {
        type: DataTypes.STRING,
        defaultValue: "new",
        allowNull: false,
    },
    due_date: DataTypes.DATE,
    userId:{
        type: DataTypes.TEXT,
        references: {
            model: 'users',
            key: 'id'
        }
    },
},{
    modelName: 'todos',
    timestamps: true
})

export default todoSchema;