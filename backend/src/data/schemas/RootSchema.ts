/**
 * Date created : 17/08/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL root schema description file
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import RootResolvers from '../resolvers/RootResolvers.ts';

const RootSchema = new GraphQLSchema({
    query : new GraphQLObjectType({
        name : 'Query',
        fields: () => ({
            hello: {
                type : GraphQLString,
                resolve: RootResolvers.hello
            },
            text: {
                args: {
                    content: { type: new GraphQLNonNull(GraphQLString) }
                },
                type : GraphQLString,
                resolve: RootResolvers.text,
            }
        }),
    })
});

export default RootSchema;