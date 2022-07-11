import React from 'react';
import '../styles/InfoBar.css';

const InfoBar = ({room}) => (
    <div className="infoBar" align={"center"}>
        <div className="centerInnerContainer">
            <h3 style={{
                fontFamily: 'Helvetica',
                flexGrow: 1
            }}>Chat with our Virtual Banker</h3>
        </div>
    </div>
)

export default InfoBar;