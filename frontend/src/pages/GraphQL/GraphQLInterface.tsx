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


        // Testing the graphql interface
        const testGraphQLInterface = async () => {

            const result = await fetch(`http://localhost:4000/graphql`, {
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

        const textGraphQLInterface = async () => {

            const stringText = "Gauntlet Legends";
 
            const result = await fetch(`http://localhost:4000/graphql`, {
                method : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body : JSON.stringify({ 
                    query : `query ($content: String!){
                        text(content : $content)
                    }`,
                    variables: { content : stringText }
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

    return (
        <div>
            <br/>

            <Button 
                variant="primary" 
                onClick={testGraphQLInterface}
            >Output "Hello World"</Button>

            <br/>

            <Button 
                variant="secondary"
                onClick={textGraphQLInterface}
            >Output "Gauntlet Legends"</Button>

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
                onClick={testGetMoviesResolver}
            >Output all movies from the backend</Button>

        </div>
    );
};

export default GraphQLInterface;