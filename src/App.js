import React, { useEffect } from 'react'
import { auth } from './firebase'

import {useStateValue} from './StateProvider'

import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import Login from './Login'
import Payment from './Payment'
import Orders from './Orders'

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

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
                    <Route path="/orders">
                        <Orders />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/checkout">
                        <Header />
                        <Checkout />
                    </Route>
                    <Route path="/payment">
                        <Header />
                        <Elements stripe={promise}>
                            <Payment />
                        </Elements>
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
