import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    makeStyles,
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import bank from "../images/cryptocurrencies.png";
import chat from "../images/chat.png";
import userr from "../images/user-profile.png";
import CustomizedMenus from "./DropdownMenu";
import useUserData from "../hooks/useUserData";

export default function Navbar(props) {
    const history = useHistory()
    const user = useUserData()

    return (
        <div>
            <AppBar position='relative'>
                <Toolbar>
                    {
                        user ?
                            <CustomizedMenus/> : <><img src={bank} height="40" width="40"/>
                                {"   "}</>
                    }
                    {
                        user ?

                            <Typography onClick={() => history.push('/home')}
                                        variant="h6"
                                        style={{
                                            fontFamily: 'Helvetica',
                                            flexGrow: 1
                                        }}
                            > Chain Bucks
                            </Typography> :
                            <Typography
                        variant="h6"
                        style={{
                        fontFamily: 'Helvetica',
                        flexGrow: 1
                    }}
                        > Chain Bucks
                        </Typography>
                    }
                    {
                        user ? // check if its connected
                            <>
                                <IconButton color="inherit" onClick={() => history.push('/account')}>
                                    <img src={userr} width="25" height="25"/>
                                </IconButton>
                            </>
                            : <></>
                    }
                    <Typography style={{ color: 'whiteSmoke'}}>
                        {
                            user
                                ? `${user.firstName} ${user.lastName}`
                                : 'Not signed in' // si pas connecter alors n'affiche pas car n'existe pas

                        }
                    </Typography>

                    {
                        user ?
                            <div>
                                <IconButton aria-label="show 4 new mails" color="inherit"
                                            onClick={() => history.push('/chat')}>
                                    <img src={chat} width="25" height="25"/>
                                </IconButton>
                            </div>
                            : <div/>
                    }
                    {
                        user ?

                            <Button style={{marginRignt: 20, color: 'whitesmoke'}} onClick={() => {
                                localStorage.clear()
                                history.push('/')
                                window.location.reload()
                            }}>Log out</Button> : ''
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}