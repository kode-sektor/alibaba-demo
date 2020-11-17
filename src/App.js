import React, { useEffect } from 'react'
import { auth } from './firebase'

import {useStateValue} from './StateProvider'

import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import Login from './Login'
import Payment from './Payment'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

function App() {

    const [{}, dispatch] = useStateValue()

    useEffect(() => {
        // Run only once when the app component loads
        auth.onAuthStateChanged(authUser => {
            console.log('USER >>> ', authUser)

            if (authUser) {
                dispatch({
                    type: 'SET_USER',
                    user : authUser
                })
            } else {
                dispatch({
                    type: 'SET_USER',
                    user : null
                })
            }
        })
    }, [])

    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/checkout">
                        <Header />
                        <Checkout />
                    </Route>
                    <Route path="/payment">
                        <Header />
                        <Payment />
                    </Route>
                    <Route path="/">
                        <Header />
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
