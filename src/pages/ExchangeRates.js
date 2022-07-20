import API from '../api'
import {makeStyles} from '@material-ui/core/styles'
import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {
    Container, Paper, Typography,
} from '@material-ui/core'
import useToken from '../hooks/useToken'
import useUser from '../hooks/useUser'
import bank from "../images/exchange-rate.png";
import dollar from "../images/dollar.png";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import api from "../api";

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


export default function ExchangeRates(props) {
    const classes = useStyles()
    const history = useHistory()
    const {token} = useToken()
    const {user} = useUser()
    const [dollarToLevCoin,setDollarToLevCoin] = useState(0)
    const [shekelToLevCoin,setShekelToLevCoin] = useState(0)

    useEffect(()=>{
        api.getDollarToLevCoin().then(res=>setDollarToLevCoin(res));
        api.getShekelToLevCoin().then(res=>setShekelToLevCoin(res));
    },[])

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper}>
                <img src={bank} width="50" height="50"/>
                <Typography component='h1' variant='h5' style={{
                    fontFamily: 'BlinkMacSystemFont'
                }}>
                    Current Exchange Rates
                </Typography>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemIcon>
                            <img src={dollar} width="30" height="30"/>
                        </ListItemIcon>
                        <ListItemText>Dollar to LevCoin Rate: {dollarToLevCoin}</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <img src={dollar} width="30" height="30"/>
                        </ListItemIcon>
                        <ListItemText>Shekel to LevCoin Rate: {shekelToLevCoin}</ListItemText>
                    </ListItem>
                </List>
            </Paper>
        </Container>
    )
}