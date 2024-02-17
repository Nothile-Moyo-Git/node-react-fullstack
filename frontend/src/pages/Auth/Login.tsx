/**
 * Date created : 11/02/2024
 * 
 * Author : Nothile Moyo
 */

import { FC, useState, useRef, FormEvent } from "react";

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
        <section>

            <form onSubmit={submitHandler}>

                <div>
                    <label>Email*</label>
                    <input
                        type="text"
                        ref={emailRef}
                    />
                </div>

                <div>
                    <label>Password*</label>
                    <input
                        type="password"
                        ref={passwordRef}
                    />
                </div>

                <button>Submit</button>
            </form>

        </section>
    );
};