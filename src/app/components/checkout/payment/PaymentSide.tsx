'use client'
import Image from "next/image"
import { useCheckoutStore } from "@/app/stores/useCheckoutStore";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useCartStore } from "@/app/stores/useCartStore";

export default function Component(){
    const {company, email, country, first_name, last_name, address, apartment, city, state, zipcode, phone} = useCheckoutStore();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    return(
        <>
            <div className="payment-side">
                <header className="payment-head">
                    <Image src="/checkout-art.png" alt="Checkout art" width={185} height={33} />
                    <menu>
                        <li className="order-item">
                            <a className="list-item-anchor" href="/cart">Cart</a>
                        </li>
                        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 7L15 12L10 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <li className="order-item">
                            <a className="list-item-anchor" href="/checkout/information">Information</a>
                        </li>
                        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 7L15 12L10 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <li className="order-item">
                            Payment
                        </li>
                    </menu>
                </header>
                <section>
                    <div className="contact-details">
                        <div className="contact-info">
                            <p className="contact">Contact</p>
                            <p className="contact-email">{email}</p>
                        </div>
                        <a href="/checkout/information" className="change">Change</a>
                    </div>

                    <div className="shipping-details">
                        <div className="shipping-info">
                            <p className="ship">Ship to</p>
                            <p className="ship-to">
                                {company.length > 0 ? `${company}, ` : ''}
                                {`${address}, `}
                                {apartment.length > 0 ? `${apartment}, ` : ''}
                                {`${city} ${state} ${zipcode}, ${country}`}
                            </p>
                        </div>
                    </div>
                    
                    <div className="checkout-form">
                        <form>
                            <PaymentElement />
                        </form>
                    </div>

                    <div className="bottom-row">
                        <a href="/checkout/information">
                            <p>Return to information</p>
                        </a>
                    </div>
                </section>
            </div>
        </>
    )
}