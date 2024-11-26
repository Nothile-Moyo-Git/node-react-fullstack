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
 * @name emitMessage
 * 
 * @description Output a message to socket.io using REST instead of GraphQL due to dependency management
 * 
 * @param request : SocketRequest
 * @param response : Response
 * @param next : NextFunction
 * 
 */
const emitMessage = (request : SocketRequest, response : Response, next : NextFunction) => {

};

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
const emitPostCreation = (request : SocketRequest, response : Response, next : NextFunction) => {
    
    // Get the post body of the request
    const post = request.body.post;

    const io = getIO();

    // Send the response to the front end
    io && io.emit('post added', {
        post : post
    });
    
};