/**
 * Date created: 26/01/2024
 * Author: Nothile Moyo
 * 
 * The index file. This serves as our main method.
 * We start our server and create our connection pool here
 * 
 * @method startServer : async () => Promise<void>
 * @method generateCSRFToken : () => number
 */

// Main imports in order to run the server
import path from "path";
import express from "express";
import dotenv from "dotenv";
import { createMongooseConnection, SESSION_URI, MONGODB_USERNAME } from "./data/connection";

// Module augmentation for the request
declare module 'express-serve-static-core' {
    interface Request{
        fileName : string,
        isAuthenticated : boolean,
    }
}

// Import the .env variables
dotenv.config();

// Be able to instantiate our express server
const app = express();