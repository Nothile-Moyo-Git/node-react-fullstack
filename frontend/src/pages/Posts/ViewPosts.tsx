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
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASENAME } from "../../util/util";
import { Paginator } from "../../components/pagination/Paginator";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import ErrorModal from "../../components/modals/ErrorModal";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { io } from "socket.io-client";
import ToastModal from "../../components/modals/ToastModal";
import ExpiryWrapper from "../../components/expiry/ExpiryWrapper";

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
    const [deleteId, setDeleteId] = useState<string>("");
    const [socketModal, setSocketModal] = useState(<></>);

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

    // Show the confirmation modal when attempting to delete a modal
    const toggleShowConfirmationModal = (id : string) => {        
        setDeleteId(id);
        setShowConfirmationModal((previousState) => !previousState);
    };

    // Handle the deletion of a post
    const deletePost = async () => {

        // create out fields to help authorize the request
        const fields = new FormData();
        fields.append('postId', deleteId);
        fields.append('userId', appContextInstance?.userId ? appContextInstance?.userId : '');

        try{

            // Perform the api request to delete the post
            const response = await fetch(`http://localhost:4000/delete-post`,{
                method : "POST",
                body : fields
            });

            fetchPosts();
            setShowConfirmationModal(false);

            if (response.status === 200) {
                alert(`Post ${deleteId} has successfully been deleted`);
            }

        }catch(error){
            console.clear();
            console.log(error);
        }
    };

    useEffect(() => {

        const client = io("http://localhost:4000");

        // Add a message to the chat
        client.on("post added", (postData) => {

            setSocketModal(
                <ExpiryWrapper lengthInSeconds={5}>
                    <ToastModal 
                        variant="success"
                        customMessage={`Success : Post ${postData.post.title} added!`}
                    >
                        <Link 
                            to={`${BASENAME}/post/${postData.post._id}`}
                            className="viewPosts__modal-link"
                        >View Post</Link>
                    </ToastModal>
                </ExpiryWrapper>
            );

            setTimeout(() => { 
                setSocketModal(<></>); 
            }, 6500);

            // 
            fetchPosts();

        });

        return () => {

            // Remove unncessary event handlers
            client.removeAllListeners();
        }
    },[fetchPosts]);

    useEffect(() => {

        // Toggle the loading spinner util the request ends
        setIsLoading(true);
        appContextInstance?.validateAuthentication();
        
        try{

            if (appContextInstance?.userAuthenticated === true) {
                
                if (appContextInstance?.token !== '') {
                    fetchPosts();
                }
            }
            
            setIsLoading(false);

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
                    id={deleteId}
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
                socketModal
            }

            {
                !isLoading && showErrorText && <ErrorModal/>
            }

        </section>
    );
};