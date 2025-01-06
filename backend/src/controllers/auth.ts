/**
 * Date Created : 01/02/2024
 * Author : Nothile Moyo
 * 
 * Auth Controller file
 * 
 * This controller handles the routes for functionality relating to authentication and users
 * 
 * Note: This does not cover the middleware which is used to authenticate requests before execution
 * 
 * @method PostSignupController : (request : AuthRequestInterface, response : Response, next : NextFunction) => void
 * @method PostLoginController : (request : AuthRequestInterface, response : Response, next : NextFunction) => void
 * @method GetUserStatusController : (request : AuthRequestInterface, response : Response, next : NextFunction) => void
 * @method PostUpdateUserStatusController : (request : AuthRequestInterface, response : Response, next : NextFunction) => void
 */

import { Response, NextFunction } from "express";
import { AuthRequestInterface } from "../@types/index.ts";
import { createReadableDate } from "../util/utillity-methods.ts";
import jwt from "jsonwebtoken";
import Session from "../models/session.ts";
import { ObjectId } from "mongodb";

/**
 * @name PostCheckAndCreateSessionController
 * 
 * @description A controller which checks the session we have in the backend and creates it if it does
 * 
 * @param request : AuthRequestInterface
 * @param response : Response
 * @param next : NextFunction
 */
export const PostCheckAndCreateSessionController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    try {

        // Get the userId from the parameters
        const userId = request.params.userId;
        const token = request.body.token;

        // Check if the session exists and if it doesn't, then create it
        const previousSession = await Session.findOne({ creator : new ObjectId(userId) });

        if (!previousSession) {

            // Values to be set once
            let jwtExpiryDate = "";

            // Decode the token for the expiry date
            // Verify the tokens
            jwt.verify(token, "Adeptus", (error, decoded) => {

                // Get the issued and expiry dates of our token
                // We multiply it by 1000 so that we convert this value into milliseconds which JavaScript uses
                const expiryDate = new Date(decoded["exp"] * 1000);

                // Set the values
                jwtExpiryDate = createReadableDate(expiryDate);

            });

            // Create the new session object to be saved in the backend
            const newSession = new Session({
                expires : jwtExpiryDate,
                expireAt : new Date(jwtExpiryDate),
                token : token,
                creator : new ObjectId(userId)
            });

            await newSession.save();
        }

        response.status(200).json({ success : true });

    }catch(error){

        response.status(200).json({ success : true });

    }
};

