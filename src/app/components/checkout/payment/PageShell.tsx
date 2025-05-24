'use client'
import Image from "next/image"
import { useCheckoutStore } from "@/app/stores/useCheckoutStore";

export default function Component(){
    const {first_name, last_name, address} = useCheckoutStore();

    
    return(
        <>
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
                <p>{first_name}</p>
                <p>{last_name}</p>
                <p>{address}</p>
               

                <div className="bottom-row">
                    <a href="/checkout/information">
                        <p>Return to information</p>
                    </a>
                </div>
            </section>
        </>
    )
}