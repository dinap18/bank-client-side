import API from '../api'
import ErrorDialog from '../components/ErrorDialog'
import SuccessDialog from '../components/SuccessDialog'
import {makeStyles} from '@material-ui/core/styles'
import React, {useState} from 'react'
import {
    Container, TextField, Typography, Grid, Button, Paper, Tabs, Tab, Select, MenuItem
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import bank from "../images/sign-up.png";


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


export default function Signup(props) {
    const classes = useStyles()
    const history = useHistory()

    const initialDialogState = {
        open: false,
        header: '',
        message: ''
    }

    const [errorDialog, setErrorDialog] = useState(initialDialogState)
    const [successDialog, setSuccessDialog] = useState(initialDialogState)

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phoneNumber: '',
        password: '',
        userType: "user",
        accountBalance: 0,
        accountCurrency: "USD",
    })

    // update line so update the details local
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
        await API.signup({
            ...userDetails,
        })


        return setSuccessDialog({
            open: true,
            header: "Welcome to Chain Bucks!",
            message: "You have successfully signed up for Chain Bucks banking services"
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
                <img src={bank} width="50" height="50"/>
                <Typography component='h1' variant='h5'>
                    Fill out your Details
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
                                variant='outlined'
                                fullWidth
                                label='Phone Number'
                                autoFocus
                                inputProps={{maxLength: 10}}
                                value={userDetails.phoneNumber}
                                onChange={event => inputChanged('phoneNumber', event.target.value)}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="email"
                                label="Email"
                                id="email"
                                value={userDetails.email}
                                onChange={event => inputChanged('email', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="username"
                                label="Choose a Username"
                                id="username"
                                value={userDetails.username}
                                onChange={event => inputChanged('username', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Choose a Password"
                                id="password"
                                value={userDetails.password}
                                onChange={event => inputChanged('password', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="accountBalance"
                                label="How much money would you like to deposit?"
                                type="accountBalance"
                                id="accountBalance"
                                value={userDetails.accountBalance}
                                onChange={event => inputChanged('accountBalance', event.target.value)}
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
                                <MenuItem value={"LEVCOIN"}
                                          onClick={() => inputChanged('accountCurrency', 'LEVCOIN')}>LevCoin</MenuItem>
                                <MenuItem value={"ILS"}
                                          onClick={() => inputChanged('accountCurrency', 'ILS')}>ILS</MenuItem>
                            </Select>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container justifyContent='center'>
                                <Tabs value={userDetails.userType === 'admin' ? 1 : 0} centered>
                                    <Tab label="I'm a User" onClick={() => inputChanged('userType', 'user')}
                                         className={classes.tab}>

                                    </Tab>
                                    <Tab label="I'm an Admin" onClick={() => inputChanged('userType', 'admin')}
                                         className={classes.tab}>

                                    </Tab>

                                </Tabs>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button
                        onClick={signup}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}