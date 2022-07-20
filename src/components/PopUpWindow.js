import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Redirect } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const createNotification = (type) => {
    return () => {
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('Success message', 'Title here');
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'error':
                NotificationManager.error('Error message', 'Click me!', 5000, () => {
                    alert('callback');
                });
                break;
        }
    };
}

const PopUpWindow = ({ location }) => {
    const [flag, setFlag]=useState(false);
    const ENDPOINT = 'http://localhost:8000/';
    const socket = io(ENDPOINT);


    useEffect(() => {
        socket.on('mongoStream',data=>{
            setFlag(true);
            createNotification('error')
            console.log(data)
        });
    }, []);



    return (
       <></>
    );
}

export default PopUpWindow;