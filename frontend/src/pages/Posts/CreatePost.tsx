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
import { BASENAME } from "../../util/util";
import Form from "../../components/form/Form";
import Title from "../../components/form/Title";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Field from "../../components/form/Field";
import Button from "../../components/button/Button";
import TextArea from "../../components/form/TextArea";
import ImagePreview from "../../components/form/ImagePreview";
import { generateBase64FromImage } from "../../util/file";

import "./CreatePost.scss";

interface Creator {
    _id : string,
    name : string
}
interface CreatePostResponse {
    creator : Creator | null,
    isContentValid : boolean,
    isFileValid : boolean,
    isFileTypeValid : boolean,
    isImageValid : boolean,
    isTitleValid : boolean,
    message : string,
    mimeType : string | null,
    success : boolean,
}

export const CreatePostComponent : FC = () => {

    // Check if the user is authenticated, if they are, then redirect to the previous page
    const appContextInstance = useContext(AppContext);

    // Instantiate the navigation object
    const navigate = useNavigate();

    // States and refs for our objects
    const titleRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
    const [isContentValid, setIsContentValid] = useState<boolean>(true);
    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    const [isFileValid, setIsFileValid] = useState<boolean>(true);
    const [uploadFile, setUploadFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState<unknown | null>(null);
    const [showImagePreview, setShowImagePreview] = useState<boolean>(false);

    // Check authentication when component mounts
    useEffect(() => {

        appContextInstance?.validateAuthentication();

        // If the user isn't authenticated, redirect this route to the previous page
        appContextInstance?.userAuthenticated === false && navigate(`${BASENAME}/login`);

    },[appContextInstance, navigate]); 

    // Handle the form submission for creating a new post
    const submitHandler = async (event : FormEvent) => {

        event.preventDefault();

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
        
        // Perform the API request to the backend
        const response = await fetch('http://localhost:4000/create-post', {
            method : "POST",
            body : fields
        });

        const data : CreatePostResponse = await response.json();

        // Set & handle validation on the front end
        setIsFormValid(data.success);
        setIsFileValid(data.isFileValid);
        setIsTitleValid(data.isTitleValid);
        setIsContentValid(data.isContentValid);

        if (data.success === true) {
            alert("Post successfully submitted");
            navigate(`${BASENAME}/posts`, { replace : true });
        }
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

                    <Title isFormValid={isFormValid}>{isFormValid ? 'Create Post' : 'Error: Please fix the errors below'}</Title>

                    <Field>
                        <Label
                            error={!isTitleValid}
                            errorText="Error: Title must be longer than 3 characters"
                            htmlFor="title"
                            id="titleLabel"
                        >Title*</Label>
                        <Input
                            ariaLabelledBy="titleLabel "
                            error={!isTitleValid}
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
                            error={!isFileValid}
                            errorText="Error: Please upload a PNG, JPEG or JPG (max size: 5Mb)"
                        >Image*</Label>
                        <Input
                            ariaLabelledBy="imageUrlLabel"
                            error={!isFileValid}
                            name="image"
                            onChange={fileUploadHandler}
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
                                imageSize="contain"
                                imagePosition="left"
                            />
                        </Field>
                    }

                    <Field>
                        <Label
                            error={!isContentValid}
                            htmlFor="content"
                            id="contentLabel"
                            errorText="Error: Content must be longer than 6 characters and less than 400 characters"
                        >Content*</Label>
                        <TextArea
                            ariaLabelledBy="contentLabel"
                            error={!isContentValid}
                            name="content"
                            placeholder="Please enter your content"
                            startingRows={3}
                            ref={contentRef}
                            required={true}
                        />
                    </Field>

                    <Button variant="primary">Submit</Button>

                </Form>

        </section>
    );
};

