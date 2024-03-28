/**
 * 
 * Date created: 28/03/2024
 * 
 * Author: Nothile Moyo
 * 
 * Create post component, this component will house the form that will be used in order to create a new post
 * Only logged in users will be able to create posts in the backend
 */

import { FC, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";


export const CreatePostComponent : FC = () => {

    // Check if the user is authenticated, if they are, then redirect to the previous page
    const appContextInstance = useContext(AppContext);

    // Instantiate the navigation object
    const navigate = useNavigate();

    // States and refs for our objects
    const titleRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLInputElement>(null);
  
    // Check authentication when component mounts
    useEffect(() => {

        appContextInstance?.validateAuthentication();

        console.clear();
        console.log("App context instance");
        console.log(appContextInstance?.userAuthenticated);

        // If the user is authenticated, redirect this route to the previous page
        !appContextInstance?.userAuthenticated && navigate(-1);

    },[appContextInstance, navigate]); 

    return (
        <>
            <h1>Create Post</h1>
        </>
    );
};

