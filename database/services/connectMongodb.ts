import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

interface CachedConnection {
  connection?: Mongoose;
  promise?: Promise<Mongoose>;
}

const cached: CachedConnection = {};

const connectMongodb = async (): Promise<Mongoose> => {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env"
    );
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      dbName: process.env.DB_NAME,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }

  return cached.connection;
};

export default connectMongodb;
