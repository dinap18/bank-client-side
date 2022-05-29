import React from 'react'
import Login from '../pages/Login'
import useToken from '../hooks/useToken'
import useUser from '../hooks/useUser'
import Signup from '../pages/Signup'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Main(props) {

    const { token, setToken } = useToken()
    const { user, setUser } = useUser()


    const authenticateAdmin = () => {
        if(token && user?.userType === 'admin') {
            return true
        }

        return false
    }

    const authenticateVolunteer = () => {
        if(token && user?.userType === 'volunteer') {
            return true
        }

        return false
    }


    return (
        <>

            <Router>
                <Navbar user={user}/>
                <Switch>
                    <Route exact path='/'>
                        <Login setToken={setToken} setUser={setUser}/>
                    </Route>
                    <Route path='/signup'>
                        <Signup/>
                    </Route>
                </Switch>
            </Router>
            <Footer/>
        </>
    )

}