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
import { createReadableDate, validateEmailAddress, validateInputLength, validatePassword } from '../../util/utillity-methods.ts';


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

    try{

        // Get an array of the users
        const users = await usersCollection.find().toArray();

        // Get the arguments from the query
        const name = args.name;
        const email = args.email;
        const password = args.password;
        const confirmPassword = args.confirmPassword;

        // Check if the inputs are valid
        const isNameValid = validateInputLength(name, 6);
        const isEmailValid = validateEmailAddress(email);
        const isPasswordValid = validatePassword(password);
        const doPasswordsMatch = password === confirmPassword;

        if (isNameValid && isEmailValid && isPasswordValid && doPasswordsMatch) {

            // Query the backend
            const response = await fetch(`${API_ENDPOINT}/action/insertOne`, {
                method : "POST",
                headers : {
                    'Content-Type': 'application/json',
                    'api-key': DATA_API_KEY
                },
                body: JSON.stringify({
                    collection : "users",
                    database : "backend",
                    dataSource : "backend",
                    document : {
                        name : name,
                        email : email,
                        password : password,
                        posts : []
                    }
                })
            });

            // Get the result from the backend
            const result = await response.json();

            console.log("Result");
            console.log(result);

            return { 
                result : "Hello world!",
                users : users
            };

        }else{

            return {
                result : "Request wasn't valid for some reason",
                users : []
            }
        }

    }catch(error){

        console.log("\n\n");
        console.log("Error");
        console.log(error);
        console.log("\n\n");
    }
};

// The Auth resolver
const AuthResolvers = {
    GetMoviesResolver : GetMoviesResolver,
    SignupResolver : SignupResolver
}

export default AuthResolvers;


