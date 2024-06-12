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

/**
 * @name PostSendMessageController
 * 
 * @description Handles requests when a message is sent
 * 
 * @param request : ChatRequestInterface
 * @param response : Response
 * @param next : NextFunction
 */
export const PostSendMessageController = (request : ChatRequestInterface, response : Response, next : NextFunction) => {

    response.status(200).json({ success : true });
};