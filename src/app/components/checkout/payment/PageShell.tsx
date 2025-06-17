'use client'
import PaymentSide from './PaymentSide'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/app/stores/useCartStore'
import CheckoutCartSide from '../../multi-use/CheckoutCartSide'
import { useCheckoutStore } from '@/app/stores/useCheckoutStore'
import initCheckoutStore from '../../multi-use/initCheckoutStore'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

function useInitCart(){
     
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const set = useCartStore.persist.onHydrate(() => {
            setHydrated(true)
        })

        if(useCartStore.persist.hasHydrated()){
            setHydrated(true)
        }

        return () => set?.();
    }, [])
    return hydrated
}


export default function PageShell(){
    const [clientSecret, setClientSecret] = useState('')
    const {items} = useCartStore();

    const hydrated = useInitCart();

    initCheckoutStore();
    const {email, country, first_name, last_name, address, apartment, city, state, zipcode, phone} = useCheckoutStore();

    useEffect(() => {

        if(!hydrated || items.length === 0){
            return;
        }

        const fetchPaymentIntent = async () => {
            const response = await fetch('/api/create-payment-intent', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({items: items.map((i) => i.product_id), 
                    email: email,
                    country: country, 
                    first_name: first_name, 
                    last_name: last_name,
                    address: address,
                    apartment: apartment,
                    city: city,
                    state: state,
                    zip: zipcode,
                    phone: phone
                    }),
            })
            const {client_secret: clientSecret} = await response.json();

            if(response.ok){
                setClientSecret(clientSecret);
            }
        }
        
        fetchPaymentIntent();
    }, [hydrated, items, email, country, first_name, last_name, address, apartment, city, state, zipcode, phone])

    return (
        <>
            <section className="checkout-main">
                <div className="payment-side">
                    {clientSecret && 
                        <Elements stripe={stripePromise} options={{
                            clientSecret,
            
                        }}>
                            <PaymentSide />
                        </Elements>
                    }
                </div>
                <CheckoutCartSide cart={items}/>
            </section>
        </>
    )
}