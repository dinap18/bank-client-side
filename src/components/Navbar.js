import React from 'react'
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    makeStyles,
} from '@material-ui/core'
import {AccountCircleOutlined, ChatOutlined} from '@material-ui/icons'
import {useHistory} from 'react-router-dom'
import bank from "../images/cryptocurrencies.png";
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