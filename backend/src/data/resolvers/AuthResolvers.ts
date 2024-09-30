/**
 * 
 * Author : Nothile Moyo
 * 
 * Date Created : 18/08/2024
 * 
 * Description : Handle the GraphQL requests for the Auth middleware. This contains sessions and users
 * 
 */

import { API_ENDPOINT, DATA_API_KEY, MONGODB_URI } from '../connection.ts';
import { MongoClient, ObjectId } from 'mongodb';
import { MovieDocumentResponse } from "../../@types/index.ts";

// Set up client and database
const client = new MongoClient(MONGODB_URI);
const database = client.db('backend');
const moviesCollection = database.collection('users');

// Handle signup mutation from the frontend to the MongoDB database via GraphQL and Mongoose
const SignupResolver = async (parent : any, args : any) => {

    return "Hello world";
};

// The Auth resolver
const AuthResolvers = {
    SignupResolver : SignupResolver
}

export default AuthResolvers;


