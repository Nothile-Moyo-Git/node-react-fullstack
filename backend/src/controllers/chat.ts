/**
 * Date created: 12/06/2024
 *
 * Author : Nothile Moyo
 *
 * Description: The chat controller. This handles the routes which allow us to create new chat instances in the backend
 * These instances will hold all of the chats between multiple users and allow them to share it
 *
 * This is supposed to replicate a chat between two users, not multiple users all at once
 */

import { Response } from "express";
import { ChatMessage, ChatRequestInterface } from "../@types/index";
import Chat from "../models/chat";
import { createReadableDate } from "../util/utillity-methods";
import { getIO } from "../socket";

/**
 * @name PostSendMessageController
 *
 * @description Handles requests when a message is sent
 *
 * @param request : ChatRequestInterface
 * @param response : Response
 * @param next : NextFunction
 */
export const PostSendMessageController = async (
  request: ChatRequestInterface,
  response: Response,
) => {
  try {
    // Get the number of documents
    // We also need to create a date for the message and create / append the messages array
    const numberOfChats = await Chat.countDocuments();

    // Create a new message
    const currentDate: string = createReadableDate(new Date());
    const senderId = request.body.senderId;
    const sender = request.body.sender;

    const newMessage: ChatMessage = {
      message: request.body.newMessage,
      dateSent: currentDate,
      senderId: senderId,
      sender: sender,
    };

    // Id values
    const recipientId = request.body.recipientId;

    if (numberOfChats === 0) {
      // Create an array of messages with only the new message since the object doesn't exist
      const initialMessages = [{ ...newMessage }];

      const userIds = [senderId, recipientId];

      // Create new chat instance
      const chat = new Chat({
        userIds: userIds,
        messages: initialMessages,
      });

      // Send the response to the front end
      getIO().emit("message sent", newMessage);

      // Save it to the backend
      await chat.save();
    } else {
      // Get the chat if we already have one
      const chatInstance = await Chat.find().limit(1);

      // Get the messages from the backend
      const messages = chatInstance[0].messages;

      // Add the new message to the array of previous messages
      const updatedMessages = [...messages, { ...newMessage }];

      // Update the old messages with the new messages and push them up
      chatInstance[0].messages = updatedMessages;

      // Send the response to the front end with a socket message
      getIO().emit("message sent", newMessage);

      // Save it to the backend
      await chatInstance[0].save();
    }

    response.status(200).json({ success: true, error: null });
  } catch (error) {
    // Output the error to the backend
    console.log(error);
    response.status(500).json({ success: false, error: error });
  }
};

/**
 *
 * @name PostCurrentChatController
 *
 * @description Get the current chat messages sent between two clients
 *
 * @param request : ChatRequestInterface
 * @param response : Response
 * @param next : NextFunction
 */
export const PostCurrentChatController = async (
  request: ChatRequestInterface,
  response: Response,
) => {
  try {
    // Get the number of items you have in your chat
    const numberOfChats = await Chat.countDocuments();

    // If a chat already exists
    if (numberOfChats === 0) {
      // Return an empty array
      response.status(200).json({ success: true, messages: [], error: null });
    } else {
      // Get the messages from the chat
      const messages = await Chat.find();

      // Send a response to the front end
      response
        .status(200)
        .json({ success: true, messages: messages[0], error: null });
    }
  } catch (error) {
    // Output the error to the backend
    console.log(error);
    response.status(500).json({ success: false, error: error });
  }
};
