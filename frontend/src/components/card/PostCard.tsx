/**
 * Date Created : 20/04/2024
 * 
 * Author : Nothile Moyo
 * 
 * PostCard component
 * Wraps an article in a card component in order to be rendered in a list
 */

import "./PostCard.scss";
import "../button/Button.scss";
import { Post } from '../../@types';
import { FC, ReactNode } from 'react';
import { Link } from "react-router-dom";
import { BASENAME, generateUploadDate } from "../../util/util";
import Button from "../button/Button";

interface ComponentProps {
   children ?: ReactNode,
   post : Post,
   toggleConfirmationModal : (id : string) => void
}

export const PostCard : FC<ComponentProps> = ({ post, toggleConfirmationModal }) => {

    let image = "";

    try{

        // Only fetch the file if we have a filename
        if (post?.fileName) {

            // Fetch the image, if it fails, reload the component
            image = require(`../../uploads/${post?.fileLastUpdated}/${post?.fileName}`);
        }

    }catch(error){
        
        console.log(error);
    }

    // Get an upload date so we can show when the post was uploaded
    const uploadDate = generateUploadDate(post?.createdAt ? post?.createdAt : '');

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
                <p>{ `Uploaded: ${uploadDate}` }</p>
                <div className="article__buttons">
                    <Link 
                        to={`${BASENAME}/post/${post?._id}`}
                        className="link__read-more"
                    >Read more</Link>
                    <Link
                        to={`${BASENAME}/edit-post/${post?._id}`}
                        className="link__edit"
                    >Edit</Link>
                    <Button 
                        variant="delete"
                        onClick={() => toggleConfirmationModal(post._id)}
                    >Delete</Button>
                </div>
            </div>

        </article>
    );
};