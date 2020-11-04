import React, { FormEvent, useEffect, useRef, useState } from 'react';
import '../styles/displayConversation.css';
import { Contact, Message } from '../interfaces/Contact';
import EditContactBar from './EditContactBar';
import allMessages from '../data/MESSAGES.json';

interface Props {
    activeContact: Contact | null;
}

const DisplayConversation: React.FC<Props> = ({ activeContact }) => {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [newMessage, setNewMessage] = useState<string>("");
    const messageInput = useRef<HTMLInputElement>(null);
    // Would use useEffect() to get messages from the database sorted by timestamps to handle what order the messages should be shown in.
    // For simplicity's sake here I just added a numerical order key to each message.

    useEffect(() => {
        const filteredMessages: Message[] = allMessages.filter(message => {
            if (activeContact) {
                return message.reciever_id === activeContact.id || message.sender_id === activeContact.id;
            }
            return false;
        })
        setMessages(filteredMessages);
    }, [activeContact])

    const submitMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newMessageObj: Message = {
            id: allMessages[allMessages.length - 1].id + 1,
            sender_id: 0,
            reciever_id: activeContact ? activeContact.id : -1,
            message: newMessage,
            order: messages && messages.length ? messages[messages.length - 1].order + 1 : -1
        }
        if (messageInput.current) messageInput.current.value = "";
        setNewMessage("");
        // Would realistically make an http.post request here instead of assigning id's and order on the frontend, 
        // then add the newly created message returned from the server to the messages array below.
        setMessages(prevValue => prevValue ? [...prevValue, newMessageObj] : null);
    }

    return (
        <div className={activeContact ? "display-conversation" : "display-conversation--empty"}>
            {
                activeContact
                    ?
                    <div>
                        <div className="display-conversation__header row">
                            <div className="profile-picture">{`${activeContact.firstName[0]}${activeContact.lastName[0]}`}</div>
                            <h3>{`${activeContact.firstName} ${activeContact.lastName}`}</h3>
                        </div>
                        <div className="display-conversation__body">
                            {
                                messages
                                    ?
                                    messages.map(message => (
                                        <div key={message.id} className="message__container">
                                            {
                                                message.sender_id === activeContact.id
                                                    ?
                                                    <div>
                                                        <div className="profile-picture">{`${activeContact.firstName[0]}${activeContact.lastName[0]}`}</div>
                                                        <p className="message">{message.message}</p>
                                                    </div>
                                                    :
                                                    <div>
                                                        <div className="profile-picture profile-picture--right">AC</div>
                                                        <p className="message message--right">{message.message}</p>
                                                    </div>
                                            }
                                        </div>
                                    ))
                                    :
                                    null
                            }
                            <div className="display-conversation__footer">
                                <form onSubmit={submitMessage}>
                                    <input type="text" ref={messageInput} onChange={e => setNewMessage(e.target.value)} />
                                </form>
                            </div>
                        </div>
                        <EditContactBar activeContact={activeContact} />
                    </div>
                    :
                    <div className="no-active-conversation">
                        <h2>Select a conversation</h2>
                        <p>Start by selecting a conversation or searching for someone specific</p>
                    </div>
            }
        </div>
    );
}

export default DisplayConversation;
