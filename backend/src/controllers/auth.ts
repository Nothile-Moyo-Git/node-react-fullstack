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
import { validateEmailAddress, validateInputLength } from "../util/utillity-methods";
import User from "../models/user";
import { validatePassword } from "../util/utillity-methods";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
                        userId : user._id.toString()
                    },
                    "Adeptus",
                    { expiresIn: '14d' }
                );

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

// Get the user status
export const GetUserStatusController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    try {

        // Find the user based on the ID passed through
        const user = await User.findById(request.userId);

        // Output an error if we don't find a user
        if (!user) {

            const error = new Error('User not found');
            throw error;
        }else{

            // Send the json response back to the front end
            response.status(200).json({ userStatus : user.status });
        }

    } catch (error) {

        response.status(500).json({ message : "There was a server error" });
        next(error);
    }
};

export const PostUpdateUserStatusController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    // Create a new status
    const newStatus = request.body.status;

    // Update the user status to something new in a try catch block
    try {

        // Get the current user based on the ID from the frontend
        const currentUser = await User.findById(request.userId);

        // Handle previous error
        if (currentUser === null || currentUser === undefined) {
            const error = new Error('User not found');
            response.status(404).json({ message : 'User not found'});
            throw error;
        }else{

            // Set the new user status if our user is valid
            currentUser.status = newStatus;
            await currentUser.save();
            response.status(200).json({ message : "User successfully updated" });
        }

    } catch (error) {

        response.status(400).json({ message : error});
        next(error);
    }
};