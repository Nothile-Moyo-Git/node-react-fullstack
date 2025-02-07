/**
 * Date created :  29/01/2024
 *
 * User model
 *
 * This file defined the model for the Mongoose schema for "User"
 * It works as a singleton which can be used with the Mongoose ORM
 * This allows you to perform queries to the backend in MongoDB
 *
 * Note: Static methods are used here since we don't always need to instantiate our Object (e.g deletion)
 *
 * Note: The typing for this should be done as a generic when updating the type
 */

// Imports
import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";
import { UserInterface, UserMethodsInterface } from "../@types/index";

// Setting the user type so we can define methods
type UserModel = Model<UserInterface, object, UserMethodsInterface>;

// Define our mongoose user schema
const userSchema = new mongoose.Schema<UserInterface>({
  name: {
    type: String,
    required: [true, "Add a name to the User object you're sending to MongoDB"],
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Add a name to the User object you're sending to MongoDB"],
  },
  password: { type: String, required: true },
  status: { type: String, required: true },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: String,
      required: true,
    },
  ],
});

// Create a hash sync for a new user
userSchema.method("generateHash", function (password: string) {
  // Return a hash string
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
});

// Create our model for exporting
const User = mongoose.model<UserInterface, UserModel>("User", userSchema);

export default User;
