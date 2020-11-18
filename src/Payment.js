import React, {useState, useEffect} from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import { Link, useHistory } from 'react-router-dom'
import axios from './axios'

// Stripe dependency
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'

import CurrencyFormat from 'react-currency-format'

import { getBasketTotal } from './reducer'
import CheckoutProduct from './CheckoutProduct'
import {db} from './firebase'


function Payment() {

    const history = useHistory()

    const [{ basket, user }, dispatch] = useStateValue()
    
    // Stripe
    const stripe = useStripe()
    const elements = useElements()

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)

    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        // Generate special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url : `/payments/create?total=${getBasketTotal(basket) * 100}`
            }) 
            setClientSecret(response.data.clientSecret)
        }   
        getClientSecret()
    }, [basket])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true) // Prevent multiple clicks

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card : elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket : basket,
                amount : paymentIntent.amount,
                created : paymentIntent.created
            })

            // paymentIntent = payment confirmation
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type : 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className="payment">
            <div className="payment__container">

                <h1>Checkout (<Link to="/checkout">{basket?.length} items</Link>)</h1>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                </div>
                <div className="payment__section">
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>123 Los Angeles, CA</p>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <h3>Order Total : {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"£"} 
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>
                                    {processing ? <p>Processing</p> : "Buy Now"}
                                </span>
                            </button>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
