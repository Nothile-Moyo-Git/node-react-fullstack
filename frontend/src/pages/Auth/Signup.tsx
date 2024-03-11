/**
 * Date created : 17/02/2024
 * 
 * Author : Nothile Moyo
 * 
 * Signup component, currently handles the signup page functionality
 */

import "./Signup.scss";

import { FC, useState, useRef, FormEvent } from "react";

import Button from "../../components/button/Button";
import Form from "../../components/form/Form";
import Field from "../../components/form/Field";
import Input from "../../components/form/Input";
import Label from "../../components/form/Label";
import Title from "../../components/form/Title";

export const SignupPage : FC = () => {

    // State values
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    // const [isNameValid, setIsNameValid] = useState<boolean>(true);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    // const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    // const [isConfirmPasswordValid, setIsconfirmPasswordValid] = useState<boolean>(true);
    const [isFormValid, setIsFormValid] = useState<boolean>(true);

    // Submit handler
    const submitHandler = async (event : FormEvent) => {

        // Don't reload the page
        event.preventDefault();

        // Create values, we will overwrite them if they're set
        let emailAddress = "";
        let name = "";
        let password = "";
        let confirmPassword = "";

        // check if we have inputs and validate the form
        if (emailRef.current) {  
            emailAddress = emailRef.current.value;
        }
        if (passwordRef.current) {  
            password = passwordRef.current.value;  
        }
        if (confirmPasswordRef.current) {  
            confirmPassword = confirmPasswordRef.current.value;  
        }
        if (nameRef.current) {
            name = nameRef.current.value;
        }

        // Perform the signup request to the backend
        try{

            // Set the form data
            const fields = new FormData();
            fields.append('confirmPassword', confirmPassword);
            fields.append('email', emailAddress);
            fields.append('password', password);
            fields.append('name', name);

            // Query the backend to see if we're authenticated
            const response = await fetch("http://localhost:4000/signup",{
                method : "POST",
                body : fields
            });
  
            // Get the JSON from the request
            const data = await response.json();

            console.clear();
            console.log("Request successful");
            console.log(response);

            console.log("\n\n");

            console.log("Data");
            console.log(data);

            console.log("\n\n");
            
            console.log("fields");
            console.log(fields);

        }catch(error){

            console.log("Request to /signup has failed");
            console.log(error);
        }
    };

    return (
        <section className="signup">

            <Form onSubmit={submitHandler}>

                <Title>{isFormValid ? 'Signup' : 'Error: Please check the fields'}</Title>

                <Field>
                    <Label
                        htmlFor="name"
                        id="nameLabel"
                    >Name*</Label>
                    <Input
                        ariaLabelledBy="nameLabel"
                        name="name"
                        placeholder="Please enter your name"
                        ref={nameRef}
                        type="text"
                        required={true}
                    />
                </Field>

                <Field>
                    <Label
                        htmlFor="emailAddress" 
                        id="emailLabel"
                    >Email*</Label>
                    <Input
                        ariaLabelledBy="emailLabel"
                        name="emailAddress"
                        placeholder="Please enter your email"
                        ref={emailRef}
                        type="email"
                        required={true}
                    />
                </Field>

                <Field>
                    <Label
                        htmlFor="firstPassword"
                        id="passwordLabel"
                    >Password*</Label>
                    <Input
                        ariaLabelledBy="firstPassword"
                        name="firstPassword"
                        placeholder="Please enter your password"
                        ref={passwordRef}
                        type="password"
                        required={true}
                    />
                </Field>

                <Field>
                    <Label
                        htmlFor="confirmPassword"
                        id="confirmPasswordLabel"
                    >Confirm Password*</Label>
                    <Input
                        ariaLabelledBy="confirmPassword"
                        name="confirmPassword"
                        placeholder="Please confirm your password"
                        ref={confirmPasswordRef}
                        type="password"
                        required={true}
                    />
                </Field>

                <Button>Submit</Button>

            </Form>

        </section>
    );
};