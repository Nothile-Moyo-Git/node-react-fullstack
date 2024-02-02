/**
 * Date Created : Nothile Moyo
 * 
 * Auth Controller file
 * 
 * This controller handles the routes for functionality relating to authentication and users
 * 
 * Note: This does not cover the middleware which is used to authenticate requests before execution
 */

import { Request, Response, NextFunction } from "express";
import { AuthRequestInterface } from "../@types";
import { validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcrypt";

const signup = async (request : AuthRequestInterface, response : Response, next : NextFunction) => {

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

    } catch (error) {
        error.statusCode(500);
    }
};