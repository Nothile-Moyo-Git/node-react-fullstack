/**
 * 
 * Date created : 29/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * description : Our socket connection in a file which can be shared amongst multiple files
 */

import { Server, IncomingMessage, ServerResponse } from "http";

interface SocketOptionsProps {
    cors : {
        origin : string
    }
}

class SocketIO {

    server: Server<typeof IncomingMessage, typeof ServerResponse>;
    options: SocketOptionsProps;

    constructor(
        server: Server<typeof IncomingMessage, typeof ServerResponse>, 
        options: SocketOptionsProps
    ){
        this.server = server;
        this.options = options;
    }
}

const handleSocketConnection = (
    server : Server<typeof IncomingMessage, typeof ServerResponse>, 
    options : SocketOptionsProps
) => {

    console.log("\n");
    console.log("Options");
    console.log(options);


};

export default handleSocketConnection;

