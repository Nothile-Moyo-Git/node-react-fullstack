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

    return (
        <div>
            <Button 
                variant="primary" 
                onClick={testGraphQLInterface}
            >Output "Hello World"</Button>
            <Button 
                variant="secondary"
                onClick={textGraphQLInterface}
            >Output "Gauntlet Legends"</Button>
        </div>
    );
};

export default GraphQLInterface;