/**
 * Date created : 11/02/2024
 * 
 * Author : Nothile Moyo
 * 
 * Login component, this houses the login form which performs a login requests to the backend
 */

import "./Login.scss";

import { FC, useState, useRef, FormEvent } from "react";

import Form from "../../components/form/Form";
import Field from "../../components/form/Field";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Button from "../../components/button/Button";
import Title from "../../components/form/Title";

export const LoginPage : FC = () => {

    // Setting up the states
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

    // Set up refs so we can reference our inputs. We use refs instead of state for performance optimizations
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event : FormEvent) => {

        // Don't reload the page
        event.preventDefault();
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

                <Button>Submit</Button>

            </Form>

        </section>
    );
};