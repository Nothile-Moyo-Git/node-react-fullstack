/**
 * Date Created : Nothile Moyo
 * 
 * Auth Controller file
 * 
 * This controller handles the routes for functionality relating to authentication and users
 * 
 * Note: This does not cover the middleware which is used to authenticate requests before execution
 * 
 * @method signup : (request : AuthRequestInterface, response : Response, next : NextFunction) => void
 * @method login : (request : AuthRequestInterface, response : Response, next : NextFunction) => void
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
        error.statusCode(500);

        next(error);
    }
};

// Login Controller
export const PostLoginController = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

    // Get values from the form
    const email = request.body.email;
    const password = request.body.password;
    let loadedUser;

    try {

        // Find the user by email
        const user = await User.findOne({ email : email });

        if (!user) {
            const error = new Error('A user with this email could not be found');
            throw error;
        }
        
        // Compare the passwords
        const passwordsMatch = await bcrypt.compare(password, user.password);

    }catch(error){

    }

};