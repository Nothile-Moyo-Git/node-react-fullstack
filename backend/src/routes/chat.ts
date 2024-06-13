/**
 * 
 * Date created : 13/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : The chat routes, this handles anything relating to socket.IO and chat functionality
 *  
 */

// Import our route handlers
import express from "express";
import { PostSendMessageController } from "../controllers/chat";

// Define our router object
const chatRoutes = express.Router({ strict : true });

// Handle routes
chatRoutes.post("/chat/send-message/:userId?", PostSendMessageController);

export default chatRoutes;