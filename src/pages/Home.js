import {makeStyles} from '@material-ui/core/styles'
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {
    Container, Grid, Typography, Box
} from '@material-ui/core'
import useToken from '../hooks/useToken'
import useUser from '../hooks/useUser'
import crypto from '../images/crypto_bnnr_img.svg'
import SelectedListItem from "../components/SelectedListItem";

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


export default function Home(props) {
    const classes = useStyles()
    const history = useHistory()
    const {token} = useToken()
    const {user} = useUser()

    const [errorDialog, setErrorDialog] = useState({
        open: false,
        header: '',
        message: ''
    })


    return (
        <>
            <Box component="section" py={{xs: 0, lg: 6}}>
                <Container>
                    <Grid container item>
                        <Box
                            width="100%"
                            bgColor="white"
                            borderRadius="xl"
                            shadow="xl"
                            mb={6}
                            sx={{overflow: "hidden"}}
                            justifyContent="center"
                        >
                            <Grid container spacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    lg={5}
                                    position="relative"
                                    px={0}
                                    sx={{
                                        backgroundImage: ({
                                                              palette: {gradients},
                                                              functions: {rgba, linearGradient},
                                                          }) =>
                                            `${linearGradient(
                                                rgba(gradients.dark.main, 0.8),
                                                rgba(gradients.dark.state, 0.8)
                                            )}, url()`,
                                        backgroundSize: "cover",
                                    }}
                                >
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        width="100%"
                                        height="100%"
                                    >
                                        <Box py={6} pr={6} pl={{xs: 3, sm: 6}} my="auto">
                                            <Typography variant="h4" color="white" mb={1}>
                                                Welcome to Chain Bucks
                                            </Typography>

                                            <SelectedListItem/>



                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid xs={6}>
                                    <img src={crypto} width="750" height="450"/>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                </Container>

            </Box>

        </>
    )
}