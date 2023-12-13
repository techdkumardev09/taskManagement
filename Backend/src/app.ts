import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/mongodbconnection";
import userRouters from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";


dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

dbConnect(); //DataBase connection

app.use(cors());

app.use(express.json());

app.use("/api/users", userRouters);
app.use("/api/task", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
