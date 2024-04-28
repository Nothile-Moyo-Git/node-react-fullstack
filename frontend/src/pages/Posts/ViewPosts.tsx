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
import { Post } from "../../@types/index";
import { AppContext } from "../../context/AppContext";
import { ArticleCard } from "../../components/card/ArticleCard";
import { FC, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASENAME } from "../../util/util";
import { Paginator } from "../../components/pagination/Paginator";

export const ViewPosts : FC = () => {

    // Instantiate values
    const appContextInstance = useContext(AppContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);

    // Get posts method, we define it here so we can call it asynchronously
    const getPosts = async () => {
        const response = await fetch(`http://localhost:4000/posts/${page}`);
        return response;
    };

    useEffect(() => {
        
        appContextInstance?.validateAuthentication();

        // Method defined here to allow async calls in a useEffect hook
        const fetchPosts = async () => {

            const result = await getPosts();

            const data = await result.json();

            const success = data.success ? data.success : false;

            if (success === true) {
                setPosts(data.posts);
                setNumberOfPages(data.numberOfPages);
            }
        };
        
        if (appContextInstance?.token !== '') {
            fetchPosts();
        }

        // If the user isn't authenticated, redirect this route to the previous page
        !appContextInstance?.userAuthenticated && navigate(`/${BASENAME}/login`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[appContextInstance, posts]);

    return(
        <section className="viewPosts">
            <h1 className="viewPosts__title">Posts</h1>

            <ul className="viewPosts__posts-list">
                {
                    posts.map((post : Post) => {
                        return (
                            <li key={post._id}>
                                <ArticleCard post={post}/>
                            </li>
                        )
                    })
                }
            </ul>

            <Paginator
                currentPage={page}
                numberOfPages={numberOfPages}
                setPage={setPage}
            />

        </section>
    );
};