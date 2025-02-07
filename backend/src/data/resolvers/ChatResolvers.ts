/**
 *
 * Author : Nothile Moyo
 *
 * Date Created : 24/10/2024
 *
 * Description : Handle the GraphQL requests for the chat middleware. This contains sessions and users
 *
 */

import { MONGODB_URI } from "../connection";
import { MongoClient, ObjectId } from "mongodb";
import { GetChatsResolverArgs, ParentParam } from "./resolvers";

// Set up client and database connection
const client = new MongoClient(MONGODB_URI);
const database = client.db("backend");
const chatCollection = database.collection("chats");

/**
 * @name GetChatsResolver
 *
 * @description Endpoint to handle the chat resolver which allows us to extract
 *
 * @param parent : any
 * @param args : GetChatsResolverArgs
 */
const GetChatsResolver = async (
  parent: ParentParam,
  args: GetChatsResolverArgs,
) => {
  try {
    // Get the id of the user and recipient to make sure they match the chat we're quering
    const userId = args._id;

    // Get the chats if they exist
    const numberOfChats = await chatCollection.countDocuments();

    // If a chat already exists
    if (numberOfChats === 0) {
      return { success: true, messages: [], error: null };
    } else {
      // We check the userIds array in the chatCollection to see if we can find the userId
      const messages = await chatCollection.findOne({
        userIds: { $in: [new ObjectId(userId)] },
      });

      return { success: true, messages: messages, error: null };
    }
  } catch (error) {
    console.log("\n\n");
    console.log("Request error:", "\n");
    console.error(error);
    console.log("\n");

    return { success: false, messages: [], error: error };
  }
};

const chatResolvers = {
  GetChatsResolver: GetChatsResolver,
};

export default chatResolvers;
