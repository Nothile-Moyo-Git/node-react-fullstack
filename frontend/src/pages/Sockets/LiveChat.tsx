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
import { FC, FormEvent, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import Title from "../../components/form/Title";
import Form from "../../components/form/Form";
import Input from "../../components/form/Input";
import Field from "../../components/form/Field";

const LiveChat : FC = () => {

    let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
    const inputRef = useRef<HTMLInputElement>(null);

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

    };

    return(
        <section className="liveChat">
            <Form size="full" onSubmit={onSubmit}>
                
                <Title>Live Chat</Title>

                <Field>
                    <Input
                        name="chatMessage"
                        error={false}
                        ref={inputRef}
                        type="text"
                    />
                </Field>

            </Form>
        </section>
    );
};

export default LiveChat;