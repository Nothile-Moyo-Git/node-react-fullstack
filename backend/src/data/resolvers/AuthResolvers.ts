/**
 * 
 * Author : Nothile Moyo
 * 
 * Date Created : 18/08/2024
 * 
 * Description : Handle the GraphQL requests for the Auth middleware. This contains sessions and users
 * 
 */

import { SESSION_URI } from '../connection.ts';
import { gql, GraphQLClient } from 'graphql-request';

// The Auth resolver
const AuthResolvers = {
    
    hello() {
        return "Hello world Auth!";
    },
    async getDocument() {

        
        // Connect to our MONGODB database and perform a get request using JSON
        const client = new GraphQLClient(SESSION_URI,
            {
                method : 'GET',
            }
        );

        // Write our query we're going to perform
        const query = gql`
        query getMovie($name: String) {
          Movie(name: $name) {
            name,
            description,
            year
          }
        }`;

        // Set the variables we're going to use to query the database
        const variables = {
            name : 'Inception',
        };

        try{

            const data = await client.request(query, variables);

            console.log("\n\n");
            console.log("data");
            console.log(data);
            console.log("\n\n");

        }catch(error){

            console.log("\n\n");
            console.log("error");
            console.log(error);
            console.log("\n\n");

        }

        return "Create a test document";
    }
}

export default AuthResolvers;