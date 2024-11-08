declare module "graphql-upload" {
    import { GraphQLScalarType } from "graphql";
    import { RequestHandler } from "express";

    export const GraphQLUpload: GraphQLScalarType;

    export interface FileUpload {
        filename: string;
        mimetype: string;
        encoding: string;
        createReadStream: () => NodeJS.ReadableStream;
    }

    export interface UploadOptions {
        maxFieldSize?: number;
        maxFileSize?: number;
        maxFiles?: number;
    }

    // Explicitly declare graphqlUploadExpress as a function returning a RequestHandler
    export function graphqlUploadExpress(options?: UploadOptions): RequestHandler;
}