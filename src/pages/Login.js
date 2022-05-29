import API                  from '../api'
import ErrorDialog          from '../components/ErrorDialog'
import { makeStyles }       from '@material-ui/core/styles'
import { LockOutlined }     from '@material-ui/icons'
import React, { useState }  from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import {
    Avatar, Container, Grid, Button, Paper, TextField, Typography
} from '@material-ui/core'
import useToken from '../hooks/useToken'
import useUser from '../hooks/useUser'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(6),
        opacity: '98%'
    },
    avatar: {
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))


export default function Login(props) {
    const classes = useStyles()
    const history = useHistory()
    const { token } = useToken()
    const { user } = useUser()

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        header: '',
        message: ''
    })

    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    })

    const inputChanged = (key, value) => {
        setUserDetails(state => ({
            ...state,
            [key]: value
        }))
    }

    const login = async () => {

        if(Object.values(userDetails).some(value => value === '')) {
            return setErrorDialog({
                open: true,
                header: 'Forgot Something?',
                message: 'Please fill out all of the fields'
            })
        }



        try {

            localStorage.clear()

            const token = await API.login(userDetails)

            props.setToken(token)

            const user = await API.getUser(token, userDetails.username)

            props.setUser(user)

            console.log(user)
            const nextPage = user.userType === 'admin' ? '/admins' : '/users'

            return history.push(nextPage)

        } catch(error) {
            console.log(error)
            setErrorDialog({
                open: true,
                header: 'Something went wrong',
                message: 'Please fill out correct details'
            })
        }
    }


    if(token) {
        const redirect = user.userType === 'admin' ? '/admins' : '/volunteers'
        return <Redirect to={redirect}/>
    }

    return(
        <Container component='main' maxWidth='xs'>
            <ErrorDialog
                open={errorDialog.open}
                header={errorDialog.header}
                error={errorDialog.message}
                close={() => setErrorDialog({open: false, message: ''})}
            />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component='h1' variant='h5' style={{
                    fontFamily: 'BlinkMacSystemFont'
                }}>
                    Login to your Account
                </Typography>
                <form className={classes.form} dir='ltr'>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        autoFocus
                        name='username'
                        value={userDetails.username}
                        onChange={event => inputChanged('username', event.target.value)}
                    >
                    </TextField>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={userDetails.password}
                        onChange={event => inputChanged('password', event.target.value)}
                    />
                    <Button
                        onClick={login}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        style={{
                            fontFamily: 'Heebo'
                        }}
                    > Login
                    </Button>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Link component={Button} to='/signup'>
                                {"Don't have an account? sign up here"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}