/**
 * 
 * Date created: 28/03/2024
 * 
 * Author: Nothile Moyo
 * 
 * Create post component, this component will house the form that will be used in order to create a new post
 * Only logged in users will be able to create posts in the backend
 */

import { FC, FormEvent, useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import Title from "../../components/form/Title";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Field from "../../components/form/Field";

import "./CreatePost.scss";

export const CreatePostComponent : FC = () => {

    // Check if the user is authenticated, if they are, then redirect to the previous page
    const appContextInstance = useContext(AppContext);

    // Instantiate the navigation object
    const navigate = useNavigate();

    // States and refs for our objects
    const titleRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);
    const content = useRef<HTMLInputElement>(null);

    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  
    // Check authentication when component mounts
    useEffect(() => {

        appContextInstance?.validateAuthentication();

        // If the user is authenticated, redirect this route to the previous page
        !appContextInstance?.userAuthenticated && navigate(-1);

    },[appContextInstance, navigate]); 

    // Handle the form submission for creating a new post
    const submitHandler = (event : FormEvent) => {

        event.preventDefault();
    };

    return (
        <section className="createPost">

                <Form onSubmit={submitHandler}>

                    <Title>Create Post</Title>

                    <Field>
                        <Label
                            htmlFor="title"
                            id="titleLabel"
                            errorText="Error: Title must be longer than 3 characters"
                        >Title*</Label>
                        <Input
                            ariaLabelledBy="titleLabel "
                            error={!isPasswordValid}
                            name="title"
                            placeholder="Please enter your title"
                            ref={titleRef}
                            type="text"
                        />
                    </Field>

                    <Field>
                        <Label
                            htmlFor="imageUrl"
                            id="imageUrlLabel"
                            errorText="Error: File type is invalid"
                        >Title*</Label>
                        <Input
                            ariaLabelledBy="imageUrlLabel"
                            error={!isPasswordValid}
                            name="image"
                            placeholder="Please enter your title"
                            ref={titleRef}
                            type="file"
                        />
                    </Field>

                </Form>

        </section>
    );
};

