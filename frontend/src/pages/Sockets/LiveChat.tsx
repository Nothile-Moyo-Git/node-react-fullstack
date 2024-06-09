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
import Button from "../../components/button/Button";

interface chatMessage {
    message : string,
    date : string
}

const LiveChat : FC = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [chatMessages, setChatMessages] = useState<chatMessage[]>([]);
    const socketClientRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

    useEffect(() => {

        const client = io("http://localhost:4000");

        // Add a message to the chat
        client.on("message sent", (message) => {

            setChatMessages((previousMessages) => {
                return [...previousMessages, message];
            });
        });

        // Set this to a ref so we can keep the value between re-renders
        if (!socketClientRef.current) {
            socketClientRef.current = client;
        }

        return () => {

            // Remove unncessary event handlers
            client.removeAllListeners();
        }

    },[]);

    // Submit handler, this allows messages to be sent between clients
    const onSubmit = async (event : FormEvent) => {

        // Stop the page from reloading
        event.preventDefault();

        // If we have an input, send a message to the socket
        if (inputRef.current) {
            const chatMessage = inputRef.current.value;

            // Send the message to the websocket
            socketClientRef.current && socketClientRef.current.emit('chat message', chatMessage);
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
                    <Button variant="square">Send</Button>
                </Field>

            </Form>

            {chatMessages.map((message) => {
                return (
                    <div>
                        <span>{`Sent : ${message.date}`}</span>
                        <p>{message.message}</p>
                    </div>
                );
            })}
        </section>
    );
};

export default LiveChat;