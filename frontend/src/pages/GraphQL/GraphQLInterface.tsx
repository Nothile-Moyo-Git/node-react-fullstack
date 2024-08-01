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
                body : JSON.stringify({ query : "{ hello }"})
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

            <button onClick={testGraphQLInterface }>Test GraphQL interface</button>
        </div>
    );
};

export default GraphQLInterface;