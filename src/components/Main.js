import React from 'react'
import Login from '../pages/Login'
import useToken from '../hooks/useToken'
import useUser from '../hooks/useUser'
import Signup from '../pages/Signup'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import AccountDetails from "../pages/AccountDetails";
import Chat from "../pages/Chat";
import AdminHomePage from "../pages/AdminHomePage";
import UserHomePage from "../pages/UserHomePage";
import TransferMoney from "../pages/TransferMoney";
import LoanMoney from "../pages/LoanMoney";
import RequestLoan from "../pages/requestLoan";
import Home from "../pages/Home";
import ApproveRequests from "../pages/ApproveRequests";
import AccountActions from "../pages/AccountActions";
import ExchangeRates from "../pages/ExchangeRates";
import PayBackLoans from "../pages/PayBackLoans";

export default function Main(props) {

    const {token, setToken} = useToken()
    const {user, setUser} = useUser()


    const isAdmin = () => {
        if(token && user?.userType === 'admin') {
            return true
        }

        return false
    }

    const isUser = () => {
        if(token && user?.userType === 'user') {
            return true
        }

        return false
    }
    const isLoggedIn = () => {
        if(token) {
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
                    <Route exact path='/chat' component={Chat} auth={isLoggedIn} />
                    <Route exact path='/admins' component={AdminHomePage} auth={isAdmin}/>
                    <Route exact path='/users' component={UserHomePage}   auth={isUser}/>
                    <Route exact path='/transfer' component={TransferMoney} auth={isLoggedIn}/>
                    <Route exact path='/loan' component={LoanMoney} auth={isLoggedIn}/>
                    <Route exact path='/requestLoan' component={RequestLoan} auth={isLoggedIn}/>
                    <Route exact path='/pay-back-loan' component={PayBackLoans} auth={isLoggedIn}/>
                    <Route exact path='/account' component={AccountDetails} auth={isLoggedIn}/>
                    <Route exact path='/home' component={Home} auth={isLoggedIn}/>
                    <Route exact path='/accountactions' component={AccountActions} auth={isLoggedIn}/>
                    <Route exact path='/exchange-rates' component={ExchangeRates} auth={isLoggedIn}/>
                    <Route exact path='/approve-requests' component={ApproveRequests} auth={isAdmin}/>
                </Switch>
            </Router>
            <Footer/>
        </>
    )

}