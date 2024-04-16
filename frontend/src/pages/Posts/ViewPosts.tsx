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
import { ReactNode, FC, useState, useEffect } from "react";

interface ComponentProps {
    children ?: ReactNode
}

export const ViewPosts : FC<ComponentProps> = () => {

    const [Posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        
        console.clear();
        console.log("Posts query");
        setPosts([]);

    },[]);

    return(
        <section className="viewPosts">
            <h1>Posts</h1>
        </section>
    );
};