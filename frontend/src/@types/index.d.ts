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

export interface Post{
    _id : string,
    content : string,
    fileName : string,
    imageUrl : string,
    title : string,
    creator : string,
    createdAt ?: string,
    updatedAt ?: string
}