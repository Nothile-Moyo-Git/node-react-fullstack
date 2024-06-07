/**
 * 
 * Date created : 04/06/2024
 * 
 * Author : Nothile Moyo
 * 
 * Live chat component, shows the current live chat being active by use of socket IO
 * This will apply to both the front and the backend
 */

import "./LiveChat.scss";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Title from "../../components/form/Title";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import Field from "../../components/form/Field";

const LiveChat : FC = () => {

    let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
    const inputRef = useRef<HTMLInputElement>(null);
    const [chatMessages, setChatMessages] = useState<string[]>([]); 

    useEffect(() => {

        console.log("Component rendered");

        // Connect to the websocket if the socket doesn't exist already
        // console.log("Socket");
        // console.log(socket);
    });

    if (!socket) {
        socket = io("http://localhost:4000");
    }

    // Submit handler, this allows messages to be sent between clients
    const onSubmit = async (event : FormEvent) => {

        // Stop the page from reloading
        event.preventDefault();

        // If we have an input, send a message to the socket
        if (inputRef.current) {
            const chatMessage = inputRef.current.value;

            console.clear();
            console.log("chat message");
            console.log(chatMessage);

            // Send the message to the websocket
            socket && socket.emit('chat message', { message : chatMessage });
        } 
    };

    return(
        <section className="liveChat">
            <Form size="full" onSubmit={onSubmit}>
                
                <Title>Live Chat</Title>

                <Field position="bottom">
                    <Input
                        name="chatMessage"
                        error={false}
                        placeholder="Please enter a message into the chat"
                        ref={inputRef}
                        square={true}
                        type="text"
                    />
                </Field>

            </Form>
        </section>
    );
};

export default LiveChat;