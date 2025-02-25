import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve) => {
      mongoose.connection.on('connected', resolve);
    });
    return mongoose.connection.asPromise();
  }

  return mongoose.connect(`${process.env.MONGO_URL}`);
};

export default connectDB;
