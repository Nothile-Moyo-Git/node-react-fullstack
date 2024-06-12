/**
 * 
 * Date created : 12/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * Chat Model description
 * Handles the typing for the chat that will be uploaded and gets queried to the front end
 * 
 * Note: Static methods are used here since we don't always need to instantiate our Object (e.g deletion)
 * 
 * Note: The typing for this should be done as a generic when updating the type 
 * 
 */

import mongoose, { Model } from "mongoose";
import { ChatInterface, ChatMessage } from "../@types";

// Setting our types to be used in Mongoose
type ChatModel = Model<ChatInterface, {}, {}>

// Define our schema for the Posts collection in the backend using Mongoose
const postSchema = new mongoose.Schema<ChatInterface>({
    userIds : { type : [mongoose.Schema.Types.ObjectId], required : true },
    messages : { type : [{message : String, dateSent : String}] }
},{
    timestamps : true
});

// Create our model for exporting
const Post = mongoose.model<ChatInterface, ChatModel>("Post", postSchema);

export default Post;
