import mongoose from "mongoose";

const dbConnect = async () => {
  mongoose
    .connect(`${process.env.MONGODB_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => {
      console.log("DataBase connected successfully");
    })
    .catch((e) => {
      console.log("Error in connecting DB");
    });
};

export default dbConnect;
