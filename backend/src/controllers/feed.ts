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
import { FeedRequestInterface } from "../@types";
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
};