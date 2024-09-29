/**
 * Date created : 17/08/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL root schema description file
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import AuthResolvers from '../resolvers/AuthResolvers.ts';

// Defining the movie type so we have a reference point for the fields
const UserType = new GraphQLObjectType({
    name : 'users',
    fields : () => ({
        name : { type : GraphQLString },
        email : { type : GraphQLString },
        password : { type : GraphQLString },
        status : { type : GraphQLString },
        posts : { type : new GraphQLList(GraphQLString) }
    })
});

// Defining our auth queries
const AuthQuery = new GraphQLObjectType({
  name: 'AuthQuery',
  fields: {

  }
});

// Defining our mutations, these will be used to perform operations on the backend
const AuthMutation = new GraphQLObjectType({
  name : "AuthMutation",
  fields : {
    signup : {
      type : new GraphQLObjectType({
        name : "signup",
        fields : {
          name : { type : GraphQLString },
          email : { type : GraphQLString },
          password : { type : GraphQLString },
          status : { type : GraphQLString },
        }
      }),
      args : {
        name : { type : GraphQLString },
        email : { type : GraphQLString },
        password : { type : GraphQLString },
        status : { type : GraphQLString }
      },
      resolve : () => {
        return "Hello";
      }
    }
  }
});

const AuthSchema = new GraphQLSchema({
    query : AuthQuery,
    mutation : AuthMutation
});

export default AuthSchema;