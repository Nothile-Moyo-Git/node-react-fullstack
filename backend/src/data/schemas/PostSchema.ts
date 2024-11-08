/**
 * 
 * Author : Nothile Moyo
 * 
 * Date Created : 01/11/2024
 * 
 * Description : Handle the GraphQL requests for the post middleware. This contains sessions and users
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLList } from "graphql";
import postResolvers from "../resolvers/PostResolvers.ts";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";

// Create the post type definition
const PostType = new GraphQLObjectType({
    name : 'posts',
    fields : {
        _id : { type : GraphQLString },
        fileLastUpdated : { type : GraphQLString },
        fileName : { type : GraphQLString },
        title : { type : GraphQLString },
        imageUrl : { type : GraphQLString },
        content : { type : GraphQLString },
        creator : { type : GraphQLString },
        createdAt : { type : GraphQLString },
        updatedAt : { type : GraphQLString }
    }
});

// Define the post query request handlers for GraphQL
const PostQueries = new GraphQLObjectType({
    name : 'PostQuery',
    fields : {
        GetPostsResponse : {
            type : new GraphQLObjectType({
                name : 'getPosts',
                fields : {
                    message : { type : GraphQLString },
                    posts : { type : new GraphQLList(PostType) },
                    success : { type : GraphQLBoolean },
                    numberOfPages : { type : GraphQLInt }
                }
            }),
            args : {
                currentPage : { type : GraphQLInt }
            },
            resolve : postResolvers.GetPostsResolver
        }
    }
});

// Define the query handlers for our request from GraphQL
const PostMutations = new GraphQLObjectType({
    name : "PostMutations",
    fields : {
        PostCreatPostResponse : {
            type : new GraphQLObjectType({
                name : "createPost",
                fields  : {
                    status : { type : GraphQLInt },
                    message : { type : GraphQLString }
                }
            }),
            args : {
                title : { type : GraphQLString },
                content : { type : GraphQLString },
                userId : { type : GraphQLString },
                file : { type : GraphQLString },
            },
            resolve : postResolvers.PostCreatePostResolver
        }
    }
});

// Define the post schema 
const PostSchema = new GraphQLSchema({
    query : PostQueries,
    mutation : PostMutations
});

export default PostSchema;





