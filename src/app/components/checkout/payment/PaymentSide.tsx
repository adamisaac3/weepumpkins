'use client'
import Image from "next/image"
import { useCheckoutStore } from "@/app/stores/useCheckoutStore";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useRef } from "react";
import Spinner from '../../multi-use/Spinner'
import { useRouter } from "next/navigation";

export default function Component(){
    const {company, email, country, first_name, last_name, address, apartment, city, state, zipcode, phone} = useCheckoutStore();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter()

    if(!(email && country && first_name && last_name &&address && city && state && zipcode)){
        router.push('/checkout/information')
    }
    
    const errorRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault();

        if(!stripe || !elements) return;

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                payment_method_data: {
                    billing_details: { 
                        name: `${first_name} ${last_name}`,
                        email: email,
                        phone: phone ?? null
                    }
                },
                return_url: "http://localhost:3000/checkout/confirm"
            }
        }) 

        if(error){
            console.log('an error occured during payment.')
            setError(error.message ?? "An error as occured")
            
            setTimeout(() => {
                errorRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
            }, 1)
        }
        setLoading(false)
    }
    
    /*
    const testLoading = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault();

        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        await sleep(30000);

        setLoading(false)
    }
    */

    return(
        <>
            <div className="payment-side">
                <header className="payment-head">
                    <Image src="/checkout-art.png" alt="Checkout art" width={185} height={33} />
                    <menu className='checkout-flow'>
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
                <section className="checkout-details">                    
                    <div className="top-level-details">
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
                            <a href="/checkout/information" className="change">Change</a>
                        </div>
                    </div>
                    <div className="checkout-form">
                        <div className="checkout-heading">
                            <h2>Payment</h2>
                            <p className="security">All transactions are secure and encrypted.</p>
                        </div>
                        <form className="payment-element" onSubmit={(e) => handleSubmit(e)}>
                            {error && 
                                <div className="error" ref={errorRef}>
                                    <p className="error-message">{error}</p>
                                </div>
                            }
                            
                            <PaymentElement />

                            <div className="bottom-row">
                                <div className="checkout-return">
                                    <svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 512.006 512.006" xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <path d="M388.419,475.59L168.834,256.005L388.418,36.421c8.341-8.341,8.341-21.824,0-30.165s-21.824-8.341-30.165,0
                                                    L123.586,240.923c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251
                                                    c5.461,0,10.923-2.091,15.083-6.251C396.76,497.414,396.76,483.931,388.419,475.59z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    <a href="/checkout/information">
                                        <p>Return to information</p>
                                    </a>
                                </div>
                                <button className="confirm" type="submit" disabled={loading}>
                                    {loading && 
                                        <Spinner />
                                    }
                                    {!loading && 
                                        <p>Confirm Payment</p>
                                    }
                                    
                                </button>
                            </div>
                        </form>

                        <div className="billing-address">
                            <div className="billing-headers">
                                <h2 className="billing-header">Billing Address</h2>
                                <p>Select the address that matches your card or payment method</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}