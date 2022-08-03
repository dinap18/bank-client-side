import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { Redirect } from 'react-router-dom';
import Messages from '../components/Messages';
import InfoBar from '../components/InfoBar';
import Input from '../components/Input';

import '../styles/Chat.css';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [flag, setFlag]=useState(0);
    const ENDPOINT = 'http://localhost:8000/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setRoom('          Chat with an admin');
        setName('user')

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                setFlag(1);
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    // 3 messages from start
    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    if (flag){
        return (
            <Redirect to="/" />
        )
    }

    return (
        <div className="outerContainer"  style={{
            backgroundColor: '#F4F5F7' ,
            maxWidth: 'xl'
        }}>
            <div className="container" >
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;