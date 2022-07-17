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
import RequestLoan from "../pages/requestLoan";
import Home from "../pages/Home";
import DefaultNavbarDropdown from "./DefaultNavbarDropdown";
import ApproveRequests from "../pages/ApproveRequests";
import AccountActions from "../pages/AccountActions";

export default function Main(props) {

    const {token, setToken} = useToken()
    const {user, setUser} = useUser()


    const authenticateAdmin = () => {
        if (token && user?.userType === 'admin') {
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
                    <Route exact path='/chat' component={Chat}/>
                    <Route exact path='/admins' component={AdminHomePage}/>
                    <Route exact path='/users' component={UserHomePage}/>
                    <Route exact path='/transfer' component={TransferMoney}/>
                    <Route exact path='/loan' component={LoanMoney}/>
                    <Route exact path='/requestLoan' component={RequestLoan}/>
                    <Route exact path='/account' component={AccountDetails}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/accountactions' component={AccountActions}/>
                </Switch>
            </Router>
            <Footer/>
        </>
    )

}