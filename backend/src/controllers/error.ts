/**
 * Date created : 16/02/2024
 * Author : Nothile Moyo
 *
 * The error route file, contains the fallback route which leads to the 404 page in the front end
 */

import { Request, Response } from "express";

/**
 * @name Handle404Response
 *
 * @description Handle the 404 response for endpoints using REST API
 *
 * @param request : Request
 * @param response : Response
 * @param next : NextFunction
 */
export const Handle404Response = (request: Request, response: Response) => {
  // Return a 404 response for a URL that doesn't exist
  response.status(404).json({
    message:
      "Error 404: This endpoint does not exist, please check your routing.",
  });
};
