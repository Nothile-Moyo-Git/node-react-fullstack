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
import { FC, FormEvent, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Title from "../../components/form/Title";
import Form from "../../components/form/Form";
import Field from "../../components/form/Field";
import Button from "../../components/button/Button";
import { AppContext } from "../../context/AppContext";
import { User } from "../../@types";
import { useNavigate } from "react-router-dom";
import { BASENAME } from "../../util/util";
import TextArea from "../../components/form/TextArea";

interface chatMessage {
    message : string,
    date : string
}

const LiveChat : FC = () => {

    const navigate = useNavigate();
    const appContextInstance = useContext(AppContext);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [chatMessages, setChatMessages] = useState<chatMessage[]>([]);
    const [userDetails, setUserDetails] = useState<User>();
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

    // Get user details if the user is authenticated from the backend
    const getUserDetails = async (userId : string) => {

        // We assign Formdata here so we can use this with cors in the backend
        const fields = new FormData();
        fields.append("userId", userId);
        fields.append("token", appContextInstance?.token ? appContextInstance.token : "");
    
        const result = await fetch(`http://localhost:4000/user/${userId}`, {
            method : "POST",
            body : fields
        });
    
        const data = await result.json();
    
        // Set the user details so 
        setUserDetails(data.user);
    };

    // Get the user details from the backend for the chat
    useEffect(() => {


        appContextInstance?.validateAuthentication();

        try{

            // Get the user information so we can share it in the post
            appContextInstance?.userId && getUserDetails(appContextInstance.userId);

        }catch(error){

            console.error(error);
        }

        // If the user isn't authenticated, redirect this route to the previous page
        appContextInstance?.userAuthenticated === false && navigate(`${BASENAME}/login`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[appContextInstance]);

    // Submit handler, this allows messages to be sent between clients
    const onSubmit = async (event : FormEvent) => {

        // Stop the page from reloading
        event.preventDefault();

        // If we have an input, send a message to the socket
        if (contentRef.current) {
            const chatMessage = contentRef.current.value;

            // Send the message to the websocket
            socketClientRef.current && socketClientRef.current.emit('chat message', chatMessage);

            // Reset our input after we've posted a new message to the chat
            contentRef.current.value = "";
        }
    };

    return(
        <section className="liveChat">
            <Form size="full" onSubmit={onSubmit}>
                
                <Title>Live Chat</Title>

                <Field position="bottom">
                    <TextArea
                        ariaLabelledBy="contentLabel"
                        error={false}
                        name="content"
                        placeholder="Please post your message in the chat"
                        square={true}
                        startingRows={3}
                        ref={contentRef}
                        required={true}
                    />
                    <Button variant="square">Send</Button>
                </Field>

            </Form>

            {chatMessages.map((message) => {
                return (
                    <div className="liveChat__message">

                        <p className="liveChat__description">
                            <span>{userDetails?.name}</span>
                            <span className="liveChat__date">{` ${message.date}`}</span>
                        </p>

                        <p className="liveChat__content">{message.message}</p>
                    </div>
                );
            })}
        </section>
    );
};

export default LiveChat;