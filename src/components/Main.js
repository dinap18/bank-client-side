import React from 'react'
import Login from '../pages/Login'
import useToken from '../hooks/useToken'
import useUser from '../hooks/useUser'
import Signup from '../pages/Signup'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import AccountDetails from "../pages/AccountDetails";
import PrivateRoute from "./PrivateRoute";
import Chat from "../pages/Chat";
import AdminHomePage from "../pages/AdminHomePage";
import UserHomePage from "../pages/UserHomePage";
import TransferMoney from "../pages/TransferMoney";
import LoanMoney from "../pages/LoanMoney";

export default function Main(props) {

    const {token, setToken} = useToken()
    const {user, setUser} = useUser()


    const authenticateAdmin = () => {
        if (token && user?.userType === 'admin') {
            return true
        }

        return false
    }

    const authenticateVolunteer = () => {
        if (token && user?.userType === 'volunteer') {
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
                    <Route exact path='/account' component={AccountDetails}/>
                    <Route exact path='/chat' component={Chat}/>
                    <Route exact path='/admins' component={AdminHomePage}/>
                    <Route exact path='/users' component={UserHomePage}/>
                    <Route exact path='/transfer' component={TransferMoney}/>
                    <Route exact path='/loan' component={LoanMoney}/>
                </Switch>
            </Router>
            <Footer/>
        </>
    )

}