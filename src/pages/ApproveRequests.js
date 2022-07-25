import {makeStyles} from '@material-ui/core/styles'
import React, {useEffect, useState} from 'react'
import {Paper, Typography, IconButton, TextField, Select, MenuItem} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from "../api";
import _ from "lodash";
import approved from "../images/approved.png";
import denied from "../images/denied.png";
import judge from "../images/judge.png";

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

export default function ApproveRequests(props) {
    const classes = useStyles()
    const [data, setData] = useState([])

    useEffect(() => {
        api.getAccountsToApprove().then(res => {
            setData(res);
            console.log(data)
        });

    }, [])

    const handleApprove = async (row) => {
        api.getUserById(row.user.id).then(async oldUser => {
            if (oldUser.accountBalance !== row.user.accountBalance || oldUser.accountCurrency !== row.user.accountCurrency) {
                await api.updateUser(row.user);
            }
        })
        await api.deleteEmail(row.id).then(res => setData(_.filter(data, x => x.id
        !==row.id
    )))
    }
    const handleDeny = async (row) => {
        await api.deleteUser(row.user._id);
        await api.deleteEmail(row.id).then(() => setData(_.filter(data, x => x.id
            !== row.id
        )))
    }

    return (data !== [] &&
        <TableContainer component='main' maxWidth='sm'>
            <Paper className={classes.paper}>
                <img src={judge} width="50" height="50"/>
                <Typography component='h1' variant='h5'>
                    Approve Requests to Open New Accounts
                </Typography>
                <br/>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Request Received On</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Account Balance</TableCell>
                            <TableCell align="left">Currency</TableCell>
                            <TableCell align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(data, row => (
                            <TableRow>
                                <TableCell align="left">{row.date}</TableCell>
                                <TableCell align="left">{row.user.firstName} {row.user.lastName}</TableCell>
                                <TableCell align="left">{row.user.email}</TableCell>
                                <TableCell align="left">
                                    <TextField
                                        variant="outlined"
                                        InputProps={{disableUnderline: true}}
                                        autoFocus
                                        defaultValue={row.user.accountBalance}
                                        onChange={event => row.user.accountBalance = event.target.value}>
                                    </TextField></TableCell>
                                <TableCell>
                                    <Select
                                        variant="outlined"
                                        fullWidth
                                        defaultValue={row.user.accountCurrency}
                                    >
                                        <MenuItem value={"USD"}
                                                  onClick={() => row.user.accountCurrency = "USD"}>USD</MenuItem>
                                        <MenuItem value={"LEVCOIN"}
                                                  onClick={() => row.user.accountCurrency = "LEVCOIN"}>LevCoin</MenuItem>
                                        <MenuItem value={"ILS"}
                                                  onClick={() => row.user.accountCurrency = "ILS"}>ILS</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell align="right">
                                    <>
                                        <IconButton aria-controls="customized-menu"
                                                    aria-haspopup="true"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleApprove(row)}>
                                            <img src={approved} width="40" height="40" alt={"bank"}/>
                                        </IconButton>
                                        <IconButton aria-controls="customized-menu"
                                                    aria-haspopup="true"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleDeny(row)}>
                                            <img src={denied} width="40" height="40" alt={"bank"}/>
                                        </IconButton>
                                    </>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </TableContainer>
    )
}