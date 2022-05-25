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
                header: 'Something went wrong',
                message: 'Please fill out all of the fields'
            })
        }

        if(!(await API.userExists(userDetails.username))) {
            return setErrorDialog({
                open: true,
                header: 'Something went wrong',
                message: 'User does not exist'
            })
        }

        try {

            localStorage.clear()

            const token = await API.login(userDetails)

            props.setToken(token)

            const user = await API.getUser(token, userDetails.email)

            props.setUser(user)

            const nextPage = user.userType === 'admin' ? '/admins' : '/customers'

            return history.push(nextPage)

        } catch(error) {
            setErrorDialog({
                open: true,
                header: 'Something went wrong',
                message: 'Details provided are not valid'
            })
        }
    }


    if(token) {
        const redirect = user.userType === 'admin' ? '/admins' : '/customers'
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
                    fontFamily: 'Heebo'
                }}>
                    Login to an existing account
                </Typography>
                <form className={classes.form} dir='rtl'>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='username'
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
                        label="password"
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
                    > היכנס
                    </Button>
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Link component={Button} to='/signup'>
                                {"Don't have an account? signup now!"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}