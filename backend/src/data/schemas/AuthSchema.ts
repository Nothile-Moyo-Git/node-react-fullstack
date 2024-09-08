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

/*
// Defining the auth queries
const AuthQuery = new GraphQLObjectType({
    name : 'AuthQuery',
    fields : {
        hello : {
            type : GraphQLString,
            resolve: AuthResolvers.hello
        },
        getDocument : {
            type : GraphQLString,
            resolve: AuthResolvers.getDocument
        },
        movies : {
            type : new GraphQLList(MovieType),
            resolve: AuthResolvers.getMovies
        }
    }
}); */

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
          name: 'Document',
          fields: {
            name: { type: GraphQLString },
            description: { type: GraphQLString },
            year: { type: GraphQLString },
          },
        }),
        args: {
          filter: { type: GraphQLString },  // Add this argument to filter the documents
        },
        resolve: AuthResolvers.getDocument,
      },
      movies: {
        type: new GraphQLList(MovieType),
        resolve: AuthResolvers.getMovies,
      },
    }
  });

const AuthSchema = new GraphQLSchema({
    query : AuthQuery
});

export default AuthSchema;