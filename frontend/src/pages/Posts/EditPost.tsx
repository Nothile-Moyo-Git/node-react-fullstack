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

import { FC, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./EditPost.scss";
import { Post } from "../../@types";
import { AppContext } from "../../context/AppContext";
import { BASENAME } from "../../util/util";
import LoadingSpinner from "../../components/loader/LoadingSpinner";
import ErrorModal from "../../components/modals/ErrorModal";
import Form from "../../components/form/Form";
import Title from "../../components/form/Title";
import Field from "../../components/form/Field";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Button from "../../components/button/Button";
import { fileUploadHandler, generateBase64FromImage } from "../../util/file";
import ImagePreview from "../../components/form/ImagePreview";
import TextArea from "../../components/form/TextArea";
import { MdKeyboardBackspace } from "react-icons/md";

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
    const location = useLocation();

    // State for the page
    const [postData, setPostData] = useState<Post>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showErrorText, setShowErrorText] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState<boolean>(true);
    const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
    const [isContentValid, setIsContentValid] = useState<boolean>(true);
    const [isFileValid, setIsFileValid] = useState<boolean>(true);
    const [isPostCreatorValid, setIsPostCreatorValid] = useState<boolean>(true);
    const [uploadFile, setUploadFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState<unknown | null>(null);
    const [showImagePreview, setShowImagePreview] = useState<boolean>();
    const [previousImageUrl, setPreviousImageUrl] = useState<string>();

    // States and refs for our objects
    const titleRef = useRef<HTMLInputElement>(null);
    const imageUrlRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const getPostData = async (userId : string) => {

        // Create the fields
        const fields = new FormData();
        fields.append("userId", userId);

        // Query to GraphQL
        const response = await fetch(`/graphql/posts`,{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                Accept: "application/json", 
            },
            body : JSON.stringify({ 
                query : `
                    query GetAndValidatePostResponse($postId : String!, $userId : String!){
                        GetAndValidatePostResponse(postId : $postId, userId : $userId){
                            success
                            message
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
                            isUserValidated
                        }
                    }
                `,
                variables : {
                    postId : postId,
                    userId : userId
                }
            })
        });

        // Get the json from the backend
        const dataResponse = await response.json();

        // Get the data from the json
        const data = dataResponse.data.GetAndValidatePostResponse;

        // Show the error modal if the request fails
        if (!dataResponse.errors) {
            setShowErrorText(false);
        }
        
        if (dataResponse.errors) {
            setShowErrorText(true);
        }

        return data;
    };

    // Set the preview of the file when the api request concludes so we can view it on the page immediately
    const formatPreviousPostImage = async (post : Post) => {

        try{

            // Only fetch the file if we have a filename
            if (post?.fileName && post?.fileLastUpdated) {
    
                // Fetch the image, if it fails, reload the component
                setPreviousImageUrl(await require(`../../uploads/${post?.fileLastUpdated}/${post?.fileName}`));
            }
    
        }catch(error){
            
            console.log("\n\n");
            console.log("Error loading image");
            console.log(error);
        }
    };

    // This method runs the get method and then formats the results
    const handlePostDataQuery = async (userId : string) => {

        // Perform the api request
        const data = await getPostData(userId);

        if (data.isUserValidated === false) {
            navigate(`${BASENAME}/posts`);
        }

        const success = data.success ? data.success : false;

        if (success === true) {
            setPostData(data.post);
            formatPreviousPostImage(data.post);
        }
    };

    // Back handler
    const backToPreviousPage = () => {

        // If we were on the domain, then go back to the previous page
        if (location.key !== 'default') { navigate(-1); }
    };

    useEffect(() => {

        // Toggle the loading spinner until the request ends
        setIsLoading(true);
        appContextInstance?.validateAuthentication();
        
        try{

            if (appContextInstance?.userAuthenticated === true) {
                
                if (appContextInstance?.token !== '') {
                    handlePostDataQuery(appContextInstance?.userId ? appContextInstance.userId : "");
                }
            }

        }catch(error){
            console.error(error);
        }

        setIsLoading(false);

        // If the user isn't authenticated, redirect this route to the previous page
        appContextInstance?.userAuthenticated === false && navigate(`${BASENAME}/login`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[postId, appContextInstance, isPostCreatorValid]);

    // Update the post data, and return an error if required
    const submitHandler = async (event : FormEvent) => {

        event.preventDefault();

        // let fileData = {};
        // uploadFile && (fileData = await fileUploadHandler(uploadFile));

        /* const userId = appContextInstance?.userId;

        let title = "";
        let content = "";

        // Extract inputs
        if (titleRef.current) { title = titleRef.current.value; }
        if (contentRef.current) { content = contentRef.current.value; }

        // Set form inputs for the api request to the bakend
        const fields = new FormData();
        fields.append('title', title);
        uploadFile && fields.append("image", uploadFile);
        fields.append('content', content);
        userId && fields.append('userId', userId);

        try{

            // Perform the API request to the backend
            const response = await fetch(`http://localhost:4000/update-post/${postId}`, {
                method : "PUT",
                body : fields
            });

            const data = await response.json();

            // Apply validation on the fields so we can show errors if needed
            setIsFormValid(data.success);
            setIsFileValid(data.isFileValid);
            setIsTitleValid(data.isTitleValid);
            setIsContentValid(data.isContentValid);
            setIsPostCreatorValid(data.isPostCreator);

            if (data.success === true) {
                
                // Reload the page if we were successful so we can query the updated results
                alert(`Success, Post ${postId} updated`);
                window.location.reload();
            }

            // Remove the image preview / file if it isn't valid so the user can upload a new one
            if (!data.isFileValid) {
                setUploadFile(undefined);
                setImagePreview(null);
                setShowImagePreview(false);
                imageUrlRef.current && (imageUrlRef.current.value = "");
            }

        }catch(error){
            console.log(error);
        } */

        try {

            // Get values
            const userId = appContextInstance?.userId ?? "";
            const title = titleRef.current?.value || "";
            const content = contentRef.current?.value || "";

            let fileData = {};
            uploadFile && (fileData = await fileUploadHandler(uploadFile));

            // Perform the API request to the backend
            const editPostResponse = await fetch('/graphql/posts', {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    Accept: "application/json", 
                },
                body : JSON.stringify({ 
                    query : `
                        mutation PostEditPostResponse($title : String!, $content : String!, $userId : String!, $fileData : FileInput, $postId : String!){
                            PostEditPostResponse(title : $title, content : $content, userId : $userId, fileData : $fileData, postId : $postId){
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
                                fileValidProps {
                                    fileName
                                    imageUrl
                                    isImageUrlValid
                                    isFileSizeValid
                                    isFileTypeValid
                                    isFileValid
                                }
                            }
                        }
                    `,
                    variables : {
                        title : title,
                        content : content,
                        userId : userId,
                        fileData : fileData,
                        postId : postId
                    }
                })
            });

            // Get the result of the API request
            const data = await editPostResponse.json();
            const response = data.data.PostEditPostResponse;

            console.log("\n", "data");
            console.log(data);

            console.log("\n");
            console.log("Response");
            console.log(response);

        }catch(error){

            console.log("Request failed");
            console.error(error);
        }
    };

    // File upload handler, this is done so we can encode the file in a b64 format which allows us to send it to the backend
    const fileUploadChangeEvent = async (event : React.ChangeEvent<HTMLInputElement>) => {

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

    return(
        <section className="editPost">
            {
                isLoading && <LoadingSpinner/>
            }
            {
                !isLoading && showErrorText && <ErrorModal/>
            }
            {
                !isLoading && !showErrorText &&
                <Form onSubmit={submitHandler}>
                    <Title 
                        isFormValid={isFormValid}
                    >{isFormValid ? 
                        `Edit Post : ${postData?.title}` 
                        : 'Error: Please fix the errors below'
                    }</Title>

                    {
                        location.key !== 'default' &&
                        <Button variant="back" onClick={backToPreviousPage}><MdKeyboardBackspace/>Go back</Button>
                    }

                    <Field>
                        <Label
                            id="titleLabel"
                            htmlFor="title"
                            error={!isTitleValid}
                            errorText={"Error: Title must be longer than 3 characters"}
                        >Title*</Label>
                        <Input
                            ariaLabelledBy="titleLabel"
                            error={!isTitleValid}
                            initialValue={postData?.title}
                            name="title"
                            placeholder="Enter your title here"
                            ref={titleRef}
                            required={true}
                            type="string"
                        />
                    </Field>

                    <Field>
                        <Label
                            id="imageUrlLabel"
                            htmlFor="imageUrl"
                            error={!isFileValid}
                            errorText="Error: Please upload a PNG, JPEG or JPG (max size: 5Mb)"
                        >Image</Label>
                        <Input
                            ariaLabelledBy="imageUrlLabel"
                            error={!isFileValid}
                            name="image"
                            onChange={fileUploadChangeEvent}
                            ref={imageUrlRef}
                            required={false}
                            type="file"
                        />
                    </Field>

                    {   
                        (showImagePreview || previousImageUrl) &&
                        <Field>
                            {(!showImagePreview && previousImageUrl) &&
                                <Label
                                    id="imageUrlLabel"
                                    htmlFor="imageUrl"
                                    error={false}
                                    errorText="Error: Please upload a PNG, JPEG or JPG (max size: 5Mb)"
                                >{`Previous image: ${postData?.fileName}`}</Label>
                            } 
                            <ImagePreview
                                encodedImage={showImagePreview ? imagePreview : previousImageUrl}
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
                            initialValue={postData?.content}
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
            }
        </section>
    );
};