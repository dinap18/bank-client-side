import React from 'react';
import '../styles/Messages.css';
import Message from '../components/Message';

import ScrollToBottom from 'react-scroll-to-bottom';

const Messages = ({messages, name}) => (
    <ScrollToBottom className="messages" >
        {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
)

export default Messages;