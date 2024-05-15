/**
 * 
 * Date created: 15/05/2024
 * 
 * Author : Nothile Moyo
 * 
 * Edit Post component
 * This component is a view screen uses the parameter to create a form with the fields already filled
 * This is a view screen which will take the postId in order to find the data required
 */

import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditPost.scss";
import { Post } from "../../@types";
import { AppContext } from "../../context/AppContext";
import { BASENAME } from "../../util/util";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

/**
 * @Name EditPost
 * 
 * @Description The Edit Post Screen
 * 
 * @Param postId ?: string
 * 
 * @returns EditPost : JSX
 */
export const EditPost : FC = () => {

    // Get the parameters so extract the postId
    const params = useParams();
    const navigate = useNavigate();
    const postId = params.postId;
    const appContextInstance = useContext(AppContext);

    // State for the page
    const [postData, setPostData] = useState<Post>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    console.clear();
    console.log("PostId", postId);
    console.log(postId);

    const getPostData = () => {

    };

    // This method runs the get method and then formats the results
    const handlePostDataQuery = () => {


    };

    useEffect(() => {

        // Toggle the loading spinner util the request ends
        setIsLoading(true);
        appContextInstance?.validateAuthentication();
        
        try{

            if (appContextInstance?.userAuthenticated === true) {
                
                if (appContextInstance?.token !== '') {
    
                }
            }

            setIsLoading(false);

        }catch(error){
            console.error(error);
        }

        // If the user isn't authenticated, redirect this route to the previous page
        appContextInstance?.userAuthenticated === false && navigate(`${BASENAME}/login`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[postId, appContextInstance]);

    return(
        <section className="editPost">
            {
                isLoading && <LoadingSpinner/>
            }
            Edit Post
        </section>
    );
};