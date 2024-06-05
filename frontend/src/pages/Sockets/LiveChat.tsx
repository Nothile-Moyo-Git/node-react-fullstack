/**
 * 
 * Date created : 04/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * Live chat component, shows the current live chat being active by use of socket IO
 * This will apply to both the front and the backend
 */

import { DefaultEventsMap } from "@socket.io/component-emitter";
import { FC, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const LiveChat : FC = () => {

    let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

    useEffect(() => {

        console.log("Component rendered");

        // Connect to the websocket if the socket doesn't exist already
        console.log("Socket");
        console.log(socket);
    });

    if (!socket) {
        socket = io("http://localhost:4000");
    }



    return(
        <section>
            <h1>Live chat</h1>
        </section>
    );
};

export default LiveChat;