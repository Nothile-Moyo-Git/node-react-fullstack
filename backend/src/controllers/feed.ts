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

import fs from "fs";
import path from "path";
import Post from "../models/post";
import User from "../models/user";
import { FeedRequestInterface, ErrorInterface } from "../@types";
import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import { checkFileType } from "../util/file";

export const GetPostsController = async (request : FeedRequestInterface, response : Response, next : NextFunction ) => {

    // Get the current page based on the url
    const currentPage = request.query.page || 1;
    const perPage = 2;

    try{

        // Count the number of items and total posts
        const totalNumberOfItems = await Post.find().countDocuments();

        // Fetch the posts from the backend
        const posts = await Post.find()
        .skip((Number(currentPage) - 1) * perPage)
        .limit(perPage);

        // Respond to the frontend
        response.status(200);
        
        // 
        response.json({
            message : "Fetched posts successfully",
            posts : posts,
            totalItems : totalNumberOfItems
        });

    }catch(error : unknown){

        next(error);        
    }
};

export const PostCreatePostController = async (request : FeedRequestInterface, response : Response, next : NextFunction) => {

    // Check for errors
    const errors = validationResult(request);

    // Check if there are errors
    if (!errors.isEmpty()) {

        const error : ErrorInterface = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }

    // If there is no image
    if (!request.file) {

        // Response
        response.status(201).json({
            creator : null,
            isImageValid : true,
            isTitleValid : true,
            isContentValid : true,
            isFileValid : false,
            isFileTypeValid : true,
            message : 'Error: No Image Provided',
            mimeType : null,
            success : false
        });

    } else {

        // Extract feed values from the request
        const imageUrl = request.file.path;
        const title = request.body.title;
        const content = request.body.content;

        // Validate inputs based on file type or length
        const isImageUrlValid : boolean = imageUrl.length > 0;
        const isTitleValid : boolean = title.length >= 6;
        const isContentValid : boolean = content.length >= 6 && content.length <= 200;
        const isFileValid : boolean = request.file ? true : false;
        const fileMimeType = checkFileType(request.file);
        const isFileTypeValid : boolean = (fileMimeType === "image/png" || fileMimeType === "image/jpg" || fileMimeType === "image/jpeg" );

        console.clear();
        console.log("Uploaded values");

        console.log("\n\n");
        console.log("Image url valid");
        console.log(isImageUrlValid);

        console.log("\n\n");
        console.log("File data");
        console.log(request.file);
        
        // Create the new post and save it
        const post = new Post({
            title : title,
            content : content,
            imageUrl : imageUrl,
            creator : new ObjectId(request.body.userId)
        });
        
        // Save this to the database
        try {

            // await post.save();
            const user = await User.findById(new ObjectId(request.body.userId));

            // Check if we have a user
            if (user) {

                // Add reference details of the post to the user
                user.posts?.push(post);

                // Update the user
                // await user.save();

                // Response
                response.status(201).json({
                    creator : { _id : user._id.toString(), name : user.name },
                    isContentValid : isContentValid,
                    isImageValid : isImageUrlValid,
                    isTitleValid : isTitleValid,
                    isFileValid : isFileValid,
                    isFileTypeValid : isFileTypeValid,
                    message : 'Post created successfully!',
                    mimeType : fileMimeType,
                    success : true
                });

            } else {

                // Response
                response.status(421).json({
                    creator : null,
                    isImageValid : isImageUrlValid,
                    isTitleValid : isTitleValid,
                    isContentValid : isContentValid,
                    isFileValid : isFileValid,
                    isFileTypeValid : isFileTypeValid,
                    message : 'Error 421: No user was found',
                    mimeType : null,
                    success : false
                });
            }
        } catch (error) { next(error); }
    }

};

export const GetPostController = async (request : FeedRequestInterface, response : Response, next : NextFunction) => {

    // Get the postId from the url passed through
    const postId = new ObjectId(request.params.postId);

    // Get the post
    const post = await Post.findById(postId);

    try {

        if (!post) {

            // Error handling if a post wasn't found
            const error : ErrorInterface = new Error('Error: Could not find post.');
            error.statusCode = 404;
            throw error;
        }

        // Send a response if the request is successful
        response.status(200).json({ message: 'Post fetched.', post: post });

    } catch (error : any) {

        error.statusCode = 500;
        next(error);
    }
};

export const PostUpdatePostController = async (request : FeedRequestInterface, response : Response, next : NextFunction) => {

    // Grabving the postId
    const postId = new ObjectId(request.params.postId);
    const errors = validationResult(request);

    // If the inputs are incorrect, send a response
    if (!errors.isEmpty()) {

        const error : ErrorInterface = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw error;
    }

    // Get form inputs from the frontend
    const title = request.body.title;
    const content = request.body.content;
    let imageUrl = request.body.image;

    // Get the image URL
    if (request.file) { 
        imageUrl = request.file.path; 
    }

    // If there is no image
    if (!imageUrl) {

        const error : ErrorInterface = new Error('No file picked.');
        error.statusCode = 422;
        throw error;
    }

    // Update post data
    try {

        // Get the post data
        const post = await Post.findById(postId);

        // Error message if there is no post data
        if (!post) {
            
            // Respond to the error
            const error : ErrorInterface = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }

        // Error message if we didn't attach the current user to the request
        if (post.creator.toString() !== request.userId.toString()) {

            // Return a 403 response with an error
            const error : ErrorInterface = new Error('Not authorized!');
            error.statusCode = 403;
            throw error;
        }

        // If there's a new image, delete the old one
        if (imageUrl !== post.imageUrl) {
            clearImage(post.imageUrl);
        }

        // Update post details
        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        const result = await post.save();
        response.status(200).json({ message : 'Post updated!', post : result });

    } catch (error) {
        next(error);
    }
};

// Delete the post controller
export const PostDeletePostController = async (request : FeedRequestInterface, response : Response, next : NextFunction) => {

    // Get the postId
    const postId = request.params.postId;

    try {

        // Get the post data
        const post = await Post.findById(postId);

        // If there's no post, return an error
        if (!post) {

            // Get the post data
            const error : ErrorInterface = new Error('Could not find post');
            error.statusCode = 404;
            throw error;
        }

        // If the user isn't authorized, respond with an error
        if (post.creator.toString() !== request.userId.toString()) {

            const error : ErrorInterface = new Error('Not authorized!');
            error.statusCode = 403;
            throw error;
        }

        // Check logged in User
        clearImage(post.imageUrl);
        await Post.findByIdAndDelete(postId);

        // Remove the reference for the post from MongoDB
        const user = await User.findById(request.userId);
        // user?.posts?.splice
        await user?.save();

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

// Delete image controller for the page
const clearImage = (filepath : string) => {

    // Delete the image
    filepath = path.join(__dirname, '..', filepath);
    fs.unlink(filepath, error => console.log(error));
};

