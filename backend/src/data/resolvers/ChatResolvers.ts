/**
 * 
 * Author : Nothile Moyo
 * 
 * Date Created : 24/10/2024
 * 
 * Description : Handle the GraphQL requests for the chat middleware. This contains sessions and users
 * 
 */

import { API_ENDPOINT, DATA_API_KEY, MONGODB_URI } from '../connection.ts';
import { MongoClient, ObjectId } from 'mongodb';

// Set up client and database connection
const client = new MongoClient(MONGODB_URI);
const database = client.db('backend');
const chatCollection = database.collection('chats');

const GetChatsResolver = async (parent : any, args : any) => {

    try{

        // Get the chats if they exist
        const numberOfChats = await chatCollection.countDocuments();

        // If a chat already exists
        if (numberOfChats === 0) {

            return { success : true, messages : [], error : null };

        }else{

            const messages = chatCollection.find();

            console.log("\n");
            console.log("messages");
            console.log(messages);
            console.log("\n");

            return { success : true, messages : [], error : null }
        }

    }catch(error){

        console.log("\n\n");
        console.log("Request error:", "\n");
        console.error(error);
        console.log("\n\n");

        return { success : false, messages : [], error : error }
    }
};

const chatResolvers = {
    GetChatsResolver : GetChatsResolver
};

export default chatResolvers;