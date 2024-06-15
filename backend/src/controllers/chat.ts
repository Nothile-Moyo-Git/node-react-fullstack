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

import { Response, NextFunction } from "express";
import { ChatMessage, ChatRequestInterface } from "../@types";
import Chat from "../models/chat";
import { createReadableDate } from "../util/utillity-methods";

/**
 * @name PostSendMessageController
 * 
 * @description Handles requests when a message is sent
 * 
 * @param request : ChatRequestInterface
 * @param response : Response
 * @param next : NextFunction
 */
export const PostSendMessageController = async (request : ChatRequestInterface, response : Response, next : NextFunction) => {

    try{

        // Get the number of documents
        // We also need to create a date for the message and create / append the messages array
        const numberOfChats = await Chat.countDocuments();

        // Create a new message
        const currentDate : string = createReadableDate(new Date());
        const newMessage : ChatMessage = {
            message : request.body.newMessage,
            dateSent : currentDate
        };

        // Id values
        const userId = request.body.userId;
        const recipientId = request.body.recipientId;

        // This is for this app only, check if we have a chat already set in the backend
        console.log("Number of chats");
        console.log(numberOfChats);

        if (numberOfChats === 0) {

            // Create an array of messages with only the new message since the object doesn't exist
            const initialMessages = [{newMessage}];
            const userIds = [userId, recipientId];

            // Create new chat instance
            const chat = new Chat({
                userIds : userIds,
                messages : initialMessages
            });

            // Save it to the backend
            await chat.save();

        }else{

            const messages = JSON.parse(request.body.messages);
            
            const messagesPreview = [...messages, newMessage];
            
        }

    }catch(error){


    }






    response.status(200).json({ success : true, requestSuccess : true });
};