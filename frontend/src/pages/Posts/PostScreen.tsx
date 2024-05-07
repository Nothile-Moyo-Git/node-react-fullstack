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

import { FC } from "react";
import { useParams } from "react-router-dom";
import "./PostScreen.scss";

const PostScreen : FC = () => {

    const params = useParams();
    const postId = params.postId;

    console.clear();
    console.log("PostId");
    console.log(postId);

    return(
        <section className="post">
            <h1>Post</h1>
        </section>
    );
};

export default PostScreen;