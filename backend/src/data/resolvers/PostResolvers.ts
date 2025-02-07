/**
 *
 * Author : Nothile Moyo
 *
 * Date Created : 01/11/2024
 *
 * Description : Handle the GraphQL requests for the post middleware. This contains sessions and users
 *
 */

import { MONGODB_URI } from "../connection";
import { MongoClient, ObjectId } from "mongodb";
import Post from "../../models/post";
import User from "../../models/user";
import { deleteFile, getCurrentMonthAndYear } from "../../util/file";
import { formatPost } from "../../util/utillity-methods";
import { PostsInterface } from "../../@types/index";
import {
  GetPostsResolverArgs,
  GetValidatePostResolverArgs,
  ParentParam,
  PostCreatePostResolverArgs,
  PostDeletePostResolverArgs,
  PostGetPostResolverArgs,
  PostUpdatePostResolverArgs,
} from "./resolvers";

// Set up client and database connection
const client = new MongoClient(MONGODB_URI);
const database = client.db("backend");
const postsCollection = database.collection("posts");

const perPage = 3;

/**
 * @name GetPostsResolver
 *
 * @description Get posts from the backend
 *
 * @param parent : any
 * @param args : GetPostsResolverArgs
 */
const GetPostsResolver = async (
  parent: ParentParam,
  args: GetPostsResolverArgs,
) => {
  try {
    // Get the current page from the front end state
    const currentPage = args.currentPage || 1;

    // Get the total number of items
    const numberOfItems = await postsCollection.countDocuments();
    const numberOfPages = Math.ceil(
      (numberOfItems !== 0 ? numberOfItems : 1) / perPage,
    );

    // Fetch the posts from the backend, pagination is applied here
    const postsCursor = postsCollection
      .find()
      .skip((Number(currentPage) - 1) * perPage)
      .limit(perPage);

    // Convert the posts from a cursor object to an array, we do this here because we don't asynchronously request the posts above
    const posts = await postsCursor.toArray();

    // Return a json with our posts
    return {
      message: "Fetched posts successfully",
      posts: posts,
      success: true,
      numberOfPages: numberOfPages,
    };
  } catch (error) {
    console.log("\n\n");
    console.log("Request error:", "\n");
    console.error(error);
    console.log("\n");

    return {
      message: "Error 500 : Request failed, please view the server logs",
      posts: [],
      success: false,
      numberOfPages: 1,
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
 * @param args : PostCreatePostResolverArgs
 */
const PostCreatePostResolver = async (
  parent: ParentParam,
  args: PostCreatePostResolverArgs,
) => {
  try {
    // Get the inputs
    const title = args.title;
    const content = args.content;
    const userId = args.userId;
    const fileData = args.fileData;

    // Validate our inputs
    const isTitleValid: boolean = title.length >= 3;
    const isContentValid: boolean =
      content.length >= 6 && content.length <= 400;

    // Getting file data
    const fileName: string = fileData.fileName;
    const imageUrl: string = fileData.imageUrl;
    const isFileValid: boolean = fileData.isFileValid;
    const isFileTypeValid: boolean = fileData.isFileTypeValid;
    const isImageUrlValid: boolean = fileData.isImageUrlValid;
    const isFileSizeValid: boolean = fileData.isFileSizeValid;

    // If any of our conditions are invalid, delete the file we just uploaded
    if (
      !isImageUrlValid ||
      !isTitleValid ||
      !isContentValid ||
      !isFileValid ||
      !isFileTypeValid ||
      !isImageUrlValid
    ) {
      deleteFile(imageUrl);
    }

    const post = new Post({
      fileName: fileName,
      fileLastUpdated: getCurrentMonthAndYear(),
      title: title,
      content: content,
      imageUrl: imageUrl,
      creator: new ObjectId(userId),
    });

    // Get the current user so we can create a relation to the posts collection
    const user = await User.findById(new ObjectId(userId));

    // Check if we have a user
    if (
      user &&
      isImageUrlValid === true &&
      isTitleValid === true &&
      isContentValid === true
    ) {
      await post.save();

      // Add reference details of the post to the user
      user.posts?.push(post);

      // Update the user
      await user.save();

      return {
        post: post,
        user: user._id,
        status: 201,
        isContentValid: isContentValid,
        isTitleValid: isTitleValid,
        isFileValid: isFileValid,
        isFileTypeValid: isFileTypeValid,
        isFileSizeValid: isFileSizeValid,
        success: true,
        message: "Post created successfully",
      };
    } else {
      return {
        post: null,
        user: user ? user._id : null,
        status: 421,
        isContentValid: isContentValid,
        isTitleValid: isTitleValid,
        isFileValid: isFileValid,
        isFileTypeValid: isFileTypeValid,
        isFileSizeValid: isFileSizeValid,
        success: false,
        message: "Post creation unsuccessful",
      };
    }
  } catch (error) {
    console.log("\n\n");
    console.log("Request error:", "\n");
    console.error(error);
    console.log("\n");

    return {
      post: null,
      status: 500,
      isContentValid: false,
      isTitleValid: false,
      isFileValid: false,
      isFileTypeValid: false,
      isFileSizeValid: false,
      success: false,
      message: "500 : Request was unsuccessful",
    };
  }
};

/**
 *
 * @name PostGetPostResolver
 *
 * @description Gets a single post from the backend
 *
 * @param parent : any
 * @param args : PostGetPostResolverArgs
 */
const GetPostResolver = async (
  parent: ParentParam,
  args: PostGetPostResolverArgs,
) => {
  try {
    // Get arguments from the request
    const postId = new ObjectId(args.postId);

    // Get the post from the backend
    const post = await Post.findById(postId);

    if (post) {
      // Format the post so we have appropriate dates
      const postFormatted = formatPost(post);

      return {
        success: true,
        message: "Request successful",
        post: postFormatted,
      };
    } else {
      return {
        success: false,
        message: "Request successful",
        post: null,
      };
    }
  } catch (error) {
    console.log("\n\n");
    console.log("Request error:", "\n");
    console.error(error);
    console.log("\n");

    return {
      success: false,
      message: error,
      post: null,
    };
  }
};

/**
 * @name GetAndValidatePostResolver
 *
 * @description Get the post and make sure that there's a user associated with it so the request is valid
 *
 * @param parent
 * @param args : GetValidateResolverArgs
 */
const GetAndValidatePostResolver = async (
  parent: ParentParam,
  args: GetValidatePostResolverArgs,
) => {
  // Get the postId from the url passed through
  const postId = new ObjectId(args.postId);

  // Get the userId from the post to check if they match
  const userId = args.userId;

  try {
    // Check if the user exists
    const user = await User.findById({ _id: new Object(userId) });

    // Get the post
    const post = await Post.findById(postId);

    const canUserEdit =
      post && user && post.creator.toString() === user._id.toString();

    if (canUserEdit) {
      // Format the post so we have appropriate dates
      const postFormatted = formatPost(post);

      return {
        success: true,
        message: "Request successful",
        post: postFormatted,
        isUserValidated: canUserEdit,
      };
    } else {
      return {
        success: false,
        message: "User is not validated or post is not found",
        post: post,
        isUserValidated: canUserEdit,
      };
    }
  } catch (error) {
    console.log("\n\n");
    console.log("Request error:", "\n");
    console.error(error);
    console.log("\n");

    return {
      success: false,
      message: error,
      post: null,
      isUserValidated: false,
    };
  }
};

/**
 * @name PostUpdatePostResolver
 *
 * @description Update the post data based on the ID and the EditForm component on the front end
 *
 * @param parent : any
 * @param args : PostUpdatePostResolverArgs
 */
const PostUpdatePostResolver = async (
  parent: ParentParam,
  args: PostUpdatePostResolverArgs,
) => {
  // Get arguments
  const { title, userId, content, fileData, postId } = args;

  // Validating the fields in the backend so they can't be exploited
  const isTitleValid = title.length >= 3;
  const isContentValid = content.length >= 6 && content.length <= 400;
  const isFileUploadSuccessful = fileData
    ? fileData.isImageUrlValid &&
      fileData.isFileSizeValid &&
      fileData.isFileTypeValid &&
      fileData.isFileValid
    : false;

  try {
    if (isFileUploadSuccessful && (!isTitleValid || !isContentValid)) {
      deleteFile(fileData.imageUrl);
      return {
        post: null,
        status: 200,
        isContentValid: isContentValid,
        isTitleValid: isTitleValid,
        success: true,
        message: "200 : Request was successful",
        fileValidProps: fileData,
        isPostCreator: null,
      };
    } else {
      // Get the post and the user
      const post = await Post.findById(new ObjectId(postId));
      const user = await User.findById(new ObjectId(userId));

      let isPostCreator = false;

      // Validate the creator since only they should be able to edit their posts
      // This is done comparing the ID's, one using a reference in Mongoose so that the array that is created in the users collection is updated effectively
      if (user && user.posts) {
        user.posts.map((userPostId: PostsInterface) => {
          if (userPostId.toString() === postId.toString()) {
            isPostCreator = true;
          }
        });
      }

      if (post && isPostCreator) {
        // Delete the old image as we update the url with the new one
        if (isFileUploadSuccessful) {
          deleteFile(post.imageUrl);
          post.fileName = fileData.fileName;
          post.fileLastUpdated = getCurrentMonthAndYear();
          post.imageUrl = fileData.imageUrl;
        }

        // Update post details
        post.content = content;
        post.title = title;

        await post.save();
      }

      return {
        post: post,
        status: 200,
        isContentValid: isContentValid,
        isTitleValid: isTitleValid,
        success: true,
        message: "200 : Request was successful",
        fileValidProps: fileData,
        isPostCreator: isPostCreator,
      };
    }
  } catch (error) {
    console.log("\n\n");
    console.log("Request error:", "\n");
    console.error(error);
    console.log("\n");

    return {
      post: null,
      status: 500,
      isContentValid: false,
      isTitleValid: false,
      success: false,
      message: "500 : Request was unsuccessful",
      fileValidProps: fileData,
      isPostCreator: null,
    };
  }
};

/**
 * @name PostDeletePostController
 *
 * @description Delete the post from the backend
 *
 * @param parent : any
 * @param args : PostDeletePostResolverArgs
 */
const PostDeletePostResolver = async (
  parent: ParentParam,
  args: PostDeletePostResolverArgs,
) => {
  // Get arguments
  const postId = args.postId;
  const userId = args.userId;

  let numberOfPosts = 0,
    highestPageNumber = 1;

  try {
    // Get post data
    const post = await Post.findById(new ObjectId(postId));

    // Remove the reference for the post from MongoDB
    const user = await User.findById(userId);

    // If there's no post, return an error
    if (post && user) {
      await Post.findByIdAndDelete(postId);

      const filteredPosts = user.posts
        ? user.posts.filter(
            (post: PostsInterface) => post._id.toString() !== postId,
          )
        : [];

      // Update the posts with the new one to reflect the deleted post
      user.posts = filteredPosts;

      // Get the number of posts so we can determine what page we're on
      numberOfPosts = await Post.find().countDocuments();

      // Calculate the highest page number so we can change it to that if there are no posts on our page
      highestPageNumber = Math.ceil(numberOfPosts / perPage);

      await user.save();

      // Check logged in User
      deleteFile(post.imageUrl);
    }

    return {
      status: 200,
      success: true,
      numberOfPosts,
      highestPageNumber,
    };
  } catch (error) {
    console.log("\n\n");
    console.log("Request error:", "\n");
    console.error(error);
    console.log("\n");

    return {
      status: 200,
      success: true,
      numberOfPosts,
      highestPageNumber,
    };
  }
};

const postResolvers = {
  GetAndValidatePostResolver: GetAndValidatePostResolver,
  GetPostResolver: GetPostResolver,
  GetPostsResolver: GetPostsResolver,
  PostCreatePostResolver: PostCreatePostResolver,
  PostUpdatePostResolver: PostUpdatePostResolver,
  PostDeletePostResolver: PostDeletePostResolver,
};

export default postResolvers;
