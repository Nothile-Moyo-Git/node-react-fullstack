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

    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isConfirmPasswordValid, setIsconfirmPasswordValid] = useState<boolean>(true);

    // Submit handler
    const submitHandler = async (event : FormEvent) => {

        // Don't reload the page
        event.preventDefault();

        // Create values, we will overwrite them if they're set
        let emailAddress = "";
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

        // Perform the signup request to the backend
        try{

            // Set the form data
            const fields = new FormData();
            fields.append('confirmPassword', confirmPassword);
            fields.append('email', emailAddress);
            fields.append('password', password);

            // Query the backend to see if we're authenticated
            const response = await fetch("http://localhost:4000/signup",{
                method : "POST",
                mode : "cors",
                headers : {
                    "Content-Type" : "multipart/form-data"
                },
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

        }catch(error){

            console.log("Request to /signup has failed");
            console.log(error);
        }
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
                        placeholder="Please enter your email"
                        ref={emailRef}
                        type="email"
                    />
                </div>

                <div>
                    <label 
                        htmlFor="firstPassword"
                        id="passwordLabel"
                    >Password*</label>
                    <input 
                        aria-labelledby="firstPassword"
                        name="firstPassword"
                        placeholder="Please enter your password"
                        ref={passwordRef}
                        type="password"
                    />
                </div>

                <div>
                    <label 
                        htmlFor="confirmPassword"
                        id="confirmPasswordLabel"
                    >Confirm Password*</label>
                    <input 
                        aria-labelledby="confirmPassword"
                        name="confirmPassword"
                        placeholder="Please confirm your password"
                        ref={confirmPasswordRef}
                        type="password"
                    />
                </div>

                <button>Submit</button>

            </form>

        </section>
    );
};