/**
 * Date created : 14/03/2024
 * Author : Nothile Moyo
 * 
 * appContext file, this file loads will handle the global state management of the app.
 * This context is mostly for providing tokens and other security details to different components within the app
 * 
 * This context will also be used to help determine which routes should be rendered on the front end
 * This context will also help to determine 
 * 
 * @returns AppContext : ReactContext
 */

import React, { useState, ReactNode } from "react";

// Typing for everything related to state management
interface ContextProps {
    token ?: string,
    expiresIn ?: string
};

interface ComponentProps {
    children ?: ReactNode,
    value ?: any
}

export const AppContext = React.createContext<ContextProps | null>(null);

export const AppContextProvider = ({ children, value } : ComponentProps) => {

    // Set our token and expiration states
    const [token, setToken] = useState<string>("");

    // Check whether the user is successfully logged in or not
    const checkLoggedInState = () => {

    };

    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    );
};