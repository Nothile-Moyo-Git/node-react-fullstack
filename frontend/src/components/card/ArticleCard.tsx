/**
 * Date Created : 20/04/2024
 * 
 * Author : Nothile Moyo
 * 
 * ArticleCard component
 * Wraps an article in a card component in order to be rendered in a list
 */

import { Post } from '../../@types';
import { FC, ReactNode } from 'react';

interface ComponentProps {
   children ?: ReactNode,
   post ?: Post
}

export const ArticleCard : FC<ComponentProps> = ({ post }) => {

    let image = "";

    try{

        // Fetch the image, if it fails, reload the component
        image = require(`../../uploads/2024/04/${post?.fileName}`);

    }catch(error){
        
        image = "";
        console.log(error);
    }

    return(
        <article>
            <img
                src={image}
                alt={post?.title}
            />
            <div>
                <h2>{post?.title}</h2>
                <p>{post?.content}</p>
            </div>
        </article>
    );
};