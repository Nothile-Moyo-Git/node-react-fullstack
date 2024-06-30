/**
 * 
 * Date created : 29/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * description : Our socket connection in a file which can be shared amongst multiple files
 */

import { Server, IncomingMessage, ServerResponse, RequestListener } from "http";
import { ServerOptions, Server as Socket } from "socket.io";

interface SocketOptionsProps {

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
    protected server: Server<typeof IncomingMessage, typeof ServerResponse>;
    protected options;

    // Constructor to start the server
    public constructor(
        server: Server<typeof IncomingMessage, typeof ServerResponse>, 
        options
    ){
        this.server = server;
        this.options = options;

        if (this.server) {
            // Create our connection to socket.io
            // const socketIO = new Server(this.server, this.options);
        }
    }

    protected getIO() {
        if (this.server) {

        }
    }
}

export default ClassSocketIO;

