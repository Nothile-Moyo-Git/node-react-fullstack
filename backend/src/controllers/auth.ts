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
import { validationResult } from "express-validator";
import { validateEmailAddress, validateInputLength } from "../util/utillity-methods";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup controller
export const PostSignupController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    try {

         // Handle error validation
        const errors = validationResult(request);

        // Output an error if the request fails
        if (!errors.isEmpty()) {
            
            console.clear();
            console.log("Errors", errors.array());

            response.status(422);
            response.json({ message : "Error: Some of the fields are not valid" });
            response.end();

        }else{

            // Get body of request
            const confirmPassword = request.body.confirmPassword;
            const email = request.body.email;
            const name = request.body.name;
            const password = request.body.password;

            // Check if the inputs are valid
            const isNameValid = validateInputLength(name, 6);
            const isEmailValid = validateEmailAddress(email);
            const isPasswordValid = validateInputLength(password, 6);
            const doPasswordsMatch = password === confirmPassword;

            if (isNameValid === true && isEmailValid === true && isPasswordValid === true && doPasswordsMatch === true) {
                
                console.clear();
                console.log("Every input is valid");

                // Check if the user already exists in the database
                const users = await User.find({ email : email });
                const userExists = users.length > 0;

                if (userExists === true) {

                    response.status(200);
                    response.json({ isNameValid, isEmailValid, isPasswordValid, doPasswordsMatch, userExists });

                }else{

                    const encryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

                    // Create a new user in the database if they don't exist already
                    const newUser = new User({ email, name, password : encryptedPassword, status : "active" });

                    await newUser.save();
    
                    // Return a response
                    response.status(201);
                    response.json({ isNameValid, isEmailValid, isPasswordValid, doPasswordsMatch, userExists });
                }

            }else{

                response.status(200);
                response.json({ isNameValid, isEmailValid, isPasswordValid, doPasswordsMatch, userExists : false });
            }
        }

    }catch(error){
        
        response.status(500).json({ message : "There was a server error" });
        next(error);
    }

};

// Login Controller
export const PostLoginController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    // Get values from the form
    const email = request.body.email;
    const password = request.body.password;

    try {

        // Find the user by email
        const user = await User.findOne({ email : email });

        // Return an error if there's no user
        if (!user) {
            response.status(401);
            response.json({
               userExists : false,
               success : false,
               emailValid : false,
               passwordValid : true,
               error : "A user with this email could not be found",
               token : null
            });
        }else{

            // Compare the passwords
            const passwordsMatch = await bcrypt.compare(password, user.password);

            // If the passwords don't match
            if (passwordsMatch === false) {

                // Send a response to the front end
                response.status(401);
                response.json({
                    userExists : true,
                    success : false,
                    emailValid : true,
                    passwordValid : false,
                    error : "The password is invalid",
                    token : null
                });

            }else{

                // Create our web token and send it to the front end
                /*
                jwt.sign({

                }); */

                // Send our response to the front end
                response.status(200);
                response.json({
                    userExists : true,
                    success : true,
                    emailValid : false,
                    passwordValid : true,
                    error : null,
                    token : null
                });
            }

            // Return the response of the object
            response.status(200).json({ message: 'User created!', userId : user._id });
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