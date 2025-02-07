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
import { ChatInterface } from "../@types/index";

// Setting our types to be used in Mongoose
type ChatModel = Model<ChatInterface, object, object>;

// Define our schema for the Posts collection in the backend using Mongoose
const chatSchema = new mongoose.Schema<ChatInterface>(
  {
    userIds: { type: [mongoose.Schema.Types.ObjectId], required: true },
    messages: {
      type: [
        {
          message: String,
          dateSent: String,
          senderId: String,
          sender: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

// Create our model for exporting
const Chat = mongoose.model<ChatInterface, ChatModel>("Chat", chatSchema);

export default Chat;
