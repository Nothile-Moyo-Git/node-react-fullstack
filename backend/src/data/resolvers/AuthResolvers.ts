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
import { gql, GraphQLClient } from 'graphql-request';
import { MongoClient } from 'mongodb';
import { MovieDocumentResponse } from "../../@types/index.ts";

// Set up client and database
const client = new MongoClient(MONGODB_URI);
const database = client.db('backend');
const moviesCollection = database.collection('movies');

// Defining the graphql
const GET_DOCUMENT_QUERY = gql`
    query getDocument($name : String!) {
        getDocument(name : $name) {
            name
            description
            year   
        }
    }
`;

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
            projection: { _id: 0, name: 1, description: 1, year : 1 }
        }),
    });

    const result : MovieDocumentResponse = await response.json();

    return result.document;

};

// GraphQL version of the query for debugging
const getDocumentGraphQL = async (_ : any, { name } : { name : string }) => {

    const client = new GraphQLClient(`${API_ENDPOINT}/action/findOne`, {
        headers : {
         'Content-Type' : 'application/json',
         'api-key' : DATA_API_KEY
        } 
     });

     try {

        const variables = { name };
         
        const data = await client.request(GET_DOCUMENT_QUERY, variables);

        console.log("\n\n");
        console.log("Data:");
        console.log(data);
        console.log("\n\n");

        return data;

     } catch (error) {

         console.error("\n\n Error details:");
         console.error(error);
         console.error("\n\n");
     }

};

// The Auth resolver
const AuthResolvers = {
    
    hello : () => {
        return "Hello world Auth!";
    },
    getDocument : getDocumentGraphQL,
    getMovies : async () => {
        const movies = await moviesCollection.find({}).toArray();
        return movies;
    }
}

export default AuthResolvers;


