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
import ScrollableTabsButtonForce from "../components/TabPanel";
import ScrollableTabsButtonPrevent from "../components/TabPanel";
import ScrollableTabsButtonAuto from "../components/TabPanel";
import FullWidthTabs from "../components/TabPanel";



export default function AccountActions(props) {
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
              <FullWidthTabs/>
        </Container>
    )
}