/**
 *
 * Author : Nothile Moyo
 *
 * Date Created : 01/11/2024
 *
 * Description : Handle the GraphQL requests for the post middleware. This contains sessions and users
 *
 */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";
import postResolvers from "../resolvers/PostResolvers";

// Create the post type definition
const PostType = new GraphQLObjectType({
  name: "posts",
  fields: {
    _id: { type: GraphQLString },
    fileLastUpdated: { type: GraphQLString },
    fileName: { type: GraphQLString },
    title: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    content: { type: GraphQLString },
    creator: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

// default layout for fileData
const fileDataFields = {
  fileName: { type: GraphQLString },
  imageUrl: { type: GraphQLString },
  isImageUrlValid: { type: GraphQLBoolean },
  isFileSizeValid: { type: GraphQLBoolean },
  isFileTypeValid: { type: GraphQLBoolean },
  isFileValid: { type: GraphQLBoolean },
};

// Create a fileType that we return
const FileDataObjectType = new GraphQLObjectType({
  name: "FileObject",
  fields: fileDataFields,
});

// Defining the type for file data when we're creating posts
const FileDataInputType = new GraphQLInputObjectType({
  name: "FileInput",
  fields: fileDataFields,
});

// Define the post query request handlers for GraphQL
const PostQueries = new GraphQLObjectType({
  name: "PostQuery",
  fields: {
    GetPostsResponse: {
      type: new GraphQLObjectType({
        name: "getPosts",
        fields: {
          message: { type: GraphQLString },
          posts: { type: new GraphQLList(PostType) },
          success: { type: GraphQLBoolean },
          numberOfPages: { type: GraphQLInt },
        },
      }),
      args: {
        currentPage: { type: GraphQLInt },
      },
      resolve: postResolvers.GetPostsResolver,
    },
    GetPostResponse: {
      type: new GraphQLObjectType({
        name: "getPost",
        fields: {
          message: { type: GraphQLString },
          success: { type: GraphQLBoolean },
          post: { type: PostType },
        },
      }),
      args: {
        postId: { type: GraphQLString },
      },
      resolve: postResolvers.GetPostResolver,
    },
    GetAndValidatePostResponse: {
      type: new GraphQLObjectType({
        name: "getAndValidatePost",
        fields: {
          message: { type: GraphQLString },
          success: { type: GraphQLBoolean },
          post: { type: PostType },
          isUserValidated: { type: GraphQLBoolean },
        },
      }),
      args: {
        postId: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve: postResolvers.GetAndValidatePostResolver,
    },
  },
});

// Define the query handlers for our request from GraphQL
const PostMutations = new GraphQLObjectType({
  name: "PostMutations",
  fields: {
    PostCreatePostResponse: {
      type: new GraphQLObjectType({
        name: "createPost",
        fields: {
          post: { type: PostType },
          user: { type: GraphQLString },
          status: { type: GraphQLInt },
          success: { type: GraphQLBoolean },
          message: { type: GraphQLString },
          isContentValid: { type: GraphQLBoolean },
          isTitleValid: { type: GraphQLBoolean },
          isFileValid: { type: GraphQLBoolean },
          isFileTypeValid: { type: GraphQLBoolean },
          isFileSizeValid: { type: GraphQLBoolean },
        },
      }),
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        userId: { type: GraphQLString },
        fileData: { type: FileDataInputType },
      },
      resolve: postResolvers.PostCreatePostResolver,
    },
    PostEditPostResponse: {
      type: new GraphQLObjectType({
        name: "editPost",
        fields: {
          post: { type: PostType },
          user: { type: GraphQLString },
          status: { type: GraphQLInt },
          success: { type: GraphQLBoolean },
          message: { type: GraphQLString },
          isContentValid: { type: GraphQLBoolean },
          isPostCreator: { type: GraphQLBoolean },
          isTitleValid: { type: GraphQLBoolean },
          fileValidProps: { type: FileDataObjectType },
        },
      }),
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        postId: { type: GraphQLString },
        userId: { type: GraphQLString },
        fileData: { type: FileDataInputType },
      },
      resolve: postResolvers.PostUpdatePostResolver,
    },
    PostDeletePostResponse: {
      type: new GraphQLObjectType({
        name: "deletePost",
        fields: {
          status: { type: GraphQLInt },
          success: { type: GraphQLBoolean },
          numberOfPosts: { type: GraphQLInt },
          highestPageNumber: { type: GraphQLInt },
        },
      }),
      args: {
        postId: { type: GraphQLString },
        userId: { type: GraphQLString },
      },
      resolve: postResolvers.PostDeletePostResolver,
    },
  },
});

// Define the post schema
const PostSchema = new GraphQLSchema({
  query: PostQueries,
  mutation: PostMutations,
});

export default PostSchema;
