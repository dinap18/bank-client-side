import React, {useState} from 'react'
import {AppBar, Toolbar, IconButton, Typography, Button, makeStyles} from '@material-ui/core'
import {AccountCircleOutlined, ChatOutlined, BookOutlined, AttachMoney} from '@material-ui/icons'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        color: theme.palette.secondary.main
    }
}))

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function Navbar(props) {
    const classes = useStyles()
    const history = useHistory()


    return (
        <div>
            <AppBar position='relative'>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="menu"
                                onClick={props.showLogin}>
                        <AttachMoney/>
                    </IconButton>
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
                            props.user
                                ? `${props.user.firstName} ${props.user.lastName}`
                                : 'Not signed in'

                        }
                    </Typography>

                    {
                        props.user ?
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