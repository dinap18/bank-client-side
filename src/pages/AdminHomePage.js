import { makeStyles }       from '@material-ui/core/styles'
import React, { useState }  from 'react'
import { useHistory } from 'react-router-dom'
import {
    Container,Paper, Typography, List, ListItem
} from '@material-ui/core'
import useToken from '../hooks/useToken'
import profile from '../images/profile.png'

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


export default function AdminHomePage(props) {
    const classes = useStyles()
    const history = useHistory()
    const { token } = useToken()


    const [errorDialog, setErrorDialog] = useState({
        open: false,
        header: '',
        message: ''
    })

    let image = require("../images/bank.png")

    return(
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper}>
                <img src={profile} width="50" height="50"/>
           <Typography>
               Welcome to Chain Bucks, as an admin you have permission to do the following:
           </Typography>
             <List>
                 <ListItem>
                     Approve new accounts
                 </ListItem>
                 <ListItem>
                     Chat with users
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