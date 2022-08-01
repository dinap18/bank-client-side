import {makeStyles} from '@material-ui/core/styles'
import React, {useEffect, useState} from 'react'
import {Paper, Typography, IconButton, TextField} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from "../api";
import _ from "lodash";
import send from "../images/send.png";
import payment from "../images/payment-method.png";
import useUserData from "../hooks/useUserData";

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

export default function PayBackLoans(props) {
    const classes = useStyles()
    const user = useUserData()
    const [data, setData] = useState([])

    useEffect(() => {
        api.getLoansTo(user.username).then(res => {
            setData(_.filter(res, x => x.payedBack < x.value && x.moneySent === true));
        });

    }, [])

    const handleApprove = async (row) => {
        api.getLoanById(row._id).then(async oldLoan => {
            if (oldLoan.payedBack !== row.payedBack) {
                await api.payBackLoan(row).then(await api.getLoansTo(row._id)).then(res => {
                    setData(_.filter(res, x => x.payedBack < x.value && x.moneySent === true));
                })
            }
        })
    }

    return (data !== [] &&
        <TableContainer component='main' maxWidth='sm'>
            <Paper className={classes.paper}>
                <img src={payment} width="50" height="50"/>
                <Typography component='h1' variant='h5'>
                    Pay Back Loans
                </Typography>
                <br/>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Loan Received On</TableCell>
                            <TableCell align="left">From</TableCell>
                            <TableCell align="left">Amount</TableCell>
                            <TableCell align="left">Amount Payed Back</TableCell>
                            <TableCell align="right"/>
                            <TableCell align="right"/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(data, row => (
                            <TableRow>
                                <TableCell align="left">{Date(row.date)}</TableCell>
                                <TableCell align="left">{row.from}</TableCell>
                                <TableCell align="left">{row.value}</TableCell>
                                <TableCell align="left">{row.payedBack}</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        variant="outlined"
                                        InputProps={{
                                            inputProps: {
                                                disableUnderline: true,
                                                type: 'number',
                                                min: 0,
                                                max: row.value
                                            }
                                        }}
                                            autoFocus
                                            defaultValue={0}
                                            onChange={event => row.payedBack = parseInt(row.payedBack) + parseInt(event.target.value)}>
                                            </TextField></TableCell>
                                            <TableCell align="right">
                                            <IconButton aria-controls="customized-menu"
                                            aria-haspopup="true"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleApprove(row)}>
                                            <img src={send} width="40" height="40" alt={"bank"}/>
                                            </IconButton>
                                            </TableCell>
                                            </TableRow>
                                            ))}
                                </TableBody>
                            </Table>
                            </Paper>
                            </TableContainer>
                            )
                        }