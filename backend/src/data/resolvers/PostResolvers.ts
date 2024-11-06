/**
 * 
 * Author : Nothile Moyo
 * 
 * Date Created : 01/11/2024
 * 
 * Description : Handle the GraphQL requests for the post middleware. This contains sessions and users
 * 
 */

import { MONGODB_URI } from '../connection.ts';
import { MongoClient } from 'mongodb';

// Set up client and database connection
const client = new MongoClient(MONGODB_URI);
const database = client.db('backend');
const postsCollection = database.collection('posts');

const perPage = 3;

/**
 * @name GetPostsResolver
 * 
 * @description Get posts from the backend
 * 
 * @param parent : any
 * 
 * @param args : any
 */
const GetPostsResolver = async (parent : any, args : any) => {

    try{

        // Get the current page from the front end state
        const currentPage = args.currentPage || 1;

        // Get the total number of items
        const numberOfItems = await postsCollection.countDocuments();
        const numberOfPages = Math.ceil((numberOfItems !== 0 ? numberOfItems : 1) / perPage);

        // Fetch the posts from the backend, pagination is applied here
        const postsCursor = postsCollection.find()
        .skip((Number(currentPage) - 1) * perPage)
        .limit(perPage);

        // Convert the posts from a cursor object to an array, we do this here because we don't asynchronously request the posts above
        const posts = await postsCursor.toArray();

        // Return a json with our posts
        return{
            message : "Fetched posts successfully",
            posts : posts,
            success : true,
            numberOfPages : numberOfPages
        };

    }catch(error){

        console.log("\n\n");
        console.log("Request error:", "\n");
        console.error(error);
        console.log("\n");
        console.log("Arguments");
        console.log(args);
        console.log("\n\n");

        return {
            message : "Error 500 : Request failed, please view the server logs",
            posts : [],
            success : false,
            numberOfPages : 1
        };
    }
};

/**
 * 
 * @name PostCreatePostResolver
 * 
 * @description Create a post in the backend from a GraphQL query
 * 
 * @param parent : any
 * @param args : any
 */
const PostCreatePostResolver = async (parent : any, args : any) => {

    try {

        // Get the inputs
        const title = args.title;
        const content = args.content;
        const userId = args.userId;
        const fileData = args.fileData;

        console.log("\n\n");
        console.log("Title");
        console.log(title);
        console.log("\n\n");

        console.log("Content");
        console.log(content);
        console.log("\n\n");

        console.log("userId");
        console.log(userId);
        console.log("\n\n");

        console.log("File data");
        console.log(fileData);
        console.log("\n\n");

        // validate our inputs

        return {
            status : 201,
            success : true
        };

    }catch(error){

        console.log("\n\n");
        console.log("Request error:", "\n");
        console.error(error);
        console.log("\n");
        console.log("Arguments");
        console.log(args);
        console.log("\n\n");

        return {
            status : 500,
            success : false
        };
    }
};


const postResolvers = {
    GetPostsResolver : GetPostsResolver,
    PostCreatePostResolver : PostCreatePostResolver
};

export default postResolvers;