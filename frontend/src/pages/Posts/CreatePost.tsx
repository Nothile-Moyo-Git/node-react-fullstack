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
import Button from "../../components/button/Button";
import ImagePreview from "../../components/form/ImagePreview";
import { generateBase64FromImage } from "../../util/file";

import "./CreatePost.scss";

export const CreatePostComponent : FC = () => {

    // Check if the user is authenticated, if they are, then redirect to the previous page
    const appContextInstance = useContext(AppContext);

    // Instantiate the navigation object
    const navigate = useNavigate();

    // States and refs for our objects
    const titleRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLInputElement>(null);

    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
    const [isImageUploadValid, setIsImageUploadValid] = useState<boolean>(true);
    const [isContentValid, setIsContentValid] = useState<boolean>(true);
    const [uploadFile, setUploadFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState<unknown | null>(null);
    const [showImagePreview, setShowImagePreview] = useState<boolean>(false);

    // Check authentication when component mounts
    useEffect(() => {

        appContextInstance?.validateAuthentication();

        // If the user is authenticated, redirect this route to the previous page
        !appContextInstance?.userAuthenticated && navigate(-1);

    },[appContextInstance, navigate]); 

    // Handle the form submission for creating a new post
    const submitHandler = async (event : FormEvent) => {

        event.preventDefault();

        console.clear();
        console.log("\n\n");
        console.log("Form submitted");
        console.log("\n");

        const userId = appContextInstance?.userId;

        let title = "";
        let content = "";

        // Extract inputs
        if (titleRef.current) { title = titleRef.current.value; }
        if (contentRef.current) { content = contentRef.current.value; }

        // Set form inputs for the api request to the bakend
        const fields = new FormData();
        fields.append('title', title);
        uploadFile &&  fields.append("image", uploadFile);
        fields.append('content', content);
        userId && fields.append('userId', userId);

        /*
        // Perform the API request to the backend
        const response = await fetch('http://localhost:4000/create-post', {
            method : "POST",
            body : fields
        });

        console.log("Response");
        console.log(response);

        console.log("\n");

        const data = await response.json();

        console.log("data");
        console.log(data); */
    };

    // File upload handler, this is done so we can encode the file in a b64 format which allows us to send it to the backend
    const fileUploadHandler = async (event : React.ChangeEvent<HTMLInputElement>) => {

        // Set the file so that it's ready for upload
        if (event.target.files) {
            const file = event.target.files[0];

            // Raise and error and empty the input, otherwise, set the state to sent to the backend
            // Note: This is for UX purposes, file uploads are also verified in the backend
            if (file.size > 5000000) {
                alert("Please upload a file smaller than 5MB");
                event.target.value = "";
            }else{
                setUploadFile(file);
                const base64Image = await generateBase64FromImage(file);
                setImagePreview(base64Image);
                setShowImagePreview(true);
            }
        }
    }

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
                            required={true}
                            type="text"
                        />
                    </Field>

                    <Field>
                        <Label
                            htmlFor="imageUrl"
                            id="imageUrlLabel"
                            errorText="Error: File type is invalid"
                        >Image*</Label>
                        <Input
                            ariaLabelledBy="imageUrlLabel"
                            error={!isImageUploadValid}
                            name="image"
                            onChange={fileUploadHandler}
                            placeholder="Please enter your title"
                            ref={imageUrlRef}
                            required={true}
                            type="file"
                        />
                    </Field>

                    {   
                        showImagePreview &&
                        <Field>
                            <ImagePreview
                                encodedImage={imagePreview}
                                backgroundSize="contain"
                                backgroundPosition="center"
                            />
                        </Field>
                    }

                    <Field>
                        <Label
                            htmlFor="content"
                            id="contentLabel"
                            errorText="Error: Content must be longer than 6 characters"
                        >Content*</Label>
                        <Input
                            ariaLabelledBy="contentLabel"
                            error={!isContentValid}
                            name="content"
                            placeholder="Please enter your content"
                            ref={contentRef}
                            required={true}
                            type="text"
                        />
                    </Field>

                    <Button variant="primary">Submit</Button>

                </Form>

        </section>
    );
};

