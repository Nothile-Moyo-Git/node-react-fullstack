/**
 * Date created : 14/04/2024
 * 
 * Author : Nothile Moyo
 * 
 * @name ViewPosts Component
 * @description This component file renders a list of view posts. It applies pagination to this as it does so.
 * 
 * ?@param /:page - Defines the page we're currently on
 */


import "./ViewPosts.scss";
import { Post } from "../../@types/indes";
import { AppContext } from "../../context/AppContext";
import { ReactNode, FC, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASENAME } from "../../util/util";

interface ComponentProps {
    children ?: ReactNode
}

export const ViewPosts : FC<ComponentProps> = () => {

    // Instantiate values
    const appContextInstance = useContext(AppContext);
    const navigate = useNavigate();

    const [Posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Get posts method, we define it here so we can call it asynchronously
    const getPosts = async () => {
        const response = await fetch('http://localhost:4000/posts');
    };

    useEffect(() => {
        
        appContextInstance?.validateAuthentication();
        console.log("App Context Instance");
        
        if (appContextInstance?.token !== '') {
            
            
        }

        // If the user isn't authenticated, redirect this route to the previous page
        !appContextInstance?.userAuthenticated && navigate(`/${BASENAME}/login`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[appContextInstance]);

    return(
        <section className="viewPosts">
            <h1>Posts</h1>
        </section>
    );
};