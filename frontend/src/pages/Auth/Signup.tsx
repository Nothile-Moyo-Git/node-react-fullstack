/**
 * Date created : 17/02/2024
 * 
 * Author : Nothile Moyo
 */

import { FC, useState, useRef, FormEvent } from "react";

export const SignupPage : FC = () => {

    // State values
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    // Submit handler
    const submitHandler = (event : FormEvent) => {

        // Don't reload the page
        event.preventDefault();

        console.clear();
        console.log("Email ref");
        console.log(emailRef);
    };

    return (
        <section>

            <form onSubmit={submitHandler}>

                <div>
                    <label 
                        htmlFor="emailAddress" 
                        id="emailLabel"
                    >Email*</label>
                    <input 
                        aria-labelledby="emailLabel"
                        name="emailAddress"
                        placeholder="Please enter your password"
                        type="email"
                        ref={emailRef}
                    />
                </div>

                <div>
                    <label htmlFor="firstPassword"></label>
                    <input 
                        type="password"
                        name="firstPassword"
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword"></label>
                    <input 
                        type="password"
                        name="confirmPassword"
                    />
                </div>

            </form>

        </section>
    );
};