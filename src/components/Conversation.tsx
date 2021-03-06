import React, { useState } from 'react';
import '../styles/conversation.css';
import starIcon from '../assets/star.svg';
import emptyStarIcon from '../assets/empty-star.svg';
import {Contact} from '../interfaces/Contact';

interface Props {
    contact: Contact;
    setConversationActive: (conversation: Contact) => void;
}

const Conversation: React.FC<Props> = ({contact, setConversationActive}) => {
    // Realistically I would handle the piece of state I created below differently. 
    // I would make an AJAX request to change the Contact's 'isFavorite' key in the database. 
    // This is a work around to handle the UI to change when the star is clicked to flag the message.
    const [isFavorite, setIsFavorite] = useState<Boolean>(contact.isFavorite);
    const [isActive, setIsActive] = useState<Boolean>(false);

    const toggleStar = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        setIsFavorite(prevValue => !prevValue);
    }

    const openConversation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsActive(true)
        setConversationActive(contact);
    }

    return (
        <div className={isActive ? "conversation conversation--active" : "conversation"} onClick={openConversation}>
            <div className="profile-picture">{`${contact.firstName[0]}${contact.lastName[0]}`}</div>
            <div>
                <h3>{contact.firstName} {contact.lastName}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
            </div>
            <div>
                <span>1h</span>
                {
                    isFavorite
                        ?
                        <img src={starIcon} alt="Favorite Star" onClick={toggleStar}/>
                        :
                        <img src={emptyStarIcon} alt="Not Favorite Star" onClick={toggleStar}/>
                }
            </div>
        </div>
    );
}

export default Conversation;
