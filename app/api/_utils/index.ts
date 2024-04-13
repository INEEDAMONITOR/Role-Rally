import mongoose from "mongoose";
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to the database and returns the connection object.
 * If a connection already exists, it returns the existing connection.
 * If a connection does not exist, it creates a new connection and returns it.
 *
 * @method
 * @async
 * @returns {Promise<mongoose.Connection>} The database connection object.
 * @throws {Error} If there is an error connecting to the database.
 */
export const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

async function dbDelete() {
  if (cached.conn) {
    await cached.conn.dropDatabase();
  }
}

/**
 * Validates an email address.
 *
 * @method
 * @param email - The email address to validate.
 * @returns A boolean indicating whether the email address is valid.
 */
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
