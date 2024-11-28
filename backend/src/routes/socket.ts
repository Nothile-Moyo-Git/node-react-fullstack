/**
 * Date created: 27/11/2024
 * 
 * Author: Nothile Moyo
 * 
 * The socket route file. Handles all the routes for the requests we will perform from the front end
 */

import express from "express";
import { PostEmitPostCreation } from '../controllers/socket.ts';

// Setting strict API routes
const socketRoutes = express.Router({ strict : true });

// Assign routes to endpoints
socketRoutes.get("/rest/socket/emit/post-created", PostEmitPostCreation);

export default socketRoutes;