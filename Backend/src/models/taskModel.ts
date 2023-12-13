import mongoose, { Document, now } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  userEmail: String;
  createdAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userEmail: {
    type: String,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
