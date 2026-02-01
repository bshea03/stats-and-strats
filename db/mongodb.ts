import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("No MONGODB_URI environment variable defined");
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose;
}

export default dbConnect;

// Maybe a "Time" schema that maps to a user/game/row id? then index row id?
