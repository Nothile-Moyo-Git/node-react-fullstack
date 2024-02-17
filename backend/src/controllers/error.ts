/**
 * Date created : 16/02/2024
 * Author : Nothile Moyo
 * 
 * The error route file, contains the fallback route which leads to the 404 page in the front end
 */

import { Request, Response, NextFunction } from "express";

// Error controller
export const Get404Page = (request : Request, response : Response, next : NextFunction) => {

    // Return a 404 response for a URL that doesn't exist
    response.status(404);
    response.json({message : "Error 404: Page doesn't exist"});
};

