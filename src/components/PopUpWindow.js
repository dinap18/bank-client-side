import React, { useEffect} from "react";
import io from "socket.io-client";
import addNotification, {Notifications} from 'react-push-notification';
import useUser from "../hooks/useUser";

const PopUpWindow = ({location}) => {
    const { user } = useUser()
    const ENDPOINT = 'http://localhost:8000/';
    const socket = io(ENDPOINT);


    useEffect(() => {
        socket.on('mongoStream', data => {
                if (user.userType == "admin") {
                    addNotification({
                        title: 'Warning',
                        subtitle: 'Please check this out',
                        message: `${data.fullDocument.firstName} ${data.fullDocument.lastName}'s account balance is negative`,
                        theme: 'red',
                        duration: 5000,
                        closeButton: "X",
                    })
                }
            }
        )
    }, []);


    return (
        <Notifications/>
    );
}

export default PopUpWindow;