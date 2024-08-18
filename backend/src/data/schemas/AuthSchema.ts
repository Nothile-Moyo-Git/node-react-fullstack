/**
 * Date created : 17/08/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL root schema description file
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import AuthResolvers from '../resolvers/AuthResolvers';

const AuthSchema = new GraphQLSchema({
    query : new GraphQLObjectType({
        name : 'Auth',
        fields: () => ({
            hello: {
                type : GraphQLString,
                resolve: AuthResolvers.hello
            },
        }),
    })
});

export default AuthSchema;