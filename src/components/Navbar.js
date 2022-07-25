import React, {useEffect, useReducer, useState} from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    makeStyles,
    List,
    ListItem,
    ListItemText, Menu, MenuItem
} from '@material-ui/core'
import {AccountCircleOutlined, ChatOutlined, BookOutlined, AttachMoney} from '@material-ui/icons'
import {useHistory} from 'react-router-dom'
import bank from "../images/cryptocurrencies.png";
import DefaultNavbarDropdown from "./DefaultNavbarDropdown";
import AccountMenu from "./DropdownMenu";
import CustomizedMenus from "./DropdownMenu";
import useUser from "../hooks/useUser";
import useForceUpdate from 'use-force-update';
import useUserData from "../hooks/useUserData";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.secondary.main
    }
}))

function getProfileData() {
    return JSON.parse(localStorage.getItem('user'));
}

export default function Navbar(props) {
    const classes = useStyles()
    const history = useHistory()
    const user = useUserData()
    const forceUpdate = useForceUpdate();





    return (
        <div>
            <AppBar position='relative'>
                <Toolbar>
                    <CustomizedMenus/>

                    <Typography onClick={() => history.push('/home')}
                                variant="h6"
                                style={{
                                    fontFamily: 'Helvetica',
                                    flexGrow: 1
                                }}
                    > Chain Bucks
                    </Typography>
                    <IconButton color="inherit" onClick={() => history.push('/account')}>
                        <AccountCircleOutlined/>
                    </IconButton>
                    <Typography style={{marginLeft: 15, color: 'whiteSmoke'}}>
                        {
                            user
                                ? `${user.firstName} ${user.lastName}`
                                : 'Not signed in'

                        }
                    </Typography>

                    {
                        user ?
                            <div>
                                <IconButton aria-label="show 4 new mails" color="inherit"
                                            onClick={() => history.push('/chat')}>
                                    <ChatOutlined/>
                                </IconButton>
                            </div>
                            : <div/>
                    }

                    <Button style={{marginRignt: 20, color: 'whitesmoke'}} onClick={() => {
                        localStorage.clear()
                        history.push('/')
                        window.location.reload()
                    }}>Log out</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}