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
import { MongoClient, ObjectId } from 'mongodb';
import Post from '../../models/post.ts';
import User from '../../models/user.ts';
import { deleteFile, getCurrentMonthAndYear } from '../../util/file.ts';
import { getIO } from '../../socket.ts';

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

        // Delete the image
        console.log("Deleting image");
        deleteFile(fileData.imageUrl);

        // Validate our inputs
        const isTitleValid : boolean = title.length >= 3;
        const isContentValid : boolean = content.length >= 6 && content.length <= 400;

        // Getting file data
        const fileName : string = fileData.fileName;
        const imageUrl : string = fileData.imageUrl;
        const isFileValid : boolean = fileData.isFileValid;
        const isFileTypeValid : boolean = fileData.isFileTypeValid;
        const isImageUrlValid : boolean = fileData.isImageUrlValid;
        const isFileSizeValid : boolean = fileData.isFileSizeValid;

        // If any of our conditions are invalid, delete the file we just uploaded
        // if ( !isImageUrlValid || !isTitleValid || !isContentValid ) { deleteFile(imageUrl); }

        const post = new Post({
            fileName : fileName,
            fileLastUpdated : getCurrentMonthAndYear(),
            title : title,
            content : content,
            imageUrl : imageUrl,
            creator : new ObjectId(userId)
        });

        const user = await User.findById(new ObjectId(userId));

        console.log("\n");
        console.log("Title");
        console.log(title);
        console.log("\n");

        console.log("Content");
        console.log(content);
        console.log("\n");

        console.log("userId");
        console.log(userId);
        console.log("\n");

        console.log("File data");
        console.log(fileData);
        console.log("\n");

        console.log("Post");
        console.log(post);
        console.log("\n");

        console.log("User");
        console.log(user);
        console.log("\n");

        // Check if we have a user
        if (user && isImageUrlValid === true && isTitleValid === true && isContentValid === true) {

            // await post.save();

            // Add reference details of the post to the user
            user.posts?.push(post);

            // Update the user
            // await user.save();

            return {
                user : user._id,
                status : 201,
                isContentValid : isContentValid,
                isTitleValid : isTitleValid,
                isFileValid : isFileValid,
                isFileTypeValid : isFileTypeValid,
                isFileSizeValid : isFileSizeValid,
                success : true,
                message : "Post created successfully"
            };

        } else {

            return {
                user : user ? user._id : null,
                status : 421,
                isContentValid : isContentValid,
                isTitleValid : isTitleValid,
                isFileValid : isFileValid,
                isFileTypeValid : isFileTypeValid,
                isFileSizeValid : isFileSizeValid,
                success : false,
                message : "Post creation unsuccessful"
            };
        }

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
            isContentValid : false,
            isTitleValid : false,
            isFileValid : false,
            isFileTypeValid : false,
            isFileZievalid : false,
            success : false,
            message : "500 : Request was unsuccessful"
        };
    }
};


const postResolvers = {
    GetPostsResolver : GetPostsResolver,
    PostCreatePostResolver : PostCreatePostResolver
};

export default postResolvers;