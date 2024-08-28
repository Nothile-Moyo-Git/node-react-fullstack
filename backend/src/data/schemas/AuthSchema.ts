/**
 * Date created : 17/08/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL root schema description file
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import AuthResolvers from '../resolvers/AuthResolvers.ts';

const AuthSchema = new GraphQLSchema({
    query : new GraphQLObjectType({
        name : 'Auth',
        fields: () => ({
            hello: {
                type : GraphQLString,
                resolve: AuthResolvers.hello
            },
            testDocument: {
                type : GraphQLString,
                resolve: AuthResolvers.getDocument
            }
        }),
    })
});

export default AuthSchema;