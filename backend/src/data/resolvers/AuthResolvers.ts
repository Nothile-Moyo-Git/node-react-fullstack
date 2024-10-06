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
const usersCollection = database.collection('users');

// Handle a get movies mutation from the frontend to the MongoDB database via GraphQL and Mongoose
const GetMoviesResolver = async (parent : any, args : any) => {

    console.log("\n\n");
    console.log("Users");
    console.log(usersCollection);
    console.log("\n\n");

    return { result : "Hello world!" };
};

// Handle signup mutation from the frontend to the MongoDB database via GraphQL and Mongoose
const SignupResolver = async (parent : any, args : any) => {



    // Get an array of the users
    const users = await usersCollection.find().toArray();

    console.log("\n\n");
    console.log("Users");
    console.log(users);
    console.log("\n\n"); 

    console.log("Args");
    console.log(args);

    const name = args.name;
    const email = args.email;
    const password = args.password;
    const confirmPassword = args.confirmPassword;

    return { 
        result : "Hello world!",
        users : users
    };
};

// The Auth resolver
const AuthResolvers = {
    GetMoviesResolver : GetMoviesResolver,
    SignupResolver : SignupResolver
}

export default AuthResolvers;


