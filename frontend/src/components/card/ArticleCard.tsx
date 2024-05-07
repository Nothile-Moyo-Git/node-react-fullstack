/**
 * Date Created : 20/04/2024
 * 
 * Author : Nothile Moyo
 * 
 * ArticleCard component
 * Wraps an article in a card component in order to be rendered in a list
 */

import "./ArticleCard.scss"; 
import { Post } from '../../@types';
import { FC, ReactNode } from 'react';
import { Link } from "react-router-dom";
import { BASENAME } from "../../util/util";
import Button from "../button/Button";

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
        <article className="article">

            <img
                src={image}
                alt={post?.title}
                className="article__image"
            />

            <div className="article__content">
                <h2 className="article__title">{post?.title}</h2>
                <p className="article__description">{post?.content}</p>
                <div className="article__buttons">
                    <Link 
                        to={`${BASENAME}/post/${post?._id}`}
                        className="article__link"
                    >Read more</Link>
                    <Button 
                        variant="delete"
                    >Delete</Button>
                </div>
            </div>

        </article>
    );
};