import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/mongodbconnection";

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

dbConnect(); //DataBase connection

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
