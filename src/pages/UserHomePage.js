import API                  from '../api'
import ErrorDialog          from '../components/ErrorDialog'
import { makeStyles }       from '@material-ui/core/styles'
import { LockOutlined }     from '@material-ui/icons'
import React, { useState }  from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import {
    Avatar, Container, Grid, Button, Paper, TextField, Typography, List, ListItem
} from '@material-ui/core'
import useToken from '../hooks/useToken'
import useUser from '../hooks/useUser'
import man from "../images/man.png";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(6),
        opacity: '98%'
    },
    avatar: {
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))


export default function UserHomePage(props) {
    const classes = useStyles()
    const history = useHistory()
    const { token } = useToken()
    const { user } = useUser()

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        header: '',
        message: ''
    })

    let image = require("../images/bank.png")

    return(
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper}>
                <img src={man} width="50" height="50"/>
                <Typography>
                    Welcome to Chain Bucks, as a user you have permission to do the following:
                </Typography>
                <List>
                    <ListItem>
                        View account details and balance
                    </ListItem>
                    <ListItem>
                        Chat with admins
                    </ListItem>
                    <ListItem>
                        Transfer money
                    </ListItem>
                    <ListItem>
                        Loan money
                    </ListItem>
                    <ListItem>
                        View banking history
                    </ListItem>
                </List>
            </Paper>
        </Container>
    )
}