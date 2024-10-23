import mongoose, { Mongoose } from "mongoose";

// Retrieving the MongoDB URI from environment variables
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

// Interface representing the structure of the cached connection
interface CachedConnection {
  connection?: Mongoose; // The cached connection object
  promise?: Promise<Mongoose>; // The promise for the connection
}

// Cached object to store the connection and the promise
const cached: CachedConnection = {};

// Async function to establish a MongoDB connection
const connectMongodb = async (): Promise<Mongoose> => {
  // Check if the MONGODB_URI environment variable is defined
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env"
    );
  }

  // If a cached connection exists, return it immediately
  if (cached.connection) {
    return cached.connection;
  }

  // If there is no connection but a promise is in progress, reuse the promise
  if (!cached.promise) {
    // Connection options, setting bufferCommands to false and specifying the database name from environment variables
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable Mongoose buffering for disconnected state
      dbName: process.env.DB_NAME, // Database name to connect to, from environment variables
    };
    // Store the connection promise in the cached object
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  // Wait for the promise to resolve and store the connection
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined; // Reset the promise if the connection fails
    throw e; // Re-throw the error to be handled elsewhere
  }

  // Return the established connection
  return cached.connection;
};

export default connectMongodb;
