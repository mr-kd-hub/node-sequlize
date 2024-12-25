import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("todo", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
