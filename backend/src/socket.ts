/**
 * 
 * Date created : 29/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * description : Our socket connection in a file which can be shared amongst multiple files
 */

import { IncomingMessage, Server as HTTPServer, ServerResponse } from "http";
import { Server as SocketIO, Socket } from "socket.io";

interface SocketOptionsProps {
    cors ?: {
        origin : string
    }
}

/**
 * @class ClassSocketIO
 * 
 * @param server: HTTPServer<typeof IncomingMessage, typeof ServerResponse>
 * @param options: SocketOptionsProps
 * 
 * @description A socket class to handle connection functionality which can be shared amongst multiple files
 */
class ClassSocketIO {

    // Define our properties here
    protected server : HTTPServer<typeof IncomingMessage, typeof ServerResponse>;
    protected options : SocketOptionsProps;
    protected socket;

    // Constructor to start the server
    public constructor(
        server : HTTPServer<typeof IncomingMessage, typeof ServerResponse>, 
        options : SocketOptionsProps
    ){
        this.server = server;
        this.options = options;
    }

    // Create the socket and return it
    public getIO() {

        try{

            // Connect to the socket and return the connection
            if (this.server) {

                // Create our connection to socket.io
                const socketIO = new SocketIO(
                    this.server, 
                    this.options
                );

                this.socket = socketIO;

                return socketIO;
            }else{
                return null;
            }

        }catch(error){

            console.log("Connection error");
            console.log(error);

            return null;
        }
    }

    public handleEvents() {

        // Handle our socket events\
        try{

            if (this.server) {

                //this.server.on()
            }

        }catch(error){

        }
    }
}

export default ClassSocketIO;

