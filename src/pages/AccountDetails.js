import API from '../api'
import ErrorDialog from '../components/ErrorDialog'
import SuccessDialog from '../components/SuccessDialog'
import {makeStyles} from '@material-ui/core/styles'
import React, {useState} from 'react'
import {
    Container, TextField, Typography, Grid, Button, Paper, Tabs, Tab, Select, MenuItem
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Stack} from "@mui/material";
import useUser from "../hooks/useUser";
import useToken from "../hooks/useToken";
import resume from "../images/resume.png";

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


export default function AccountDetails(props) {
    const classes = useStyles()
    const history = useHistory()
    const {user} = useUser()
    const {token} = useToken()

    const initialDialogState = {
        open: false,
        header: '',
        message: ''
    }

    const [errorDialog, setErrorDialog] = useState(initialDialogState)
    const [successDialog, setSuccessDialog] = useState(initialDialogState)

    const [userDetails, setUserDetails] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        accountBalance: user.accountBalance,
        accountCurrency: user.accountCurrency,
        email: user.email,
        phoneNumber: user.phoneNumber,
        userType: user.userType,
        username: user.username,
        password: user.password,
        _id: user._id
    })

    const inputChanged = (key, value) => {
        setUserDetails(state => ({
            ...state,
            [key]: value
        }))
    }

    const signup = async () => {

        if (Object.values(userDetails).some(val => val === '')) {
            return setErrorDialog({
                open: true,
                header: "Forgot Something?",
                message: 'Please fill out all of the fields'
            })
        }

        console.log("here")
        await API.updateUser({
            ...userDetails,
        })

        return setSuccessDialog({
            open: true,
            header: "Details updated successfully",
            message: `You have successfully updated your details`
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
                <img src={resume} width="50" height="50"/>
                <Typography component='h1' variant='h5'>
                    User Details
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                fullWidth
                                label='First Name'
                                autoFocus
                                value={userDetails.firstName}
                                onChange={event => inputChanged('firstName', event.target.value)}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant='outlined'
                                margin='normal'
                                fullWidth
                                label='Last Name'
                                autoFocus
                                value={userDetails.lastName}
                                onChange={event => inputChanged('lastName', event.target.value)}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="email"
                                label="Email"
                                type="email"
                                id="email"
                                value={userDetails.email}
                                onChange={event => inputChanged('email', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="phoneNumber"
                                label="Phone Number"
                                type="phoneNumber"
                                id="phoneNumber"
                                value={userDetails.phoneNumber}
                                onChange={event => inputChanged('phoneNumber', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="accountBalance"
                                label="Account Balance"
                                type="accountBalance"
                                id="accountBalance"
                                value={user.accountBalance}
                                onChange={event => inputChanged('accountBalance', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="accountCurrency"
                                label="Account Currency"
                                type="accountCurrency"
                                id="accountCurrency"
                                value={user.accountCurrency}
                                onChange={event => inputChanged('accountCurrency', event.target.value)}
                            />
                        </Grid>


                    </Grid>
                    <Button
                        onClick={signup}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Update Details
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}