import React from 'react';
import './styles/app.css';
import './styles/utilities.css';
import ConversationsBar from './components/ConversationsBar';
import DisplayConversation from './components/DisplayConversation';

const App: React.FC = () => {
  return (
    <div className="app">
      <ConversationsBar />
      <DisplayConversation />
    </div>
  );
}

export default App;
