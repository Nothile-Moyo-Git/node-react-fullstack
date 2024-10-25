/**
 * Date created : 24/10/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL chat schema description file
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';
import chatResolvers from '../resolvers/ChatResolvers';

const ChatQuery = new GraphQLObjectType({
    name : 'ChatQuery',
    fields : {
        chatMessagesResponse : {
            type : new GraphQLObjectType({
                name : "getChatMessages",
                fields : {
                    succcess : { type : GraphQLBoolean }
                }
            }),
            resolve : chatResolvers.GetChatsResolver
        }
    }
})