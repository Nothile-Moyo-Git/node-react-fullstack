/**
 * Date created: 27/11/2024
 *
 * Author: Nothile Moyo
 *
 * The socket route file. Handles all the routes for the requests we will perform from the front end
 */

import express from "express";
import {
  PostEmitPostCreation,
  PostEmitPostDeletion,
} from "../controllers/socket";

// Setting strict API routes
const socketRoutes = express.Router({ strict: true });

// Assign routes to endpoints
socketRoutes.post("/rest/socket/emit/post-created", PostEmitPostCreation);
socketRoutes.post("/rest/socket/emit/post-deleted", PostEmitPostDeletion);

export default socketRoutes;
