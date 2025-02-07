/**
 * Date created : 17/08/2024
 *
 * Author : Nothile Moyo
 *
 * Description : GraphQL root schema description file
 *
 */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import AuthResolvers from "../resolvers/AuthResolvers";

// Defining the movie type so we have a reference point for the fields
const UserType = new GraphQLObjectType({
  name: "users",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
    status: { type: GraphQLString },
    posts: { type: new GraphQLList(GraphQLString) },
  }),
});

// Defining our auth queries
const AuthQuery = new GraphQLObjectType({
  name: "AuthQuery",
  fields: {
    PostUserStatusResponse: {
      type: new GraphQLObjectType({
        name: "getUserStatus",
        fields: {
          user: { type: UserType },
        },
      }),
      args: {
        _id: { type: GraphQLString },
      },
      resolve: AuthResolvers.GetUserStatusResolver,
    },
    PostUserDetailsResponse: {
      type: new GraphQLObjectType({
        name: "getUserDetails",
        fields: {
          user: { type: UserType },
          sessionExpires: { type: GraphQLString },
          sessionCreated: { type: GraphQLString },
          success: { type: GraphQLBoolean },
        },
      }),
      args: {
        _id: { type: GraphQLString },
        token: { type: GraphQLString },
      },
      resolve: AuthResolvers.PostGetUserDetailsController,
    },
  },
});

// Defining our mutations, these will be used to perform operations on the backend
const AuthMutation = new GraphQLObjectType({
  name: "AuthMutation",
  fields: {
    signupUserResponse: {
      type: new GraphQLObjectType({
        name: "signupUser",
        fields: {
          isNameValid: { type: GraphQLBoolean },
          isEmailValid: { type: GraphQLBoolean },
          isPasswordValid: { type: GraphQLBoolean },
          doPasswordsMatch: { type: GraphQLBoolean },
          userExists: { type: GraphQLBoolean },
          userCreated: { type: GraphQLBoolean },
        },
      }),
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        confirmPassword: { type: GraphQLString },
      },
      resolve: AuthResolvers.PostSignupResolver,
    },
    loginResponse: {
      type: new GraphQLObjectType({
        name: "login",
        fields: {
          userExists: { type: GraphQLBoolean },
          success: { type: GraphQLBoolean },
          emailValid: { type: GraphQLBoolean },
          emailErrorText: { type: GraphQLString },
          passwordValid: { type: GraphQLBoolean },
          passwordErrorText: { type: GraphQLString },
          token: { type: GraphQLString },
          userId: { type: GraphQLString },
        },
      }),
      args: {
        emailAddress: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: AuthResolvers.PostLoginResolver,
    },
    deleteSessionResponse: {
      type: new GraphQLObjectType({
        name: "deleteSession",
        fields: {
          success: { type: GraphQLBoolean },
          message: { type: GraphQLString },
        },
      }),
      args: {
        _id: { type: GraphQLString },
      },
      resolve: AuthResolvers.PostDeleteSessionController,
    },
    checkCreateSessionResponse: {
      type: new GraphQLObjectType({
        name: "checkCreateSession",
        fields: {
          success: { type: GraphQLBoolean },
          status: { type: GraphQLInt },
          message: { type: GraphQLString },
        },
      }),
      args: {
        userId: { type: GraphQLString },
        token: { type: GraphQLString },
      },
      resolve: AuthResolvers.PostCheckCreateSessionResolver,
    },
  },
});

const AuthSchema = new GraphQLSchema({
  query: AuthQuery,
  mutation: AuthMutation,
});

export default AuthSchema;
