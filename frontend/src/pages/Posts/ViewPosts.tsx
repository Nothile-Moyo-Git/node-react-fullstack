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

import { ReactNode, FC } from "react";

interface ComponentProps {
    children ?: ReactNode
}

export const ViewPosts : FC<ComponentProps> = () => {

    return(
        <>
            <h1>Posts</h1>
        </>
    );
};