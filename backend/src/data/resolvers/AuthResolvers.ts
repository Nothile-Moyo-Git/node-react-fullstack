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

// Set up client and database
const client = new MongoClient(MONGODB_URI);
const database = client.db('backend');
const moviesCollection = database.collection('movies');

// The Auth resolver
const AuthResolvers = {
    
    hello : () => {
        return "Hello world Auth!";
    },
    getDocument : async () => {

        
        // Connect to our MONGODB database and perform a get request using JSON
        const client = new GraphQLClient(`${API_ENDPOINT}/action/findOne`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'api-key' : DATA_API_KEY,
            },
            errorPolicy : 'all',
            jsonSerializer : {
                parse : JSON.parse,
                stringify : JSON.stringify
            }
        });

        const query = gql`
        query GetMovies($name: String!) {
          getMovies(name: $name) {
            name
            description
            year
          }
        }
      `;

        // Set the variables we're going to use to query the database
        const variables = {
            name : 'Inception',
        };

        /*
        const updatedVariables = {
            collection: "movies",  // The collection name
            database: "backend",  // Your database name
            dataSource: "backend",  // Your data source/cluster name
            filter: {
                name : "Inception"
            },
            projection: { 
                _id: 0, 
                name: 1, 
                description: 1,
                year: 1 
            }
        } */

        try{

            const data = await client.request(query, variables);

            
            console.log("\n\n");
            console.log("data");
            console.log(data);
            console.log("\n\n");
            
        }catch(error){

            console.log("\n\nError Details:");
            console.log(error);
            console.log("\n");
        }

        return "Create a test document";
    },
    getMovies : async () => {
        const movies = await moviesCollection.find({}).toArray();
        return movies;
    }
}

export default AuthResolvers;


