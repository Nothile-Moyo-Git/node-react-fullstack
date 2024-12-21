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
 * @method GetPostsController : async (request : FeedRequestInterface, response : Response, next : NextFunction) => void
 * @method PostCreatePostController : async (request : FeedRequestInterface, response : Response, next : NextFunction) => void
 * @method GetPostController : async (request : FeedRequestInterface, response : Response, next : NextFunction) => void
 * @method PostUpdatePostController : async (request : FeedRequestInterface, response : Response, next : NextFunction) => void
 * @method PostDeletePostController : async (request : FeedRequestInterface, response : Response, next : NextFunction) => void
 * @method ClearImage : async (request : FeedRequestInterface, response : Response, next : NextFunction) => void
 * @method testEndpoint : async (request : FeedRequestInterface, response : Response, next : NextFunction) => void
 */

import Post from "../models/post.ts";
import User from "../models/user.ts";
import { FeedRequestInterface, PostsInterface } from "../@types/index.ts";
import { NextFunction, Response } from "express";
import { deleteFile, checkFileType } from "../util/file.ts";
import { getIO } from "../socket.ts";

const perPage = 3;

/**
 * @name PostUploadFileController
 * 
 * @description Handles file uploads using REST since GraphQL is not designed to handle file uploads
 * Note: Please use this endpoint alongside your GraphqL request in order to create a post
 * 
 * @param request : FeedRequestInterface
 * @param response : Response
 */
export const PostUploadFileController = async (request : FeedRequestInterface, response : Response) => {

    try {

        // If there is no image, send a response with a status of 400
        if (!request.file) {

            // Response
            response.status(204).json({
                creator : null,
                fileUploaded : false,
                isImageUrlValid : false,
                isFileSizeValid : false,
                isFileTypeValid : false,
                isFileValid : false,
                message : 'Error: No Image Provided',
                mimeType : null,
                success : false,
                fileName : null,
                imageUrl : null
            });

        } else {

            // Extract feed values from the request
            const imageUrl = request.file.path;
            const fileName = request.file.filename;

            // Validate inputs based on file type or length
            const isImageUrlValid : boolean = imageUrl.length > 0;
            const isFileSizeValid = request.file.size < 5000000 ? true : false;
            const isFileValid : boolean = (request.file && isFileSizeValid) ? true : false;
            const fileMimeType = checkFileType(request.file);
            const isFileTypeValid : boolean = (fileMimeType === "image/png" || fileMimeType === "image/jpg" || fileMimeType === "image/jpeg" );

            // If any of our conditions are invalid, delete the file we just uploaded and then send a failed response
            if ( !isImageUrlValid || !isFileValid || !isFileTypeValid ) {

                deleteFile(imageUrl);

                response.status(400).json({
                    creator : null,
                    fileUploaded : false,
                    isImageUrlValid : isImageUrlValid,
                    isFileSizeValid : isFileSizeValid,
                    isFileTypeValid : isFileTypeValid,
                    isFileValid : isFileValid,
                    message : "Error, Image upload failed, please check the logs",
                    mimeType : null,
                    success : false,
                    fileName : null,
                    imageUrl : null
                });

            }else{

                response.status(200).json({
                    creator : null,
                    fileUploaded : true,
                    isImageUrlValid : true,
                    isFileSizeValid : true,
                    isFileTypeValid : true,
                    isFileValid : isFileValid,
                    message : "Success, image has been uploaded",
                    mimeType : fileMimeType,
                    success : true,
                    imageUrl : imageUrl,
                    fileName : fileName
                });
            } 
        }

    } catch(error) {

        // Error handling, you should see this in your backend server logs if the upload fails
        console.log("\n\n");
        console.log("Error : File upload failed, check logs below");
        console.log(error);
        console.log("\n\n");
    }
};



// Delete the post controller
export const PostDeletePostController = async (request : FeedRequestInterface, response : Response, next : NextFunction) => {

    // Get the postId
    const postId = request.body.postId;
    const userId = request.body.userId;

    try {

        // Get the post data
        const post = await Post.findById(postId);

        // If there's no post, return an error
        if (post) {

            await Post.findByIdAndDelete(postId);

            // Remove the reference for the post from MongoDB
            const user = await User.findById(userId);

            const filteredPosts = user.posts.filter((post : PostsInterface) => post._id.toString() !== postId );

            // Update the posts with the new one to reflect the deleted post
            user.posts = filteredPosts;

            // Get the number of posts so we can determine what page we're on
            const numberOfPosts = await Post.find().countDocuments();

            // Calculate the highest page number so we can change it to that if there are no posts on our page
            const highestPageNumber = Math.ceil(numberOfPosts / perPage);

            // Send the response to the front end
            getIO().emit('post deleted', { 
                numberOfPosts,
                highestPageNumber
            });

            await user.save();

            // Check logged in User
            deleteFile(post.imageUrl);

            response.status(200).json({ success : true });
        }

    } catch (error) {

        next(error);
    }
};

// Test endpoint
export const testEndpoint = (request : FeedRequestInterface, response : Response, next : NextFunction) => {

    // Send a response to the browser or the frontend
    response.status(201);
    response.json({ message : 'Test' });
};

