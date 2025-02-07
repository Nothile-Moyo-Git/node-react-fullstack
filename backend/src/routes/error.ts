/**
 * Date created: 30/01/2024
 *
 * Author: Nothile Moyo
 *
 * The auth route file. Handles all the routes for the requests we will perform from the front end
 */

import express from "express";

import { Handle404Response } from "../controllers/error";

const errorRoutes = express.Router({ strict: true });

// Handle our fallback router, this uses the * value
errorRoutes.all("*", Handle404Response);

export default errorRoutes;
