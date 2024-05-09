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
import { BASENAME, generateUploadDate } from "../../util/util";
import Button from "../../components/button/Button";

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
            image = require(`../../uploads/${postData.fileLastUpdated}/${postData?.fileName}`);
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

    // Get an upload date so we can show when the post was uploaded
    const uploadDate = generateUploadDate(postData?.createdAt ? postData?.createdAt : '');

    return(
        <section className="post">
            <h1 className="post__title">{postData?.title}</h1>
            <Button variant="primary">Go back</Button>
            <p className="post__date">{`Uploaded: ${uploadDate}`}</p>
            <img
                src={image}
                alt={postData?.title}
                className="post__image"
            />
            <p>{postData?.content}</p>
        </section>
    );
};

export default PostScreen;