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
import { PostCard } from "../../components/card/PostCard";
import { FC, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASENAME } from "../../util/util";
import { Paginator } from "../../components/pagination/Paginator";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import ErrorModal from "../../components/modals/ErrorModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";

export const ViewPosts : FC = () => {

    // Get params to set the initial page so we get the correct post on initial render
    // If there is no optional parameter, we'll grab the first page of posts as a failsafe
    const params = useParams();
    const initialPage = params.page ? Number(params.page) : 1;

    // Instantiate values
    const appContextInstance = useContext(AppContext);
    const navigate = useNavigate();

    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(initialPage);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);
    const [showErrorText, setShowErrorText] = useState<boolean>(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    // Get posts method, we define it here so we can call it asynchronously
    const getPosts = async () => {
        const response = await fetch(`http://localhost:4000/posts/${page}`);

        // Show the error if the request failed
        if (response.status === 200) {
            setShowErrorText(false);
        }else{
            setShowErrorText(true);
        }

        return response;
    };

    // Show the confirmation modal when attempting to delete a modal
    const toggleShowConfirmationModal = () => {
        
        console.clear();
        console.log("Confirmation modal");
        setShowConfirmationModal((previousState) => !previousState);
    };

    // Handle the deletion of a post
    const deletePost = () => {

        console.clear();
        console.log("Delete button clicked");
    };

    useEffect(() => {

        // Toggle the loading spinner util the request ends
        setIsLoading(true);
        appContextInstance?.validateAuthentication();
        
        try{

            if (appContextInstance?.userAuthenticated === true) {

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
                    setIsLoading(false);
                }
            }

        }catch(error){
            console.error(error);
        }

        // If the user isn't authenticated, redirect this route to the previous page
        appContextInstance?.userAuthenticated === false && navigate(`${BASENAME}/login`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[appContextInstance?.userAuthenticated, page]);

    return(
        <section className="viewPosts">
            <h1 className="viewPosts__title">Posts</h1>

            {
                isLoading && <LoadingSpinner/>
            }

            {
                showConfirmationModal && <ConfirmationModal 
                    toggleConfirmationModal={toggleShowConfirmationModal} 
                    performAction={deletePost}
                />
            }
 
            {
                !isLoading && !showErrorText && posts.length > 0 &&
                <>
                    <ul className="viewPosts__posts-list">
                        {
                            posts.map((post : Post) => {
                                return (
                                    <li key={post._id}>
                                        <PostCard 
                                            post={post}
                                            toggleConfirmationModal={toggleShowConfirmationModal}
                                        />
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
                </>
            }

            {
                !isLoading && showErrorText && <ErrorModal/>
            }

        </section>
    );
};