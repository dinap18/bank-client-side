import React, { useEffect, useState } from 'react'
import { Button, Dialog, Grid, Paper, TextField, Typography, IconButton } from '@material-ui/core'
import io from 'socket.io-client'
import useUser from '../hooks/useUser'
import { makeStyles } from '@material-ui/core';
import {SendRounded} from '@material-ui/icons'

const useStyles = makeStyles({
    dialog: {
        height: 400
    }
})

export default function Chat(props) {

    const socket = io('http://localhost:8000')

    const [messages, setMessages] = useState([
        'We hope you enjoy our banking services and our unique currency: LevCoin',
        'How can we help you today?'
    ])

    useEffect(() => {
        socket.on('Message', (data) => {
            console.log(data);
        })
    })

    const classes = useStyles();

    return (

        <Dialog open={true}  classes={{
            paper: classes.dialog
        }}>
            <Paper style={{height: 400, width: 300, padding: 10, overflow: 'auto'}}>
                <Grid container spacing={2} direction='column' style={{width: '100%'}}>
                    {
                        messages.map(message => (
                            <Grid item xs={12}>
                                <Typography>
                                    {message}
                                </Typography>
                            </Grid>
                        ))
                    }
                </Grid>
            </Paper>
            <Grid conainer>
                <Grid item xs={9}>
                    <TextField
                        style={{bottom: 10, position: 'absolute'}}

                        variant='outlined'
                    ></TextField>
                </Grid>

                <Grid item xs={3}>
                    <IconButton
                        style={{bottom: 10, position: 'absolute',  marginBottom: 8}}
                        color="primary"
                        onClick={() => socket.emit('Message',{data: "hello"})}
                    ><SendRounded/></IconButton>
                </Grid>

            </Grid>


        </Dialog>
    )
}