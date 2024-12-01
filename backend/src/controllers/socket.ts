/**
 * 
 * Date created : 26/11/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : Handles the websocket queries
 * 
 */

import { SocketRequest } from '../@types/index.ts';
import { NextFunction, Response } from 'express';
import { getIO } from '../socket.ts';

/**
 * 
 * @name emitPostCreation
 * 
 * @description Output a message about post creation to socket.io using REST instead of GraphQL due to dependency management
 * 
 * @param request : SocketRequest
 * @param response : Response
 * @param next : NextFunction
 * 
 */
export const PostEmitPostCreation = (request : SocketRequest, response : Response, next : NextFunction) => {
    
    // Get the post body of the request
    const post = request.body

    // Send the response to the front end
    getIO().emit('post added', {
        post : post
    });
    
    // Return our response
    response.status(200).json({
        success : true,
        message : "post added"
    })
};