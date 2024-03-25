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

    const [isNameValid, setIsNameValid] = useState<boolean>(true);
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [emailErrortext, setEmailErrorText] = useState<string>("");
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isConfirmPasswordValid, setIsconfirmPasswordValid] = useState<boolean>(true);
    const [doesUserExist, setDoesUserExist] = useState<boolean>(true);
    const [validateField, setValidateField] = useState<boolean>(false);

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
            
            // Set our states and trigger a re-render so we can render errors if we have them
            setIsNameValid(data.isNameValid);
            setIsEmailValid(data.isEmailValid);
            setIsPasswordValid(data.isPasswordValid);
            setIsconfirmPasswordValid(data.doPasswordsMatch);
            setDoesUserExist(data.userExists);
            setValidateField(true);

            // Handle errors for the email address
            if (data.userExists === true) {
                setEmailErrorText("Error: User already exists with this email");
            }
            
            if (data.isEmailValid === false) {
                setEmailErrorText("Error: Email address isn't valid");
            }
            
            if (data.userExists === false && data.isEmailValid === true) {
                setEmailErrorText("");
                setValidateField(false);
            }

            

        }catch(error){

            console.log("Request to /signup has failed");
            console.log(error);
        }
    };

    return (
        <section className="signup">

            <Form onSubmit={submitHandler}>

                <Title>Signup</Title>

                <Field>
                    <Label
                        htmlFor="name"
                        id="nameLabel"
                        error={!isNameValid}
                        errorText="Error: Name must be at least 6 characters"
                    >Name*</Label>
                    <Input
                        ariaLabelledBy="nameLabel"
                        error={!isNameValid}
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
                        error={ validateField && ((!isEmailValid || !doesUserExist) || (isEmailValid && doesUserExist)) }
                        errorText={emailErrortext}
                    >Email*</Label>
                    <Input
                        ariaLabelledBy="emailLabel"
                        error={ validateField && ((!isEmailValid || !doesUserExist) || (isEmailValid && doesUserExist)) }
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
                        error={!isPasswordValid}
                        errorText="Error: Password must be between 6 and 20 characters and contain numeric digits"
                    >Password*</Label>
                    <Input
                        ariaLabelledBy="firstPassword"
                        error={!isPasswordValid}
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
                        error={!isConfirmPasswordValid}
                        errorText="Error: Passwords don't match"
                    >Confirm Password*</Label>
                    <Input
                        ariaLabelledBy="confirmPassword"
                        error={!isConfirmPasswordValid}
                        name="confirmPassword"
                        placeholder="Please confirm your password"
                        ref={confirmPasswordRef}
                        type="password"
                        required={true}
                    />
                </Field>

                <Button variant="primary">Submit</Button>

            </Form>

        </section>
    );
};