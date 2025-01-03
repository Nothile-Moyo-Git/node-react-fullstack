/**
 * Date created: 29/01/2024
 * 
 * Author: Nothile Moyo
 * 
 * The auth route file. Handles all the routes for the requests we will perform from the front end
 */

// Import our route handlers
import express from "express";
import {
    PostGetUserDetailsController,
    GetUserStatusController,
    PostLoginController,
    PostSignupController,
    PostUpdateUserStatusController,
    PostCheckAndCreateSessionController
} from "../controllers/auth.ts";

// Define our router object
const authRoutes = express.Router({ strict : true });

// Handle routes
authRoutes.post("/user/:id?", PostGetUserDetailsController);
authRoutes.get("/user/:id/status", GetUserStatusController);
authRoutes.post("/login", PostLoginController);
authRoutes.post("/signup", PostSignupController);
authRoutes.post("/user/:id/update", PostUpdateUserStatusController);
authRoutes.post("/check-create-session/:userId?", PostCheckAndCreateSessionController);


export default authRoutes;