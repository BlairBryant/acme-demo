import React from 'react';
import '../styles/editContactBar.css';
import { Contact } from '../interfaces/Contact';

interface Props {
    activeContact: Contact | null;
}

const EditContactBar: React.FC<Props> = ({ activeContact }) => {
    return (
        <div className="edit-contact-bar">
            {
                activeContact
                    ?
                    <div>
                        <div className="profile-picture">{`${activeContact.firstName[0]}${activeContact.lastName[0]}`}</div>
                        <h3>{`${activeContact.firstName} ${activeContact.lastName}`}</h3>
                        <h4>{activeContact.email}</h4>
                        <span>Edit contact info here</span>
                    </div>
                    :
                    null
            }
        </div>
    );
}

export default EditContactBar;
