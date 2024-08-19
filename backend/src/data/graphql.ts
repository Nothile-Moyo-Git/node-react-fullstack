/**
 * Date created : 30/07/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL file to hold everything
 * 
 */

import RootSchema from "./schemas/RootSchema";
import AuthSchema from "./schemas/AuthSchema";

const schemas = {
    RootSchema : RootSchema,
    AuthSchema : AuthSchema
};

export default schemas;

