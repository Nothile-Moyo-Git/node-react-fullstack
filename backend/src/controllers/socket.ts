/**
 *
 * Date created : 26/11/2024
 *
 * Author : Nothile Moyo
 *
 * Description : Handles the websocket queries
 *
 */

import { SocketRequest } from "../@types/index";
import { Response } from "express";
import { getIO } from "../socket";

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
export const PostEmitPostCreation = (
  request: SocketRequest,
  response: Response,
) => {
  // Get the post body of the request
  const post = request.body;

  // Send the response to the front end
  getIO().emit("post added", {
    post: post,
  });

  // Return our response
  response.status(200).json({
    success: true,
    message: "post added",
  });
};

/**
 *
 * @name emitPostDeletion
 *
 * @description Output the message for the post deletion endpoint, should be done after querying PostDeletePostResponse
 *
 * @param request : SocketRequest
 * @param response : Response
 * @param next : NextFunction
 */
export const PostEmitPostDeletion = (
  request: SocketRequest,
  response: Response,
) => {
  // Get the post body of the request
  const { numberOfPosts, highestPageNumber } = request.body;

  // Send the response to the front end
  getIO().emit("post deleted", {
    numberOfPosts,
    highestPageNumber,
  });

  // Return our response
  response.status(200).json({
    numberOfPosts,
    highestPageNumber,
  });
};
