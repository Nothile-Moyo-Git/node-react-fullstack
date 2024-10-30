/**
 * Date created : 30/10/2024
 * 
 * Author : Nothile Moyo
 * 
 * Description : GraphQL chat schema description file
 * 
 */

const GetErrorPageResolver = () => {

    return {message : "Error 404: Page doesn't exist"};
};

const errorResolvers = {
    GetErrorPageResolver : GetErrorPageResolver
};

export default errorResolvers;