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
import { ChatRequestInterface } from "../@types";
import Chat from "../models/chat";

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

    // Get the number of documents
    const numberOfChats = await Chat.countDocuments();

    // This is for this app only, check if we have a chat already set in the backend
    console.log("Number of chats");
    console.log(numberOfChats);

    if (numberOfChats === 0) {

        const chat = new Chat();
        
    }

    console.log("\n\n");
    console.log("Request body");
    console.log(request.body);

    console.log("messages");
    console.log(JSON.parse(request.body.messages));

    response.status(200).json({ success : true, requestSuccess : true });
};