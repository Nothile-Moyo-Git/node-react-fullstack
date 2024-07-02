/**
 * 
 * Date created : 29/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * description : Our socket connection in a file which can be shared amongst multiple files
 */

import { IncomingMessage, Server as HTTPServer, ServerResponse } from "http";
import { Server as Socket } from "socket.io";

interface SocketOptionsProps {
    cors ?: {
        origin : string
    }
}

/**
 * @class ClassSocketIO
 * 
 * @param server: Server<typeof IncomingMessage, typeof ServerResponse>
 * @param options: SocketOptionsProps
 * 
 * @description A socket class to handle connection functionality which can be shared amongst multiple files
 */


class ClassSocketIO {

    // Define our properties here
    protected server : HTTPServer<typeof IncomingMessage, typeof ServerResponse>;
    protected options : SocketOptionsProps;

    // Constructor to start the server
    public constructor(
        server : HTTPServer<typeof IncomingMessage, typeof ServerResponse>, 
        options : SocketOptionsProps,
    ){
        this.server = server;
        this.options = options;

        if (this.server) {
            // Create our connection to socket.io
            const socketIO = new Socket(
                this.server, 
                this.options
            );

            console.log("\n");
            console.log("options");
            console.log(this.options);
        }
    }

    protected getIO() {
        if (this.server) {

        }
    }
}

export default ClassSocketIO;

