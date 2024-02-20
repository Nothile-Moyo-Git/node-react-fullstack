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
import User from "../models/user";
import bcrypt from "bcrypt";

// Signup controller
export const PostSignupController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    // Handle error validation
    const errors = validationResult(request);

    // Test response
    response.status(200);
    response.json({ message : "Request successful", errors : errors });

    /*
    // Output an error if the request fails
    if (!errors.isEmpty()) {
        const currentError = new Error('Validation failed');
        response.status(422);
        console.clear();
        console.log("Errors", errors.array());

        throw currentError;
    }

    // Get body of request
    const email = request.body.email;
    const name = request.body.name;
    const password = request.body.password;

    try{

        // Hash our password
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

        // Create the user if the checks are valid
        const user = new User({
            email : email,
            name : name,
            password : hashedPassword
        });

        // Save the new user
        const result = await user.save();

        // Send a response to the frontend with a status code of 201
        response.status(201);
        response.json({ message : 'User created!', userId: result._id });

    } catch (error) {
        
        response.status(500).json({ message : "There was a server error" });
        next(error);
    }
    */
};

// Login Controller
export const PostLoginController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    // Get values from the form
    const email = request.body.email;
    const password = request.body.password;

    try {

        // Find the user by email
        const user = await User.findOne({ email : email });

        if (!user) {
            const error = new Error('A user with this email could not be found');
            throw error;
        }
        
        // Compare the passwords
        const passwordsMatch = await bcrypt.compare(password, user.password);

        // If the passwords don't match
        if (passwordsMatch !== false) {

            const error = new Error('Wrong password, please try again');
            throw error;
        }

        // Return the response of the object
        response.status(200).json({ message: 'User created!', userId : user._id });

    }catch(error){

        response.status(500).json({ message : "There was a server error" });
        next(error);
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