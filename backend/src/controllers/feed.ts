/**
 * Date created : 05/02/2024
 *
 * Author : Nothile Moyo
 *
 * Feed controller
 *
 * This controller handles the routes for functionality relating to the feed
 *
 * Note: This does not cover the middleware which is used to authenticate requests before execution
 *
 */

import { FeedRequestInterface } from "../@types/index";
import { Response } from "express";
import { deleteFile, checkFileType } from "../util/file";

/**
 * @name PostUploadFileController
 *
 * @description Handles file uploads using REST since GraphQL is not designed to handle file uploads
 * Note: Please use this endpoint alongside your GraphqL request in order to create a post
 *
 * @param request : FeedRequestInterface
 * @param response : Response
 */
export const PostUploadFileController = async (
  request: FeedRequestInterface,
  response: Response,
) => {
  try {
    // If there is no image, send a response with a status of 400
    if (!request.file) {
      // Response
      response.status(204).json({
        creator: null,
        fileUploaded: false,
        isImageUrlValid: false,
        isFileSizeValid: false,
        isFileTypeValid: false,
        isFileValid: false,
        message: "Error: No Image Provided",
        mimeType: null,
        success: false,
        fileName: null,
        imageUrl: null,
      });
    } else {
      // Extract feed values from the request
      const imageUrl = request.file.path;
      const fileName = request.file.filename;

      // Validate inputs based on file type or length
      const isImageUrlValid: boolean = imageUrl.length > 0;
      const isFileSizeValid = request.file.size < 5000000 ? true : false;
      const isFileValid: boolean =
        request.file && isFileSizeValid ? true : false;
      const fileMimeType = checkFileType(request.file);
      const isFileTypeValid: boolean =
        fileMimeType === "image/png" ||
        fileMimeType === "image/jpg" ||
        fileMimeType === "image/jpeg";

      // If any of our conditions are invalid, delete the file we just uploaded and then send a failed response
      if (!isImageUrlValid || !isFileValid || !isFileTypeValid) {
        deleteFile(imageUrl);

        response.status(400).json({
          creator: null,
          fileUploaded: false,
          isImageUrlValid: isImageUrlValid,
          isFileSizeValid: isFileSizeValid,
          isFileTypeValid: isFileTypeValid,
          isFileValid: isFileValid,
          message: "Error, Image upload failed, please check the logs",
          mimeType: null,
          success: false,
          fileName: null,
          imageUrl: null,
        });
      } else {
        response.status(200).json({
          creator: null,
          fileUploaded: true,
          isImageUrlValid: true,
          isFileSizeValid: true,
          isFileTypeValid: true,
          isFileValid: isFileValid,
          message: "Success, image has been uploaded",
          mimeType: fileMimeType,
          success: true,
          imageUrl: imageUrl,
          fileName: fileName,
        });
      }
    }
  } catch (error) {
    // Error handling, you should see this in your backend server logs if the upload fails
    console.log("\n\n");
    console.log("Error : File upload failed, check logs below");
    console.log(error);
    console.log("\n\n");
  }
};

/**
 * @name testEndpoint
 *
 * @description Use to check if endpoints work
 *
 * @param request : FeedRequestInterface
 * @param response : Response
 * @param next : NextFunction
 */
export const testEndpoint = (
  request: FeedRequestInterface,
  response: Response,
) => {
  // Send a response to the browser or the frontend
  response.status(201);
  response.json({ message: "Test" });
};
