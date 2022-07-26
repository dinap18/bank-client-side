import { makeStyles }       from '@material-ui/core/styles'
import React, { useState }  from 'react'
import {useHistory } from 'react-router-dom'
import {
    Container,Typography,
} from '@material-ui/core'
import FullWidthTabs from "../components/TabPanel";
import historyImg from "../images/history.png";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
        opacity: '100%'
    },
    submit: {
        marginTop: theme.spacing(3),
    },
    tab: {
        minWidth: 90
    }
}))


export default function AccountActions(props) {
    const history = useHistory()
    const classes = useStyles()

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        header: '',
        message: ''
    })

    let image = require("../images/bank.png")

    return(
        <Container component='main' maxWidth='xs'>
            <br/>
            <div style={{ display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'}}>
                <img src={historyImg} width="50" height="50"/>
                <Typography component='h1' variant='h5'>
                    Account History
                </Typography>
            </div>
                <br/>
              <FullWidthTabs/>
        </Container>
    )
}