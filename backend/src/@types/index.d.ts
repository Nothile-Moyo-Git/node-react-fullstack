// Importing dependencies or generics or interfaces we're going to extend
import { ObjectId } from 'mongodb';
import { Session, SessionData } from "express-session";
import { Request } from 'express';

// Declare our modules to allow us to use files
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