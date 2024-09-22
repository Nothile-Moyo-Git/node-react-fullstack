/**
 * Date created : 17/08/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL root schema description file
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import AuthResolvers from '../resolvers/AuthResolvers.ts';

// Defining the movie type so we have a reference point for the fields
const MovieType = new GraphQLObjectType({
    name : 'movies',
    fields : () => ({
        name : { type : GraphQLString },
        description : { type : GraphQLString },
        year : { type : GraphQLString }
    })
});

// Defining our auth queries
const AuthQuery = new GraphQLObjectType({
  name: 'AuthQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: AuthResolvers.hello,
    },
    getDocument: {
      type: new GraphQLObjectType({
        name: 'SingleMovie',
        fields: {
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          year: { type: GraphQLString },
        },
      }),
      args: {
        name: { type: GraphQLString },  // Add this argument to filter the documents
      },
      resolve: AuthResolvers.getDocument,
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: AuthResolvers.getMovies,
    },
  }
});

// Defining our mutations, these will be used to perform operations on the backend
const AuthMutation = new GraphQLObjectType({
  name : "AuthMutation",
  fields : {
    insertMovie : {
      type : new GraphQLObjectType({
        name : 'insertMovie',
        fields : {
          result : { type : GraphQLString }
        },
      }),
      args : {
        name : { type : GraphQLString },
        description : { type : GraphQLString },
        year : { type : GraphQLString }
      },
      resolve : AuthResolvers.insertMovie
    },
    deleteMovie : {
      type : new GraphQLObjectType({
          name : 'deleteMovie',
          fields : {
            result : { type : GraphQLString }
          },

      }),
      args : {
        _id : { type : GraphQLString }
      }
    }
  }
});

const AuthSchema = new GraphQLSchema({
    query : AuthQuery,
    mutation : AuthMutation
});

export default AuthSchema;