import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useUser from "../hooks/useUser";
import api from "../api";

const _ = require("lodash");

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    console.log(row)
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Loan Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>To</TableCell>
                                        <TableCell align="left">From</TableCell>
                                        <TableCell align="left">Amount ($)</TableCell>
                                        <TableCell align="left">Payed Back ($)</TableCell>
                                        <TableCell align="right">Money Sent</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {_.map(row, historyRow => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {Date(historyRow.date)}
                                            </TableCell>
                                            <TableCell>{historyRow.to}</TableCell>
                                            <TableCell align="left">{historyRow.from}</TableCell>
                                            <TableCell align="left">
                                                {historyRow.value}
                                            </TableCell>
                                            <TableCell align="left">
                                            {historyRow.payedBack}
                                        </TableCell>
                                            <TableCell align="right">
                                                {historyRow.moneySent}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function LoanTable() {
    const {user, setUser} = useUser()
    const [data, setData] = useState([])
    const [fromData, setFromData] = useState([])

    // call to the server (api - axios: can do request http)
    useEffect(() => {
        api.getLoansTo(user.username).then(res => setData(res));
        api.getLoansFrom(user.username).then(res => setFromData(res))
    }, [])

    return (
        <TableContainer>
            <Table aria-label="collapsible table">
                <TableHead>
                </TableHead>
                <TableBody>
                    <Row name={"Received Loans"} row={data}/>
                    <Row name={"Sent Loans"} row={fromData}/>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
