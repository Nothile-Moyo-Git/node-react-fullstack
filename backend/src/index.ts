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

import fs from "fs";
import path from "path";
import session, { Session } from "express-session";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { getFolderPathFromDate, getFileNamePrefixWithDate } from "./util/utillity-methods";
import { createMongooseConnection, SESSION_URI, MONGODB_USERNAME } from "./data/connection";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import multer from "multer";
import flash from "connect-flash";

// Module augmentation for the request
declare module 'express-serve-static-core' {
    interface Request{
        fileName : string,
        isAuthenticated : boolean,
        session : {
            csrfToken : string
        }
    }
}

// Import the .env variables
dotenv.config();

// Be able to instantiate our express server
const app = express();

// Get our port number from our environment file
const port = process.env.EXPRESS_PORT;

// Set up options for disk storage, we do this because we store the files as a hashcode and a manual extention needs to be added
const fileStorage = multer.diskStorage({
    destination : (request : Request, file : Express.Multer.File, callback : (error: Error | null, destination: string) => void) => {

        // Set the folder path
        const folderPath = `src/uploads/${ getFolderPathFromDate() }`;

        // Check if our folder path already exists
        const folderExists = fs.existsSync(folderPath);

        // Create our folder path if it doesn't exist
        if (folderExists === false) {
            fs.mkdirSync(folderPath, {recursive : true});
        }

        callback(null, folderPath);
    },
    filename : (request : Request, file : Express.Multer.File, callback : (error: Error | null, destination: string) => void) => {
        
        // Set the filepath with the name
        const fileName = getFileNamePrefixWithDate() + '_' + file.originalname;

        // Passing the fileName through so that when we create our random suffix, we don't create a second one
        request.fileName = fileName;

        callback(null, fileName);
    }
});

// Enable cookie parsing middleware
app.use( cookieParser() );

// Allow flash messages to be used
app.use( flash() );

// Here we create a session, but unlike before, we store it on the server side.
// We instead store a secret key that's passed through to the backend
// It cannot be guessed, but our session data is also usable whenever we run our applications since we don't store it in memory
// The options also end sessions after 2 weeks, and check this and run the end innately in MongoDB
app.use( async ( request : Request, response : Response, next : NextFunction ) => {

    session({
        // Set our secret which is turned into a hashkey
        secret : "Adeptus",
        resave : false,
        saveUninitialized : false,
        name : "Adeptus",

        // Store on the server instead of memory
        store : MongoStore.create({
            mongoUrl : SESSION_URI,
            dbName : "shop",
            // Note : set a collection name you're not already using, in this case, we use "sessions"
            collectionName : "sessions",
            autoRemove : "native",
            autoRemoveInterval : 10
        })  
    });
});

// Generate a random CSRF token without using a deprecated package
const generateCSRFToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Create our middleware
// Middleware refers to software or "code" that allows a connection and interaction with a database
// Executes on every request
app.use( async( request : Request, response : Response, next : NextFunction ) => {

    // Create a new CSRF token and save it on the server session
    if (!request.session.csrfToken) {
        request.session.csrfToken = generateCSRFToken();
    }

    next();
});

// Spin up the local server on the port to 
const startServer = async () => {

    // Create a Mongoose connection
    await createMongooseConnection(() => {

        // Listen to the port
        const server = app.listen(port, () => {
            console.log(`[Server]: Server is running on http://localhost:${port}`);
        });

    });
};

// Start the server
startServer();