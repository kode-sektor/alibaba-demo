const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const { default: Stripe } = require('stripe')
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

// API

// App config
const app = express()

// Middlewares
app.use(cors({ origin: true }))
app.use(express.json())

// API routes
app.get('/', (request, response) => response.status(200).send('hello'))

// Payments route
app.post('/payments/create', async (request, response) => {
    const total = request.query.total  
    console.log('Payment request received for this amount >>> ', total)

    const paymentIntent = await Stripe.PaymentIntentsResource.create({
        amount: total,
        currency : usd
    })
    response.status(201).send({
        clientSecret : paymentIntent.client_secret
    })
})

// Listen command
exports.api = functions.https.onRequest(app)

// http://localhost:5001/challenge-18b20/us-central1/api    // This is gotten after running 'firebase emulator:start' in console