/**
 * Date created : 17/08/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL root schema description file
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import rootResolvers from '../resolvers/rootResolvers';

const RootSchema = new GraphQLSchema({
    query : new GraphQLObjectType({
        name : 'Query',
        fields: () => ({
            hello: {
                type : GraphQLString,
                resolve: rootResolvers.hello
            },
            text: {
                args: {
                    content: { type: new GraphQLNonNull(GraphQLString) }
                },
                type : GraphQLString,
                resolve: rootResolvers.text,
            }
        }),
    })
});

export default RootSchema;