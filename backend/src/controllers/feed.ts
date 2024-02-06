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
 */

import fs from "fs";
import path from "path";
import Post from "../models/post";
import User from "../models/user";
import { FeedRequestInterface, ErrorInterface } from "../@types";
import { NextFunction, Response } from "express";
import { validationResult } from "express-validator";

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

        const error : ErrorInterface = new Error('No Image Provided');
        error.statusCode = 422;
        throw error;
    }

    // Extract feed values from the request
    const imageUrl = request.file.path;
    const title = request.body.title;
    const content = request.body.content;

    // Create the new post and save it
    const post = new Post({
        title : title,
        content : content,
        imageUrl : imageUrl,
        creator : request.userId
    });

    // Save this to the database
    try {

        await post.save();
        const user = await User.findById(request.userId);

        // Check if we have a user
        if (user) {

            // Add reference details of the post to the user
            user.posts?.push(post);

            // Update the user
            await user.save();

            // Response
            response.status(201).json({
                message : 'Post created successfully!',
                post : post,
                creator : { _id : user._id, name : user.name }
            });

        } else {

            // Response
            response.status(421).json({
                message : 'No user was found',
                post : null,
                creator : null
            });
        }

    } catch (error) {

        next(error);
    }
};