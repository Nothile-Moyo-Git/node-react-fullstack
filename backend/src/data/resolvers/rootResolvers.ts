/**
 * 
 * Date created : 02/08/2024
 * 
 * Author: Nothile Moyo
 * 
 */

// The root object which holds the resolvers 
const rootResolvers = {

    hello() {
        return "Hello world!";
    },

    text(parent, args) {
        return `Text returned : ${args.content}`;
    }

};

export default rootResolvers;