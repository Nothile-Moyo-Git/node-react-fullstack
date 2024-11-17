/**
 * 
 * Date created : 01/08/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description: GraphQLInterface, will be used to create a way of handling graphql queries for testing
 * 
 */

import { FC, FormEvent, useRef, useState } from "react";
import Button from "../../components/button/Button";
import Form from "../../components/form/Form";
import Field from "../../components/form/Field";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import { generateBase64FromImage } from "../../util/file";
import ImagePreview from "../../components/form/ImagePreview";

interface GraphQLInterfaceProps {

};

const GraphQLInterface : FC<GraphQLInterfaceProps> = () => {

    // Dummy refs and states
    const [uploadFile, setUploadFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState<unknown | null>();
    const [showImagePreview, setShowImagePreview] = useState<boolean>(false);

    const imageUrlRef = useRef<HTMLInputElement>(null);


    // File upload request, this one doesn't use GraphQL but will be used alongside a GraphQL request
    const dummyFileUploadHandler = async (event : React.ChangeEvent<HTMLInputElement>) => {


        // Set the file so that it's ready for upload
        if (event.target.files) {
            const file = event.target.files[0];

            // Raise and error and empty the input, otherwise, set the state to sent to the backend
            // Note: This is for UX purposes, file uploads are also verified in the backend
            if (file.size > 5000000) {
                alert("Please upload a file smaller than 5MB");
                event.target.value = "";
            }else{
                setUploadFile(file);
                const base64Image = await generateBase64FromImage(file);
                setImagePreview(base64Image);
                setShowImagePreview(true);
            }
        }
    };
    
    const createDummyPostRsolver = async (event : FormEvent) => {

        // Prevent the page from reloading
        event.preventDefault();

        

    };

    // Signup request
    const signupResolver = async () => {

        // Calling the signup resolver which will take a validated input and then send a request to the backend
        const name = "Morrigan";
        const email = "hiyac78440@sgatra.com";
        const password = "3rdFisherman";
        const confirmPassword = "3rdFisherman";

        // Perform the signup request
        const result = await fetch(`http://localhost:4000/graphql/auth`, {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                Accept: "application/json", 
            },
            body : JSON.stringify({
                query :`
                    mutation signupUserResponse($name : String!, $email : String!, $password : String!, $confirmPassword : String!){
                        signupUserResponse(name : $name, email : $email, password : $password, confirmPassword : $confirmPassword){
                            isNameValid,
                            isEmailValid,
                            isPasswordValid,
                            doPasswordsMatch, 
                            userExists,
                            userCreated
                        }
                    }
                `,
                variables : {
                    name : name,
                    email : email,
                    password : password,
                    confirmPassword : confirmPassword
                }
            })
        });

        console.clear();
        console.log("result");
        console.log(result);
        console.log("\n");

        const data = await result.json();
        
        console.log("data");
        console.log(data);

    };

    // Get user status request
    const getUserStatusResolver = async () => {

        // Calling the signup resolver which will take a validated input and then send a request to the backend
        const _id = "6656382efb54b1949e66bae2";

        // Perform the signup request
        const result = await fetch(`http://localhost:4000/graphql/auth`, {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                Accept: "application/json", 
            },
            body : JSON.stringify({
                query :`
                    query userStatusResponse($_id : String!){
                        userStatusResponse(_id : $_id){
                            user {
                                _id
                                name
                                status
                            },
                        }
                    }
                `,
                variables : {
                    _id : _id
                }
            })
        });

        console.clear();
        console.log("result");
        console.log(result);
        console.log("\n");

        const data = await result.json();
        
        console.log("data");
        console.log(data);
    };

    return (
        <div>
            <br/>

            <h1>This is a testing page for endpoints, nothing fancy here</h1>

            <Button
                variant="primary"
                onClick={signupResolver}
            >Create new user</Button>

            <br/>

            <Button
                variant="primary"
                onClick={getUserStatusResolver}
            >Get user status</Button>

            <br/>

            <Form onSubmit={createDummyPostRsolver}>

                <Field>
                    <Label
                        htmlFor="imageUrl"
                        id="imageUrlLabel"
                        error={false}
                        errorText="Error: Please upload a PNG, JPEG or JPG (max size: 5Mb)"
                    >Image*</Label>
                    <Input
                        ariaLabelledBy="imageUrlLabel"
                        error={false}
                        name="image"
                        onChange={dummyFileUploadHandler}
                        ref={imageUrlRef}
                        required={true}
                        type="file"
                    />
                </Field>

                {   
                    showImagePreview &&
                    <Field>
                        <ImagePreview
                            encodedImage={imagePreview}
                            imageSize="contain"
                            imagePosition="left"
                        />
                    </Field>
                }

                <Button variant="primary">Submit</Button>

            </Form>

        </div>
    );
};

export default GraphQLInterface;