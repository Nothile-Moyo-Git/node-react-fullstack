/**
 * 
 * Date created : 01/08/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description: GraphQLInterface, will be used to create a way of handling graphql queries.
 * 
 */

import { FC } from "react";
import Button from "../../components/button/Button";

interface GraphQLInterfaceProps {

};

const GraphQLInterface : FC<GraphQLInterfaceProps> = () => {

        // Auth GraphQLObject
        const testAuthResolver = async (event : React.MouseEvent<HTMLElement>) => {

            const result = await fetch(`http://localhost:4000/graphql/auth`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body : JSON.stringify({ query : "{ hello }" })
            });

            const data = await result.json();

            console.clear();
            console.log("result");
            console.log(result);
            console.log("\n");
            
            console.log("data");
            console.log(data);
        };

        const testAuthDocumentResolver = async (event : React.MouseEvent<HTMLElement>) => {

            const result = await fetch(`http://localhost:4000/graphql/auth`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body : JSON.stringify({ 
                    query : `query ($name : String!) {
                        getDocument(name : $name) {
                            name
                            description
                            year
                        }
                    }`,
                    variables : {
                        name : "Inception"
                    }
                })
            });

            const data = await result.json();

            console.clear();

            console.log("result");
            console.log(result);
            console.log("\n");
            
            console.log("data");
            console.log(data);
        };

        // Add a movie to the backend
        const testAddMovieResolver = async () => {

            const name = "Pulp Fiction";
            const description = "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.";
            const year = 1994;

            const result = await fetch(`http://localhost:4000/graphql/auth`, {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body : JSON.stringify({ 
                    query : `
                        mutation insertMovie($name: String!, $description: String!, $year: String!){
                            insertMovie(name: $name, description: $description, year: $year){
                                result
                            }
                        }
                    `,
                    variables : {
                        name : name,
                        description: description,
                        year : String(year)
                    }
                })
            });

            const data = await result.json();

            console.clear();

            console.log("result");
            console.log(result);
            console.log("\n");
            
            console.log("data");
            console.log(data);

        };

        // Get all movies test query
        const testGetMoviesResolver = async () => {

            const result = await fetch(`http://localhost:4000/graphql/auth`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body : JSON.stringify({ query : "{ movies }" })
            });

            const data = await result.json();

            console.clear();
            console.log("result");
            console.log(result);
            console.log("\n");
            
            console.log("data");
            console.log(data);

        };

        // Delete movie query
        const testDeleteMovieResolver = async () => {

            // We use this ID to reference the entry the MongoDB API
            const _id = "66f5c12389872088450512e4";

            // Perform the delete request
            const result = await fetch(`http://localhost:4000/graphql/auth`, {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body : JSON.stringify({
                    query : `
                        mutation deleteMovie( $_id : ID! ){
                            deleteMovie( _id : $_id ){
                                result
                            }
                        }
                    `,
                    variables : { _id : _id }
                })
            });

            const data = await result.json();

            console.clear();
            console.log("result");
            console.log(result);
            console.log("\n");
            
            console.log("data");
            console.log(data);

        };

        // Update movie query
        const testUpdateMovieResolver = async () => {

            // We use this ID to reference the entry the MongoDB API
            const _id = "66f0690ab445f23578817e89";
            const name = "Pulp Fiction";
            const description = "Inception is a 2010 science fiction action film written and directed by Christopher Nolan, who also produced it with Emma Thomas, his wife.";
            const year = "1994";

            // Perform the delete request
            const result = await fetch(`http://localhost:4000/graphql/auth`, {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body : JSON.stringify({
                    query : `
                        mutation updateMovie( $_id : ID!, $name : String!, $description : String!, $year : String! ){
                            updateMovie( _id : $_id, name : $name, description : $description, year : $year ){
                                result
                            }
                        }
                    `,
                    variables : { 
                        _id : _id,
                        name : name,
                        description : description,
                        year : year
                    }
                })
            });

            const data = await result.json();

            console.clear();
            console.log("result");
            console.log(result);
            console.log("\n");
            
            console.log("data");
            console.log(data);
        };

        // Signup request
        const signupResolver = async () => {

            // Calling the signup resolver which will take a validated input and then send a request to the backend
            const name = "Avril";
            const email = "hiyac78440@sgatra.com";
            const password = "intj";
            const status = "active";

            // Perform the signup request
            const result = await fetch(`http://localhost:4000/graphql/auth`, {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    Accept: "application/json", 
                },
                body : JSON.stringify({
                    query :`
                        mutation signupUser($name : String!, $email : String!, $password : String!, $status : String!){
                            signupUser(name : $name, email : $email, password : $password, status : $status){
                                result
                            }
                        }
                    `,
                    variables : {
                        name : name,
                        email : email,
                        password : password,
                        status : status 
                    }
                })
            });

            const data = await result.json();

            console.clear();
            console.log("result");
            console.log(result);
            console.log("\n");
            
            console.log("data");
            console.log(data);

        };

    return (
        <div>
            <br/>

            <Button
                variant="primary"
                onClick={testAuthResolver}
            >Output "Hello World" from Auth</Button>

            <br/>

            <Button
                variant="primary"
                onClick={testAuthDocumentResolver}
            >Output "Create a test document"</Button>

            <br/>

            <Button
                variant="primary"
                onClick={testAddMovieResolver}
            >Output "Movie added"</Button>

            <br/>

            <Button
                variant="primary"
                onClick={testDeleteMovieResolver}
            >Delete movie "66f0690ab445f23578817e89"</Button>

            <br/>

            <Button
                variant="primary"
                onClick={testUpdateMovieResolver}
            >Update the Pulp Fiction movie</Button>

            <br/>

            <Button
                variant="primary"
                onClick={testGetMoviesResolver}
            >Output all movies from the backend</Button>

        </div>
    );
};

export default GraphQLInterface;