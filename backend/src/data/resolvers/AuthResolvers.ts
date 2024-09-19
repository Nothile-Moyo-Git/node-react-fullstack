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

// Add a movie to the backend
const insertMovie = async () => {

    const name = "Pulp Fiction";
    const description = "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.";
    const year = 1994;

    console.log("\n\n");
    console.log("Insert movie");
    console.log("\n\n");

    // Perform a query to add an entry to our database as a document
    const response = await fetch(`${API_ENDPOINT}/action/insertOne`, {
        method : 'POST',
        headers : {
            'Content-Type': 'applcation/json',
            'api-key': DATA_API_KEY
        },
        body: JSON.stringify({
            collection : "movies",
            database : "backend",
            dataSource: "backend",
            document : {
                name : name,
                description : description, 
                year : String(year)
            }
        }),
    });

    const result = await response.json();

    console.log("\n\n");
    console.log("Result");
    console.log(result);
    console.log("\n\n")

    return result;

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


