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
import { FeedRequestInterface, ErrorInterface, PostsInterface } from "../@types";
import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import { deleteFile, checkFileType, getCurrentMonthAndYear } from "../util/file";

export const GetPostsController = async (request : FeedRequestInterface, response : Response, next : NextFunction ) => {

    // Get the current page based on the url
    const currentPage = request.params.page || 1;
    const perPage = 3;

    try{

        // Count the number of items and total posts
        const totalNumberOfItems = await Post.find().countDocuments();

        // Fetch the posts from the backend, pagination is applied here
        const posts = await Post.find()
        .skip((Number(currentPage) - 1) * perPage)
        .limit(perPage);

        const totalNumberOfPages = Math.ceil(totalNumberOfItems / perPage);

        // Respond to the frontend
        response.status(200);
        
        // Send the request to the frontend
        response.json({
            message : "Fetched posts successfully",
            posts : posts,
            success : true,
            numberOfPages : totalNumberOfPages
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

    // Get our initial values and validate them so that even if we don't have an image, we can evaluate the other inputs
    const title = request.body.title;
    const content = request.body.content;

    const isTitleValid : boolean = title.length >= 3;
    const isContentValid : boolean = content.length >= 6 && content.length <= 400;

    // If there is no image
    if (!request.file) {

        // Response
        response.status(400).json({
            creator : null,
            isImageValid : false,
            isTitleValid : isTitleValid,
            isContentValid : isContentValid,
            isFileValid : false,
            isFileTypeValid : true,
            message : 'Error: No Image Provided',
            mimeType : null,
            success : false
        });

    } else {

        // Extract feed values from the request
        const imageUrl = request.file.path;

        // Validate inputs based on file type or length
        const isImageUrlValid : boolean = imageUrl.length > 0;
        const isFileValid : boolean = (request.file && request.file.size < 5000000) ? true : false;
        const fileMimeType = checkFileType(request.file);
        const isFileTypeValid : boolean = (fileMimeType === "image/png" || fileMimeType === "image/jpg" || fileMimeType === "image/jpeg" );

        // If any of our conditions are invalid, delete the file we just uploaded
        if ( !isImageUrlValid || !isTitleValid || !isContentValid ) {   deleteFile(imageUrl);   } 

        // Create the new post and save it
        const post = new Post({
            fileName : request.file.filename,
            fileLastUpdated : getCurrentMonthAndYear(),
            title : title,
            content : content,
            imageUrl : imageUrl,
            creator : new ObjectId(request.body.userId)
        });
        
        // Save this to the database
        try {

            const user = await User.findById(new ObjectId(request.body.userId));

            // Check if we have a user
            if (user && isImageUrlValid === true && isTitleValid === true && isContentValid === true) {

                await post.save();

                // Add reference details of the post to the user
                user.posts?.push(post);

                // Update the user
                await user.save();

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
                    creator : user,
                    isImageValid : isImageUrlValid,
                    isTitleValid : isTitleValid,
                    isContentValid : isContentValid,
                    isFileValid : isFileValid,
                    isFileTypeValid : isFileTypeValid,
                    message : 'Error 421: Post unsuccessfully created',
                    mimeType : null,
                    success : false
                });
            }
        } catch (error) { next(error); }
    }

};

export const GetPostController = async (request : FeedRequestInterface, response : Response, next : NextFunction) => {

    try {

        // Get the postId from the url passed through
        const postId = new ObjectId(request.params.postId);

        // Get the post
        const post = await Post.findById(postId);

        if (!post) {

            // Error handling if a post wasn't found
            const error : ErrorInterface = new Error('Error: Could not find post.');
            error.statusCode = 404;
            throw error;
        }

        // Send a response if the request is successful
        response.status(200).json({ message: 'Post fetched.', post: post, success : true });

    } catch (error : any) {

        response.status(500).json({ message: 'Post failed', post : null, success : false });
    }
};

export const PutUpdatePostController = async (request : FeedRequestInterface, response : Response, next : NextFunction) => {

    // Grabving the postId
    const postId = new ObjectId(request.params.postId);

    // Get our initial values and validate them so that even if we don't have an image, we can evaluate the other inputs
    const title = request.body.title;
    const content = request.body.content;

    // Validate out inputs
    const isTitleValid : boolean = title.length >= 3;
    const isContentValid : boolean = content.length >= 6 && content.length <= 400;

    // File validation variables
    let wasImageUploaded = false;
    let imageUrl = "";
    let isFileValid = true;
    let fileMimeType = "";
    let isFileTypeValid = true;

    // If there is no image
    if (!request.file) {

        wasImageUploaded = false;

    }else{

        // If we uploaded a new file
        fileMimeType = checkFileType(request.file);
        imageUrl = request.file.path;
        isFileValid = (request.file && request.file.size < 5000000) ? true : false;
        isFileTypeValid = (fileMimeType === "image/png" || fileMimeType === "image/jpg" || fileMimeType === "image/jpeg" );
        wasImageUploaded = true;
    }

    // Validate the image, and proceed to delete it if it isn't valid
    const isImageUrlValid : boolean = imageUrl.length > 0;

    // If any of our conditions are invalid, delete the file we just uploaded
    if ( !isImageUrlValid || !isTitleValid || !isContentValid ) { 
        wasImageUploaded === true && deleteFile(imageUrl);  
    } 

    // Update post data
    try {

        // Get the post data
        const post = await Post.findById(postId);
        const user = await User.findById(new ObjectId(request.body.userId));

        let isPostCreator : boolean = true;

        if (post) {

            // Validate the creator since only they should be able to edit their posts
            // This is done comparing the ID's, one using a reference in Mongoose so that the array that is created in the users collection is updated effectively
            user.posts.map((userPost : ObjectId | PostsInterface) => {
                if (userPost.toString() === postId.toString()){
                    isPostCreator = true;
                }
            });
        }

        if (isPostCreator === true && isTitleValid === true && isContentValid === true) {

            // Since our new image is valid, delete the old one and keep the uploaded one
            wasImageUploaded && deleteFile(post.imageUrl);

            // Update post details
            post.title = title;
            isImageUrlValid && (post.imageUrl = imageUrl);
            request.file && (post.fileName = request.file.filename);
            post.content = content;

            // Update our post
            await post.save();

            // Send a response to the front end in JSON format which we can extract using the data property
            response.status(200).json({
                creator : user,
                imageUrl : imageUrl,
                isContentValid : isContentValid,
                isFileValid : isFileValid,
                isFileTypeValid : isFileTypeValid,
                isImageUrlValid : isImageUrlValid,
                isTitleValid : isTitleValid,
                message : "Post edited successfully",
                mimeType : fileMimeType,
                post : post,
                success : true
            });

        }else{

            response.status(400).json({
                creator : user,
                imageUrl : imageUrl,
                isContentValid : isContentValid,
                isFileValid : isFileValid,
                isFileTypeValid : isFileTypeValid,
                isImageUrlValid : isImageUrlValid,
                isTitleValid : isTitleValid,
                message : "Post edited unsuccessfully",
                mimeType : fileMimeType,
                post : null,
                success : false
            });
        }

    } catch (error) {
        console.log(error);
        
        response.status(400).json({
            message : "Server error",
            success : false
        });
    }
};

// Delete the post controller
export const PostDeletePostController = async (request : FeedRequestInterface, response : Response, next : NextFunction) => {

    // Get the postId
    const postId = request.body.postId;
    const userId = request.body.userId;

    console.clear();

    try {

        // Get the post data
        const post = await Post.findById(postId);

        // If there's no post, return an error
        if (post) {

            // Check logged in User
            deleteFile(post.imageUrl);

            await Post.findByIdAndDelete(postId);

            // Remove the reference for the post from MongoDB
            const user = await User.findById(userId);

            const filteredPosts = user.posts.filter((post : PostsInterface) => post._id.toString() !== postId );

            // Update the posts with the new one to reflect the deleted post
            user.posts = filteredPosts;

            await user.save();

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

// Delete image controller for the page
const clearImage = (filepath : string) => {

    // Delete the image
    filepath = path.join(__dirname, '..', filepath);
    fs.unlink(filepath, error => console.log(error));
};

