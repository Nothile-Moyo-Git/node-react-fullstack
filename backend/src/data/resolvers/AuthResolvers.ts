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
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Session from "../../models/session.ts";

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

/**
 * @name PostSignupResolver
 * 
 * @description A resolver (method which handles graphql queries). It takes the information from the signup form
 * and then proceeds to validate the inputs. If they're valid, a user is created, and if not, an error is returned
 * 
 * @param parent : any (this property is ignored)
 * 
 * @param args : SignupResponse
 */
const PostSignupResolver = async (parent : any, args : any) => {

    try{

        // Get the arguments from the query
        const name = args.name;
        const email = args.email;
        const password = args.password;
        const confirmPassword = args.confirmPassword;

        // Get an array of the users
        const users = await usersCollection.find({ email : email }).toArray();

        // Check if the inputs are valid
        const isNameValid = validateInputLength(name, 4);
        const isEmailValid = validateEmailAddress(email);
        const isPasswordValid = validatePassword(password);
        const doPasswordsMatch = password === confirmPassword;

        // Check if the user already exists in the database
        const userExists = users.length > 0;

        if (isNameValid && isEmailValid && isPasswordValid && doPasswordsMatch) {

            // Query the backend
            await fetch(`${API_ENDPOINT}/action/insertOne`, {
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

            return {
                isNameValid,
                isEmailValid, 
                isPasswordValid, 
                doPasswordsMatch, 
                userExists,
                userCreated : true, 
            };

        }else{

            return {
                isNameValid,
                isEmailValid, 
                isPasswordValid, 
                doPasswordsMatch, 
                userExists,
                userCreated : false, 
            }
        }

    }catch(error){

        console.log("\n\n");
        console.log("PostSignupResolver Error:");
        console.log(error);
        console.log("\n\n");
    }
};

/**  
 * @name PostLoginResolver
 * 
 * @description My login resolver, this handles login attempts and returns the appropriate response
 * 
 * @param parent : any (this property is ignored)
 * 
 * @param args : SignupResponse
 */
const PostLoginResolver = async (parent : any, args : any) => {

    try {

        // Get the properties from the request from the front end
        const email = args.email.toLowerCase();
        const password = args.password;

        // Check if the user exists
        const user = await usersCollection.findOne({ email : email });

        if (user === null) {
            return {
                userExists : false,
                success : false,
                emailValid : false,
                passwordValid : true,
                emailErrorText : "Error: A user with this email address could not be found",
                passwordErrorText : "",
                token : null,
                userId : null
            }
        }else{

            // Compare the passwords
            const passwordsMatch = await bcrypt.compare(password, user.password);

            // If the passwords don't match
            if (passwordsMatch === false) {
                return {
                    userExists : true,
                    success : false,
                    emailValid : true,
                    emailErrorText : "",
                    passwordValid : false,
                    passwordErrorText : "Error: The password is invalid",
                    token : null,
                    userId : null
                }
            }else{

                // Create our web token and send it to the front end
                const token = jwt.sign(
                    {
                        email : user.email,
                        name : user.name,
                        userId : user._id.toString()
                    },
                    "Adeptus",
                    { expiresIn: "14d" }
                );

                // Values to be set once
                let jwtExpiryDate = "";
             
                // Decode the token for the expiry date
                // Verify the tokens
                jwt.verify(token, "Adeptus", (error, decoded) => {

                    if (decoded) {
                        // Get the issued and expiry dates of our token
                        // We multiply it by 1000 so that we convert this value into milliseconds which JavaScript uses
                        const expiryDate = new Date(decoded['exp'] * 1000);

                        // Set the values
                        jwtExpiryDate = createReadableDate(expiryDate);
                    }

                });

                // Check if we already have a session, if we do, then update it
                let previousSession = await Session.findOne({
                    creator : new ObjectId(user._id)
                });

                
            }

        }

    } catch (error) {

        console.log("\n\n");
        console.log("LoginResolver Error:");
        console.log(error);
        console.log("\n\n"); 
    }
};

/**
 * @name GetUserStatusResolver
 * 
 * @description : Get user resolver, this retrieves the user status based on the _id provided. This should be passed through the args in the api request
 *  
 * @param parent : any 
 * @param args : any
 */
const GetUserStatusResolver = async (parent : any, args : any) => {

    try {

        // Get the user id from the front end and api request
        const userId = new ObjectId(args._id);

        // If there's a user, return the user status
        if (userId !== undefined) {

            // Query the users collection and get the name, id and status from it
            const user = await usersCollection.findOne(
                { _id : userId },
                { projection : { name : 1, status : 1 } }
            );

            console.log("\n");
            console.log("User status");
            console.log(user);
            console.log("\n");

            // Return the user details to the front end
            return { user };

        }else{

            console.log("\n");
            console.log("User status not retrieved");
            console.log("\n");

            // Return nothing if there's no user
            return null;

        }

    }catch(error){

        console.log("\n\n");
        console.log("GetUserStatusResolver Error:");
        console.log(error);
        console.log("\n\n"); 
    }
};

// The Auth resolver
const AuthResolvers = {
    GetMoviesResolver : GetMoviesResolver,
    PostSignupResolver : PostSignupResolver,
    GetUserStatusResolver : GetUserStatusResolver
}

export default AuthResolvers;


