import React, { useState } from 'react';
import './styles/app.css';
import './styles/utilities.css';
import ConversationsBar from './components/ConversationsBar';
import DisplayConversation from './components/DisplayConversation';
import { Contact } from './interfaces/Contact';

const App: React.FC = () => {
	const [activeContact, setActiveContact] = useState<Contact | null>(null);

	const setConversationActive = (conversation: Contact) => {
		setActiveContact(conversation);
	}

	return (
		<div className="app">
			<ConversationsBar setConversationActive={setConversationActive}/>
			<DisplayConversation activeContact={activeContact}/>
		</div>
	);
}

export default App;
