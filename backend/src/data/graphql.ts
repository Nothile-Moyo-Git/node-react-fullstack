/**
 * Date created : 30/07/2024
 *
 * Author : Nothile Moyo
 *
 * Description : GraphQL file to hold everything
 *
 */

import AuthSchema from "./schemas/AuthSchema.ts";
import ChatSchema from "./schemas/ChatSchema.ts";
import PostSchema from "./schemas/PostSchema.ts";
import ErrorSchema from "./schemas/ErrorSchema.ts";

const schemas = {
  AuthSchema: AuthSchema,
  ChatSchema: ChatSchema,
  ErrorSchema: ErrorSchema,
  PostSchema: PostSchema,
};

export default schemas;
