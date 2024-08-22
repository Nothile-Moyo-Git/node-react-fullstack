/**
 * 
 * Author : Nothile Moyo
 * 
 * Date Created : 18/08/2024
 * 
 * Description : Handle the GraphQL requests for the Auth middleware. This contains sessions and users
 * 
 */

import { MONGODB_URI } from '../connection';
import { GraphQLClient } from 'graphql-request';

// The Auth resolver
const AuthResolvers = {
    
    hello() {
        return "Hello world Auth!";
    },
    testDocument() {

        // const client = new GraphQLClient(MONGODB_URI);

        return "Create a test document";
    }
}

export default AuthResolvers;