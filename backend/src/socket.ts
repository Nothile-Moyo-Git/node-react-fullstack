/**
 * 
 * Date created : 29/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * description : Our socket connection in a file which can be shared amongst multiple files
 */

import { IncomingMessage, Server as HTTPServer, ServerResponse } from "http";
import { Server as SocketIO } from "socket.io";
import { createReadableDate } from "./util/utillity-methods";
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

    // Constructor to start the server
    public constructor(
        server ?: HTTPServer<typeof IncomingMessage, typeof ServerResponse>, 
        options ?: SocketOptionsProps
    ){
        if (server) { this.server = server; }
        if (options) { this.options = options; }
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

                return socketIO;
            }else{
                return null;
            }

        }catch(error){

            console.log("\n");
            console.log("Connection error");
            console.log(error);

            return null;
        }
    }

    public handleChat() {

        // Handle our socket events\
        try{

            if (this.server) {

                // Create our connection to socket.io
                const socketIO = new SocketIO(
                    this.server, 
                    this.options
                );

                socketIO.on("connection", (socket) => {

                    socket.on('disconnect', (reason) => {

                        console.log("\n");
                        console.log("A user disconnected");
                    });

                    socket.on('error', (error) => {

                        console.log("\n");
                        console.log("An error occured");
                        console.log(error);
                    });

                    // If we receive a chat message, send it back to the other user so it can be read
                    socket.on('chat message', (message) => {

                        const sendDate = createReadableDate(new Date);

                        // Parse the JSON we send here so we can have the user
                        const messageDetails = JSON.parse(message);

                        // Create a json object of the object and the date to send to the front end
                        const messageObject = { 
                            message : messageDetails.message,
                            dateSent : sendDate,
                            sender : messageDetails.sender,
                            senderId : messageDetails.senderId
                        }

                        // Emit the message back to the frontend
                        socketIO.emit('message sent', messageObject);
                    });
                });
            }

        }catch(error){

            console.log("\n");
            console.log("Error handling error");
            console.log(error);
        }
    }
}

export default ClassSocketIO;

