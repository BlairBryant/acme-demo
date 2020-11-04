import React, { FormEvent, useState } from 'react';
import '../styles/conversationsBar.css';
import searchIcon from '../assets/magnifying-glass.svg';
import chatIcon from '../assets/chat.svg';
import data from '../data/MOCK_DATA.json';
import Conversation from './Conversation';
import { Contact } from '../interfaces/Contact';

interface Props {
    setConversationActive: (conversation: Contact) => void;
}

const ConversationsBar: React.FC<Props> = ({setConversationActive}) => {
    const [search, setSearch] = useState<String>("");
    const [contactList, setContactList] = useState<Contact[]>(data)

    //Would normally set contactList using useEffect() hook with an http.get request.

    const submitSearch = (e: FormEvent) => {
        e.preventDefault();
        if (search) {
            // Built the search functionality below to not only find contacts with an exact match.
            // A partial search such as 'kir' would find contacts such as 'Kirby', 'Kirsten', and 'Al Kirkbride'.
            // Would use Regular Expressions to handle more complex search functionality on the frontend, 
            // but usually filtering is done on the backend so the below would normally be an AJAX request passing the search value to the backend.
            const filteredSearchResults: Contact[] = contactList.filter(contact => {
                const fullName = `${contact.firstName} ${contact.lastName}`;
                return fullName.toLowerCase().includes(search.toLowerCase());
            })
            setContactList(filteredSearchResults);
        } else {
            // Added this code to reset the list of contacts shown if an empty search is made,
            // providing an additional way to the filtering select field below the search bar to
            // go back to the default state of the page.
            setContactList(data);
        }
    }

    const filterConversations = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "all") {
            setContactList(data);
        } else if (e.target.value === "favorite") {
            const filteredByIsFavorite: Contact[] = data.filter(contact => contact.isFavorite);
            setContactList(filteredByIsFavorite);
        }
    }

    return (
        <div className="conversations-bar">
            <div className="conversations-bar__top">
                <div className="row justify-between">
                    <form onSubmit={submitSearch}>
                        <div className="search-container">
                            <img src={searchIcon} alt="Search Icon" className="search-icon" onClick={submitSearch}/>
                            <input type="text"
                                className="search-bar"
                                placeholder="Search or a new chat..."
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                    </form>
                    <button className="new-conversation">
                        <img src={chatIcon} alt="Chat Icon" className="chat-icon" />
                    </button>
                </div>
                <div className="row justify-between">
                    {/* Styling the built in select field has a lot of limitations 
                    so if I needed to style this I would create a custom select field utility
                    that doesn't use the HTML select element but did not do so here because it 
                    is out of the scope of what needs to be provided. */}
                    <select className="filter-conversations" onChange={filterConversations}>
                        <option value="all">All conversations</option>
                        <option value="favorite">Favorites</option>
                    </select>
                    <button className="btn--follow-up">Follow Up</button>
                </div>
            </div>
            <div className="conversations-container">
                {
                    contactList.map((chat, i) => {
                        return <Conversation key={chat.id} contact={chat} setConversationActive={setConversationActive}/>
                    })
                }
            </div>
        </div>
    );
}

export default ConversationsBar;
