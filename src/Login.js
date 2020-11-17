import React, {useState} from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'

import {auth} from './firebase'

function Login() {

    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = e => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            }).catch(error => alert(error.mesage))
    }

    const register = e => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth)

                if (auth) {
                    history.push('/')
                }
            }).catch(error => alert(error.message))
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"/>
            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form action="">
                    <h5>Email</h5>
                    <input onChange={e => setEmail(e.target.value)} type="text" value={email} />
                    
                    <h5>Password</h5>
                    <input  onChange={e => setPassword(e.target.value)} type="password" value={password} />
                    
                    <button type="submit" onClick={signIn} className="login__signInButton">Sign In</button>
                </form>
                <p>By signing in you agree to Amazon's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice etc.</p>
                <button  onClick={register} className="login__registerButton">Create your Amazon account</button>
            </div>
        </div>
    )
}

export default Login
