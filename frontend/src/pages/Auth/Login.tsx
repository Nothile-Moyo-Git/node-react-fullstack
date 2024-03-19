/**
 * Date created : 11/02/2024
 * 
 * Author : Nothile Moyo
 * 
 * Login component, this houses the login form which performs a login requests to the backend
 */

import "./Login.scss";

import { FC, useState, useRef, FormEvent, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Form from "../../components/form/Form";
import Field from "../../components/form/Field";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Button from "../../components/button/Button";
import Title from "../../components/form/Title";
import { redirect } from "react-router-dom";

export const LoginPage : FC = () => {

    // Setting up the states
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

    // Set up refs so we can reference our inputs. We use refs instead of state for performance optimizations
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    // Check if the user is authenticated, if they are, then redirect to the previous page
    const appContextInstance = useContext(AppContext);
    appContextInstance?.validateAuthentication();

    // Redirect if the user is logged in
    if (appContextInstance?.userAuthenticated === true) {

        redirect("back")
    }

    const submitHandler = async (event : FormEvent) => {

        // Don't reload the page
        event.preventDefault();

        // Get the values from the input
        let emailAddress = "";
        let password = "";

        if (emailRef.current) {
            emailAddress = emailRef.current.value;
        }

        if (passwordRef.current) {
            password = passwordRef.current.value;
        }

        // Perform the login request to the backend
        try {

            // Set the fields for the api request
            const fields = new FormData();
            fields.append('email', emailAddress);
            fields.append('password', password);

            // Get response from the backend
            const response = await fetch('http://localhost:4000/login', {
                method : "POST",
                body : fields
            });

            // Get the json response from the backend
            const data = await response.json();

            console.clear();
            console.log("Response");
            console.log(data.body);

            // Save our local storage results
            if (data.success === true) {

                const remainingTime = new Date();
                remainingTime.setDate(remainingTime.getDate() + 14);

                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('expiresIn', remainingTime.toISOString());
                
                // Redirect to the main page
                redirect("/");
            }

        }catch(error){

            console.log("There was an error loading this page");
            console.log(error);
        }
    };

    return(
        <section className="login">

            <Form onSubmit={submitHandler}>

                <Title>Login</Title>

                <Field>
                    <Label
                        htmlFor="email"
                        id="emailLabel"
                    >Email*</Label>
                    <Input
                        ariaLabelledBy="emailLabel"
                        name="email"
                        placeholder="Please enter your email address"
                        type="text"
                        ref={emailRef}
                    />
                </Field>

                <Field>
                    <Label
                        htmlFor="password"
                        id="passwordLabel"
                    >Password*</Label>
                    <Input
                        ariaLabelledBy="passwordLabel"
                        name="password"
                        placeholder="Please enter your password"
                        type="password"
                        ref={passwordRef}
                    />
                </Field>

                <Button variant="primary">Submit</Button>

            </Form>

        </section>
    );
};