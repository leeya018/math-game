require("dotenv").config();

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;
const MONGODB_URI_PORDUCTION = process.env.MONGO_URI_PORDUCTION;
const NODE_ENV = process.env.NODE_ENV;
// const mongoUrl = STATE === "dev" ? MONGODB_URI : MONGODB_URI_PORDUCTION;
const mongoUrl =
  NODE_ENV === "development" ? MONGODB_URI : MONGODB_URI_PORDUCTION;

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  console.log({ mongoUrl, NODE_ENV });
  return mongoose.connect(mongoUrl);
}

export default dbConnect;
