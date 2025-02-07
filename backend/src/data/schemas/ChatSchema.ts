/**
 * Date created : 24/10/2024
 *
 * Author : Nothile Moyo
 *
 * Description : GraphQL chat schema description file
 *
 */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import chatResolvers from "../resolvers/ChatResolvers";

// Defining a type for our chat messages
const MessageType = new GraphQLObjectType({
  name: "messages",
  fields: () => ({
    message: { type: GraphQLString },
    dateSent: { type: GraphQLString },
    senderId: { type: GraphQLString },
    sender: { type: GraphQLString },
    _id: { type: GraphQLString },
  }),
});

// Set the chat type which gets the entire messages assuming the users match
const ChatType = new GraphQLObjectType({
  name: "chats",
  fields: () => ({
    userIds: { type: new GraphQLList(GraphQLString) },
    messages: { type: new GraphQLList(MessageType) },
  }),
});

const ChatQuery = new GraphQLObjectType({
  name: "ChatQuery",
  fields: {
    chatMessagesResponse: {
      type: new GraphQLObjectType({
        name: "getChatMessages",
        fields: {
          success: { type: GraphQLBoolean },
          messages: { type: ChatType },
          error: { type: GraphQLBoolean },
        },
      }),
      args: {
        _id: { type: GraphQLString },
        recipientId: { type: GraphQLString },
      },
      resolve: chatResolvers.GetChatsResolver,
    },
  },
});

const ChatSchema = new GraphQLSchema({
  query: ChatQuery,
});

export default ChatSchema;
