import API from '../api'
import ErrorDialog from '../components/ErrorDialog'
import SuccessDialog from '../components/SuccessDialog'
import {makeStyles} from '@material-ui/core/styles'
import React, {useState} from 'react'
import {
    Container, TextField, Typography, Grid, Button, Paper, Tabs, Tab, Select, MenuItem
} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import useUser from "../hooks/useUser";
import transfer from "../images/money-transfer.png";
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


export default function TransferMoney(props) {
    const classes = useStyles()
    const history = useHistory()
    const user  = useUserData()

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
        value:'',
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
        await API.transfer({
            ...userDetails,
        })
        window.dispatchEvent(new Event('storage'));

        return setSuccessDialog({
            open: true,
            header: "Transfer Successful!",
            message: `You have successfully tansfered money to ${userDetails.to}`
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
                <img src={transfer} width="50" height="50"/>
                <Typography component='h1' variant='h5'>
                    Transfer Money
                </Typography>
                <br/>
                <Typography>
                   Current Account Balance: {user.accountBalance} {user.accountCurrency}
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
                                label="How much money would you like to transfer?"
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

                    </Grid>
                    <Button
                        onClick={signup}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Transfer
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}