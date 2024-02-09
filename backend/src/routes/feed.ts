/**
 * Date created: 30/01/2024
 * Author: Nothile Moyo
 * 
 * The auth route file. Handles all the routes for the requests we will perform from the front end
 */

import express from "express";
import { testEndpoint } from "../controllers/feed";

const feedRoutes = express.Router({ strict : true });

// Handle our api routes
feedRoutes.get('/test', testEndpoint);

export default feedRoutes;