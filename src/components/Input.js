import React from 'react';
import '../styles/Input.css';
import {IconButton} from "@material-ui/core";
import send from "../images/send-message.png"
const Input = ({message, setMessage, sendMessage}) => (
    <form className="form">
        <input className="input" placeholder="Type a message..."
               value={message}
               onChange={(event) => setMessage(event.target.value)}
               onKeyPress={event => event.key==='Enter' ? sendMessage(event) : null}
        />
        <IconButton className="sendButton" onClick={(event) => sendMessage(event)}>
            <img src={send} width="30" height="30" alt={"send"}/>
        </IconButton>
    </form>
)

export default Input;