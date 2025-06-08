'use client'
import { notFound, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

type Order = {
    payment_intent: string,
    price: number,
    name: string,
    email: string,
    country: string,
    address: string,
    apartment: string,
    city: string,
    state: string,
    zipcode: string,
    phone: string,
    ordered_at: string
}

export default function ConfirmPageShell(){
    const searchParams = useSearchParams();
    const payment_intent = searchParams?.get('payment_intent')
    const [order, setOrder] = useState<Order>()
    
    setTimeout(() => {
        useEffect(() => {
            const fetchOrder = async () => {
                const response = await fetch(`/api/get-order?payment_intent=${payment_intent}`)
                const data = await response.json()

                if(response.ok){
                    const order: Order = data.map(() => {
                        
                    })
                }
            }

            fetchOrder();
        }, [])
    }, 100)

    return (
        <p>{payment_intent}</p>
    )
}