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
import { AuthRequestInterface } from "../@types";
import { createReadableDate, validateEmailAddress, validateInputLength } from "../util/utillity-methods";
import User from "../models/user";
import { validatePassword } from "../util/utillity-methods";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../models/session";
import { ObjectId } from "mongodb";

// Signup controller
export const PostSignupController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    try {

        // Get body of request
        const confirmPassword = request.body.confirmPassword;
        const email = request.body.email.toLowerCase();
        const name = request.body.name;
        const password = request.body.password;

        // Check if the inputs are valid
        const isNameValid = validateInputLength(name, 6);
        const isEmailValid = validateEmailAddress(email);
        const isPasswordValid = validatePassword(password);
        const doPasswordsMatch = password === confirmPassword;

        // Check if the user already exists in the database
        const users = await User.find({ email : email });
        const userExists = users.length > 0;

        if (isNameValid === true && isEmailValid === true && isPasswordValid === true && doPasswordsMatch === true) {

            if (userExists === true) {

                response.status(200);
                response.json({ 
                    isNameValid, 
                    isEmailValid, 
                    isPasswordValid,
                    doPasswordsMatch, 
                    userExists,
                    userCreated : false
                });

            }else{

                const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

                // Create a new user in the database if they don't exist already
                const newUser = new User({ email, name, password : encryptedPassword, status : "active" });

                await newUser.save();

                // Return a response
                response.status(201);
                response.json({ 
                    isNameValid,
                    isEmailValid, 
                    isPasswordValid, 
                    doPasswordsMatch, 
                    userExists,
                    userCreated : true
                });
            }

        }else{

            response.status(200);
            response.json({ 
                isNameValid, 
                isEmailValid, 
                isPasswordValid, 
                doPasswordsMatch, 
                userExists : userExists,
                userCreated : false
            });
        }

    }catch(error){
        
        response.status(500).json({ message : "There was a server error" });
        next(error);
    }
};

// Login Controller
export const PostLoginController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    // Get values from the form
    const email = request.body.email.toLowerCase();
    const password = request.body.password;

    try {

        // Find the user by email
        const user = await User.findOne({ email : email });

        // Return an error if there's no user
        if (user === null) {
            response.status(200);
            response.json({
               userExists : false,
               success : false,
               emailValid : false,
               passwordValid : true,
               emailErrorText : "Error: A user with this email address could not be found",
               passwordErrorText : "",
               token : null,
               userId : null
            });
        }else{

            // Compare the passwords
            const passwordsMatch = await bcrypt.compare(password, user.password);

            // If the passwords don't match
            if (passwordsMatch === false) {

                // Send a response to the front end
                response.status(200);
                response.json({
                    userExists : true,
                    success : false,
                    emailValid : true,
                    emailErrorText : "",
                    passwordValid : false,
                    passwordErrorText : "Error: The password is invalid",
                    token : null,
                    userId : null
                });

            }else{

                // Create our web token and send it to the front end
                const token = jwt.sign(
                    {
                        email : user.email,
                        name : user.name,
                        userId : user._id.toString()
                    },
                    "Adeptus",
                    { expiresIn: "14d" }
                );

                // Values to be set once
                let jwtExpiryDate = "";

                // Decode the token for the expiry date
                // Verify the tokens
                jwt.verify(token, "Adeptus", (error, decoded) => {

                    // Get the issued and expiry dates of our token
                    // We multiply it by 1000 so that we convert this value into milliseconds which JavaScript uses
                    const expiryDate = new Date(decoded['exp'] * 1000);

                    // Set the values
                    jwtExpiryDate = createReadableDate(expiryDate);

                });

                // Check if we already have a session, if we do, then update it
                let previousSession = await Session.findOne({
                    creator : new ObjectId(user._id)
                });

                if (previousSession) {

                    // If we have a previous Session, we update it
                    previousSession.expires = jwtExpiryDate;
                    previousSession.token = token;
                    await previousSession.save();
                } else {

                    // Create the session if it doesn't exist
                    const session = new Session({
                        expires : jwtExpiryDate,
                        token : token,
                        creator : new ObjectId(user._id)
                    }); 

                    // Save the session
                    await session.save();
                }

                // Send our response to the front end
                response.status(200);
                response.json({
                    userExists : true,
                    success : true,
                    emailValid : true,
                    emailErrorText : "",
                    passwordValid : true,
                    passwordErrorText : "",
                    token : token,
                    userId : user._id.toString()
                });
            }
        }

    }catch(error){

        response.status(500);
        response.json({ message : "There was a server error" });
    }
};

