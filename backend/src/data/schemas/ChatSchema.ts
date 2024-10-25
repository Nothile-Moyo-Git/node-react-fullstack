/**
 * Date created : 24/10/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL chat schema description file
 * 
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';
import chatResolvers from '../resolvers/ChatResolvers.ts';

const ChatQuery = new GraphQLObjectType({
    name : 'ChatQuery',
    fields : {
        chatMessagesResponse : {
            type : new GraphQLObjectType({
                name : "getChatMessages",
                fields : {
                    success : { type : GraphQLBoolean },
                    messages : { type : new GraphQLList(GraphQLString) },
                    error : { type : GraphQLBoolean }
                }
            }),
            args : {
                _id : { type : GraphQLString },
                recipientId : { type : GraphQLString }
            },
            resolve : chatResolvers.GetChatsResolver
        }
    }
});

const ChatSchema = new GraphQLSchema({
    query : ChatQuery
});

export default ChatSchema;