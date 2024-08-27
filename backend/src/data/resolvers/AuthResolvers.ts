/**
 * 
 * Author : Nothile Moyo
 * 
 * Date Created : 18/08/2024
 * 
 * Description : Handle the GraphQL requests for the Auth middleware. This contains sessions and users
 * 
 */

import { MONGODB_URI } from '../connection.ts';
import { gql, GraphQLClient } from 'graphql-request';

// The Auth resolver
const AuthResolvers = {
    
    hello() {
        return "Hello world Auth!";
    },
    async getDocument() {

        // Connect to our MONGODB database and perform a get request using JSON
        const client = new GraphQLClient(MONGODB_URI,
            {
               method : 'GET',
                jsonSerializer : {
                    parse : JSON.parse,
                    stringify : JSON.stringify
                }
            }
        );

        // Write our query we're going to perform
        const query = gql`
        query getMovie($title: String!) {
          Movie(title: $title) {
            name,
            description,
            year
          }
        }`;

        return "Create a test document";
    }
}

export default AuthResolvers;