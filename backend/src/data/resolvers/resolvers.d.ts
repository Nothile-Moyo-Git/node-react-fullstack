import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";

// Auth resolver types
export interface ParentParam {
  postId: string;
}

export interface Decoded {
  email?: string;
  name?: string;
  userId?: string | ObjectId;
  exp?: number;
  iat?: number;
}

export interface SignupResolverArgs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResolverArgs {
  emailAddress: string;
  password: string;
}

export interface UserStatusResolverArgs {
  _id: string;
}

export interface UpdateUserStatusResolverArgs {
  status: string;
  _id: string;
}

export interface UserDetailsResolverArgs {
  _id: string;
  token: string;
  decoded: Decoded | string | JwtPayload;
}

export interface DeleteSessionResolverArgs {
  _id: string;
}

export interface CheckCreateSessionResolverArgs {
  userId: string;
  token: string;
}

// Chat resolver types
export interface GetChatsResolverArgs {
  _id: string;
}

// Post Resolver types
export interface GetPostsResolverArgs {
  currentPage: number;
}

export interface FileDataResolverArgs {
  fileName: string;
  imageUrl: string;
  isFileValid: boolean;
  isFileTypeValid: boolean;
  isImageUrlValid: boolean;
  isFileSizeValid: boolean;
}

export interface PostCreatePostResolverArgs {
  title: string;
  content: string;
  userId: string;
  fileData: FileDataResolverArgs;
}

export interface PostGetPostResolverArgs {
  postId: string;
}

export interface GetValidatePostResolverArgs {
  postId: string;
  userId: string;
}

export interface PostUpdatePostResolverArgs {
  title: string;
  userId: string;
  content: string;
  fileData: FileDataResolverArgs;
  postId: string;
}

export interface PostDeletePostResolverArgs {
  postId: string;
  userId: string;
}
