/**
 * 
 * Date created: 07/05/2024
 * 
 * Author: Nothile Moyo
 * 
 * PostScreen component
 * This renders the details for a single Post on the screen
 * 
 * @param postId ?: string
 */

import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "./PostScreen.scss";
import { Post } from "../../@types";
import { BASENAME } from "../../util/util";
import { getCurrentMonthAndYear } from "../../util/file";

const PostScreen : FC = () => {

    const [isQuerying, setIsQuerying] = useState<boolean>(true);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [postData, setPostData] = useState<Post | null>(null);

    const params = useParams();
    const postId = params.postId;

    // Instantiate values
    const appContextInstance = useContext(AppContext);
    const navigate = useNavigate();

    let image = "";

    try{

        if (postData?.fileName){
            // Fetch the image, if it fails, reload the component
            image = require(`../../uploads/2024/04/${postData?.fileName}`);
        }

    }catch(error){
        
        console.log(error);
    }

    useEffect(() => {

        // Get posts method, we define it here so we can call it asynchronously
        const getPostData = async () => {
            const response = await fetch(`http://localhost:4000/post/${postId ?? ''}`);

            // Show the error if the request failed
            if (response.status === 200) {
                setShowErrorModal(false);
            }else{
                setShowErrorModal(true);
            }

            return response;
        };

        // Toggle the loading spinner util the request ends
        setIsQuerying(true);
        appContextInstance?.validateAuthentication();
        
        // Attempt to pull post data, returns an error if the request fails and renders the error modal
        try{

            if (appContextInstance?.userAuthenticated === true) {

                // Method defined here to allow async calls in a useEffect hook
                const fetchPostData = async () => {

                    const result = await getPostData();

                    const data = await result.json();

                    const statusCode = result.status;

                    if (statusCode === 200) {
                        console.log("Data post");
                        console.log(data.post);
                        console.log("image");
                        console.log(image);
                        setPostData(data.post);
                    }
                };
                
                if (appContextInstance?.token !== '') {
                    fetchPostData();
                    setIsQuerying(false);
                }
            }

        }catch(error){
            console.error(error);
        }

        // If the user isn't authenticated, redirect this route to the previous page
        appContextInstance?.userAuthenticated === false && navigate(`${BASENAME}/login`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[appContextInstance, postId]);

    return(
        <section className="post">
            <h1>{postData?.title}</h1>
            <img
                src={image}
            />
        </section>
    );
};

export default PostScreen;