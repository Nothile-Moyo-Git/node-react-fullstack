/**
 * Date created : 16/04/2024
 * 
 * Author : Nothile Moyo
 */


declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.html" {
    const content: string;
    export default content;
}

declare module "*.jpg"{
    const content: string;
    export default content;
}

declare module "*.jpeg"{
    const content: string;
    export default content;  
}

export interface Post {
    _id : string,
    content : string,
    fileName : string,
    fileLastUpdated : string,
    imageUrl : string,
    title : string,
    creator : string,
    createdAt ?: string,
    updatedAt ?: string
}

export interface User {
    _id : string,
    name : string,
    email : string,
    password : string,
    status : string,
    posts : string[]
}

/**
 * @name FileUploadEventType
 * 
 * @description Use for file upload events
 * 
 * @type event : React.ChangeEvent<HTMLInputElement>
 * @type setUploadFile : (value: React.SetStateAction<File | undefined>) => void
 * @type setImagePreview: (value: unknown) => void
 * @type setShowImagePreview: (value: React.SetStateAction<boolean | undefined>) => void
 */
export interface FileUploadEventType {
    event : React.ChangeEvent<HTMLInputElement>,
    setUploadFile : (value: React.SetStateAction<File | undefined>) => void,
    setImagePreview: (value: unknown) => void,
    setShowImagePreview: (value: React.SetStateAction<boolean | undefined>) => void
}