import mongoose from "mongoose";
import config from "../config/common";
const connect = async () => {
  try {
    await mongoose.connect(config.db.mongo.url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connect;