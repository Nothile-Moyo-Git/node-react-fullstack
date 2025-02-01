// Importing dependencies or generics or interfaces we're going to extend
import { ObjectId } from "mongodb";
import { Express, Request } from "express";
import { Buffer } from "buffer";

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

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

export interface PostsInterface {
  type: ObjectId;
  ref: string;
}

export interface UserInterface {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  status?: string;
  posts?: PostsInterface[];
}

export interface UserMethodsInterface {
  generateHash: (password: string) => string;
}

export interface ChatMessage {
  message: string;
  dateSent: string;
  senderId: string;
  sender: string;
}

export interface ChatInterface {
  messages: ChatMessage[];
  userIds: ObjectId[];
}

export interface CreatorInterface {
  type: ObjectId;
  ref: string;
  required: true;
}

export interface PostsInterface {
  fileLastUpdated: string;
  fileName: string;
  _id: ObjectId;
  title: string;
  imageUrl: string;
  content: string;
  creator: CreatorInterface | string;
  createdAt: Date | number | string;
  updatedAt: Date | number | string;
}

export interface PostsMethodsInterface {
  addPosts: () => void;
}

export interface SessionsInterface {
  expires: string;
  token: string;
  expireAt: Date;
  creator: {
    type: ObjectId;
    ref: string;
    required: true;
  };
}

export interface RequestInterface extends Request {
  filename: string;
  body: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export interface ChatRequestInterface extends Request {
  body: {
    senderId: string;
    recipientId: string;
    messages: string;
    newMessage: string;
    sender: string;
  };
}

// Auth Controller Request interface
export interface AuthRequestInterface extends Request {
  email: string;
  name: string;
  password: string;
  userId: ObjectId;
  body: {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    status: string;
    token: string;
    userId: string;
  };
}

export interface SocketRequest extends Request {
  fileLastUpdated?: string;
  fileName: string;
  _id?: ObjectId;
  title?: string;
  imageUrl?: string;
  content?: string;
  creator?: CreatorInterface | string;
}

export interface FeedRequestInterface extends Request {
  file: Express.Multer.File;
  filename: string;
  userId: ObjectId;
}

export interface ErrorInterface extends Error {
  statusCode?: number;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmi: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  data: string;
}

export interface MovieDocumentType {
  name: string;
  description: string;
  year: string;
}

export interface MovieDocumentResponse {
  document: MovieDocumentType;
}
