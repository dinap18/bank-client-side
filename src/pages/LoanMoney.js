import API from '../api'
import ErrorDialog from '../components/ErrorDialog'
import SuccessDialog from '../components/SuccessDialog'
import {makeStyles} from '@material-ui/core/styles'
import React, {useState} from 'react'
import {
    Container, TextField, Typography, Grid, Button, Paper, Select, MenuItem
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Stack} from "@mui/material";
import useUser from "../hooks/useUser";
import salary from "../images/salary.png";

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


export default function LoanMoney(props) {
    const classes = useStyles()
    const history = useHistory()
    const {user} = useUser()

    const initialDialogState = {
        open: false,
        header: '',
        message: ''
    }

    const [errorDialog, setErrorDialog] = useState(initialDialogState)
    const [successDialog, setSuccessDialog] = useState(initialDialogState)

    const [userDetails, setUserDetails] = useState({
        to: '',
        from: user.username,
        value: '',
        date: new Date(),
    })

    const inputChanged = (key, value) => {
        setUserDetails(state => ({
            ...state,
            [key]: value
        }))
    }

    // call to axios that are asynchroni too
    const signup = async () => {

        if (Object.values(userDetails).some(val => val === '')) {
            return setErrorDialog({
                open: true,
                header: "Forgot Something?",
                message: 'Please fill out all of the fields'
            })
        }

        console.log("here")
        await API.loan({
            ...userDetails,
        })


        return setSuccessDialog({
            open: true,
            header: "Loan sent successfully!",
            message: `You have successfully sent a loan to ${userDetails.to}`
        })
    }

    return (
        <Container component='main' maxWidth='sm'>
            <ErrorDialog
                open={errorDialog.open}
                error={errorDialog.message}
                header={errorDialog.header}
                close={() => setErrorDialog({open: false, header: '', message: ''})}
            />
            <SuccessDialog
                open={successDialog.open}
                message={successDialog.message}
                header={successDialog.header}
                close={() => {
                    setSuccessDialog({open: false, header: '', message: ''})
                    history.push('/')
                }}
            />
            <Paper className={classes.paper}>
                <img src={salary} width="50" height="50"/>
                <Typography component='h1' variant='h5'>
                    Loan Money
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                fullWidth
                                label='Who is receiving the money?'
                                autoFocus
                                value={userDetails.to}
                                onChange={event => inputChanged('to', event.target.value)}
                            >
                            </TextField>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="value"
                                label="How much money would you like to loan?"
                                type="value"
                                id="value"
                                value={userDetails.value}
                                onChange={event => inputChanged('value', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Select
                                variant="outlined"
                                fullWidth
                                name="accountCurrency"
                                label="Account Currency"
                                type="accountCurrency"
                                id="accountCurrency"
                                value={userDetails.accountCurrency}
                            >
                                <MenuItem value={"USD"}
                                          onClick={() => inputChanged('accountCurrency', 'USD')}>USD</MenuItem>
                                <MenuItem value={"ILS"}
                                          onClick={() => inputChanged('accountCurrency', 'ILS')}>ILS</MenuItem>
                                <MenuItem value={"LEVCOIN"}
                                          onClick={() => inputChanged('accountCurrency', 'LEVCOIN')}>LevCoin</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="What day should the money be loaned?"
                                        inputFormat="MM/dd/yyyy"
                                        value={userDetails.date}
                                        onChange={event => {
                                            inputChanged('date', event)
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>

                    </Grid>
                    <Button
                        onClick={signup}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}

                    >
                        Send Loan
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}