/**
 * Date created : 17/08/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL root schema description file
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString,  } from 'graphql';
import AuthResolvers from '../resolvers/AuthResolvers.ts';

// Defining the movie type so we have a reference point for the fields
const MovieType = new GraphQLObjectType({
    name : 'Movie',
    fields : () => ({
        name : { type : GraphQLString },
        description : { type : GraphQLString },
        year : { type : GraphQLString }
    })
});

const AuthSchema = new GraphQLSchema({
    query : new GraphQLObjectType({
        name : 'Auth',
        fields: () => ({
            hello: {
                type : GraphQLString,
                resolve: AuthResolvers.hello
            },
            getDocument: {
                type : GraphQLString,
                resolve: AuthResolvers.getDocument
            }
        }),
    })
});

export default AuthSchema;