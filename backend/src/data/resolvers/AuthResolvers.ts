/**
 * 
 * Author : Nothile Moyo
 * 
 * Date Created : 18/08/2024
 * 
 * Description : Handle the GraphQL requests for the Auth middleware. This contains sessions and users
 * 
 */

import { API_ENDPOINT, DATA_API_KEY } from '../connection.ts';
import { gql, GraphQLClient, request } from 'graphql-request';

// The Auth resolver
const AuthResolvers = {
    
    hello() {
        return "Hello world Auth!";
    },
    async getDocument() {

        
        // Connect to our MONGODB database and perform a get request using JSON
        const client = new GraphQLClient(`${API_ENDPOINT}/action/findOne`, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key' : DATA_API_KEY,
            },
            errorPolicy : 'all', 
            jsonSerializer : {
                parse : JSON.parse,
                stringify : JSON.stringify
            }
        });

        // Write our query we're going to perform
        const query = gql`
            query getMovie($name : String!) {
                movies(query : { name : $name }) {
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

        try{

            const data = await client.request(query, variables);

            console.log("\n\n");
            console.log("data");
            console.log(data);
            console.log("\n\n");

        }catch(error){

            console.log("\n\nError Details:");
            console.log(error);
        }

        return "Create a test document";
    }
}

export default AuthResolvers;