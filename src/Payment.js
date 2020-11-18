import React from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import { Link } from 'react-router-dom'

// Stripe dependency
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'

import CheckoutProduct from "./CheckoutProduct";

function Payment() {

    const [{ basket, user }, dispatch] = useStateValue()
    
    // Stripe
    const stripe = useStripe()
    const elements = useElements()

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
                        <form>
                            <CardElement />
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment
