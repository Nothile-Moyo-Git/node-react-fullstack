/**
 * Date created : 31/01/2024
 *
 * Author : Nothile Moyo
 *
 * Posts Model description
 * Handles the typing for the posts that will be uploaded and gets queried to the front end
 *
 * Note: Static methods are used here since we don't always need to instantiate our Object (e.g deletion)
 *
 * Note: The typing for this should be done as a generic when updating the type
 */

import mongoose, { Model } from "mongoose";
import { PostsInterface, PostsMethodsInterface } from "../@types/index";

// Setting our types to be used in Mongoose
type PostModel = Model<PostsInterface, object, PostsMethodsInterface>;

// Define our schema for the Posts collection in the backend using Mongoose
const postSchema = new mongoose.Schema<PostsInterface>(
  {
    fileLastUpdated: { type: String, required: true },
    fileName: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    content: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

// Add Posts to the collection
postSchema.method("addPost", function () {
  // Add it to the collection
  this.save();
});

// Create our model for exporting
const Post = mongoose.model<PostsInterface, PostModel>("Post", postSchema);

export default Post;
