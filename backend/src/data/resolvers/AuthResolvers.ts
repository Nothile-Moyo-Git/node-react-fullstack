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
import { MongoClient } from 'mongodb';
import { MovieDocumentResponse } from "../../@types/index.ts";

// Set up client and database
const client = new MongoClient(MONGODB_URI);
const database = client.db('backend');
const moviesCollection = database.collection('movies');

// Regular getDocument Query in order to find inception
const getDocument = async () => {

    const response = await fetch(`${API_ENDPOINT}/action/findOne`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': DATA_API_KEY,
        },
        body: JSON.stringify({
            collection: "movies",  // The collection name
            database: "backend",  // Your database name
            dataSource: "backend",  // Your data source/cluster name
            filter : { name: "Inception" },
            projection: { 
                _id : 0, 
                name : 1, 
                description : 1, 
                year : 1 
            }
        }),
    });

    const result : MovieDocumentResponse = await response.json();

    return result.document;

};

// Add a movie to the MongoDB database from a GraphQL theory performed by the frontend
const insertMovie = async (parent, args) => {

    try {

        // Perform an insert one query to the MongoDB API set up in MongoDB Atlas.
        const response = await fetch(`${API_ENDPOINT}/action/insertOne`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'api-key': DATA_API_KEY
            },
            body: JSON.stringify({
                collection : "movies",
                database : "backend",
                dataSource: "backend",
                document : {
                    name : args.name,
                    description : args.description, 
                    year : String(args.year)
                }
            }),
        });

        // If our request was successful
        if (response.status === 201) {

            // If the request is successful then return a response
            const result = await response.json();

            // Send a message to the server to notify the server that the request was successful
            const responseMessage = `Request successful, object ${result.insertedId} inserted`;

            // Output response
            console.log("\n\n");
            console.log(responseMessage);
            console.log("\n\n");

            return { result : responseMessage };

        }else{

            // Send a message to the server to notify the server that the request was successful
            const responseMessage = `No object inserted`;

            // Output response
            console.log("\n\n");
            console.log(responseMessage);
            console.log("\n\n");

            return { result : responseMessage };
        }

    }catch(error){

        // Output our errors to both the server and the front end
        console.log("\n\n");
        console.log("Auth insert movie query failed, error below");
        console.log(error);
        console.log("\n\n");

        return { result : `Error : Query failed, please look at your server logs` }
    }

};

// Perform a delete request against the MongoDB backend from a GraphQL query
// This is the resolve which handles that request as part of the GraphQL API
const deleteMovie = async (parent : any, args : any) => {

    const id = "123456789";

    try {

        // Perform an insert one query to the MongoDB API set up in MongoDB Atlas.
        const response = await fetch(`${API_ENDPOINT}/action/deleteOne`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'api-key': DATA_API_KEY
            },
            body: JSON.stringify({
                collection : "movies",
                database : "backend",
                dataSource: "backend",
                filter : {  _id : id }
            }),
        });

    }catch(error){

        
    }

};

// The Auth resolver
const AuthResolvers = {
    
    hello : () => {
        return "Hello world Auth!";
    },
    getDocument : getDocument,
    insertMovie : insertMovie,
    getMovies : async () => {
        const movies = await moviesCollection.find({}).toArray();
        return movies;
    }
}

export default AuthResolvers;


