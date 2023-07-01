import mongoose from "mongoose";

export default async function ConnectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/cut-url");
    console.log("Connected To Db")
  } catch (err) {
    console.log(err);
  }
}