/**
 * @name GetUserStatusController
 * 
 * @description Gets the current user of the status bsed on the userId passed through the parameter
 * 
 * @param request : AuthRequestInterface
 * @param response : Response
 * @param next : NextFunction
 * 
 * @returns success : boolean, status : string
 */
export const GetUserStatusController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    try{

        // Get the userId from the request url
        const userId = request.params.id;

        // If we don't have a user, then return no status and say that the request failed
        if (userId !== undefined) {

            // Find the user based on the ID passed through
            const user = await User.findById(userId);

            // Get the status
            const status = user.status ? user.status : null;

            response.status(200).json({ success : true, status : status });
        }else{
            response.status(206).json({ success : false, status : null });
        }

    }catch(error){

        response.status(400).json({ success : false, status : null });
    }
};

/**
 * 
 * @name PostUpdateUserStatusController
 * 
 * @description Update the status of the user in the backend
 * 
 * @param request : AuthRequestInterface
 * @param response : Response
 * @param next : NextFunction
 */
export const PostUpdateUserStatusController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    // Update the user status to something new in a try catch block
    try {

        // Create a new status
        const newStatus = request.body.status;
        const userId = request.params.id;

        // Get the current user based on the ID from the frontend
        const currentUser = await User.findById(userId);

        // If we have a user, then update the status otherwise return a 206 response
        if (currentUser) {

            // Save the updated field on the user
            currentUser.status = newStatus;
            await currentUser.save();

            // Send the response back to the frontend
            response.status(200).json({ success : true, message : "Status updated successfully" });
        }else{

            response.status(206).json({ success : false, message : "Error : User could not be found" })
        }

        console.log("Current user");
        console.log(currentUser);
    } catch (error) {

        response.status(400).json({ success : false, message : error });

    }
};

/**
 * @name GetUserDetailsController
 * 
 * @description Get the details of the current user
 * 
 * @param request : AuthRequestInterface, response : Response, next : NextFunction
 */
export const PostGetUserDetailsController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    // Check if the user exists with the id
    const userId = request.body.userId;
    const token = request.body.token;

    // Values to be set once
    let jwtCreationDate = "";
    let jwtExpiryDate = "";

    // Verify the tokens
    jwt.verify(token, "Adeptus", (error, decoded) => {

        // Get the issued and expiry dates of our token
        // We multiply it by 1000 so that we convert this value into milliseconds which JavaScript uses
        const expiryDate = new Date(decoded['exp'] * 1000);
        const issuedAtDate = new Date(decoded['iat'] * 1000);

        // Set the values
        jwtExpiryDate = createReadableDate(expiryDate);
        jwtCreationDate = createReadableDate(issuedAtDate);

    });

    try{

        // Try to fetch the user using the userId
        const user = await User.findById(new ObjectId(userId));

        if (user) {
            response.status(200).json({
                user,
                sessionExpires : jwtExpiryDate,
                sessionCreated : jwtCreationDate
            });
        }

    }catch(error){

        response.status(400).json({ user : null });
    }
};

/**
 * @name PostDeleteSessionController
 * 
 * @description A controller which deletes our session if our user logs out or the session has expired
 * 
 * @param userId : string
 */
export const PostDeleteSessionController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    // userId
    const userId = request.body.userId;

    try{

        // Delete the session if it exists
        await Session.findOneAndDelete({ creator : userId });

        // Send the response 
        response.status(200).json({
            success : true,
            message : "Request successful"
        });

    }catch(error){

        response.status(202).json({
            success : false,
            message : "Error: No userId was provided for this request"
        });
    }
};

