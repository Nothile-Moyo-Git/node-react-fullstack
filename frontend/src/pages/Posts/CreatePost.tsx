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

        try {

            const userId = appContextInstance?.userId;

            let title = "";
            let content = "";
    
            // Extract inputs
            if (titleRef.current) { title = titleRef.current.value; }
            if (contentRef.current) { content = contentRef.current.value; }
    
            // Set form inputs for the api requests to the bakend
            const fields = new FormData();
            uploadFile && fields.append("image", uploadFile);
    
            // File upload response
            const fileUploadResponse = await fetch(`/rest/post/file-upload`, {
                method : 'POST',
                body : fields
            });
    
            // Get the file data we need to send to the api request
            const fileUploadData = await fileUploadResponse.json();
            const fileData = { 
                fileName : fileUploadData.fileName,
                imageUrl : fileUploadData.imageUrl,
                isFileValid : fileUploadData.isFileValid,
                isFileSizeValid : fileUploadData.isFileSizeValid,
                isFileTypeValid : fileUploadData.isFileTypeValid,
                isImageUrlValid : fileUploadData.isImageUrlValid
            };
    
            console.log("\n\n");
            console.log("File upload data");
            console.log(fileUploadData);
    
            // Perform the API request to the backend
            const createPostResponse = await fetch('/graphql/posts', {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    Accept: "application/json", 
                },
                body : JSON.stringify({
                    query :`
                        mutation PostCreatePostResponse($title : String!, $content : String!, $userId : String!, $fileData : FileInput!){
                            PostCreatePostResponse(title : $title, content : $content, userId : $userId, fileData : $fileData) {
                                post {
                                    _id
                                    fileLastUpdated
                                    fileName
                                    title
                                    imageUrl
                                    content
                                    creator
                                    createdAt
                                    updatedAt
                                }
                                user
                                status
                                success
                                message
                                isContentValid
                                isTitleValid
                                isFileValid
                                isFileTypeValid
                                isFileSizeValid
                            }
                        }
                    `,
                    variables : {
                        title : title,
                        content : content,
                        userId : userId,
                        fileData : fileData
                    }
                })
            });
    
            // Extract the data from the stream
            const createPostData = await createPostResponse.json();
    
            console.log("\n\n");
            console.log("Create post response");
            console.log(createPostResponse);
    
            console.log("\n\n");
            console.log("Create post data");
            console.log(createPostData);
    
            const data = createPostData.data.PostCreatePostResponse;

            console.log("\n\n");
            console.log("Data");
            console.log(data);
            console.log("\n\n");
    
            // Set & handle validation on the front end
            setIsFormValid(data.success);
            setIsFileValid(data.isFileValid);
            setIsTitleValid(data.isTitleValid);
            setIsContentValid(data.isContentValid);
    
            if (data.success === true) {
    
                // Created form data
                const fields = new FormData();

                for ( const property in data.post ) {

                    console.log("property");
                    console.log(data.post[property]);

                    fields.append(property, String(data.post[property]));
                }

                console.log("\n\n");
                console.log("fields");
                console.log(fields);

                /*
                // Query the backend with post data
                await fetch('/rest/socket/emit/post-created', {
                    method : 'POST',
                    body : fields
                }); */
    
                // alert("Post successfully submitted");
                // window.location.href = `${BASENAME}/posts`;
            }

        }catch(error){

            console.warn("Error");
            console.warn(error);
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

