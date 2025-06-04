'use client'
import { useSearchParams } from "next/navigation"

export default function ConfirmPageShell(){
    const searchParams = useSearchParams();
    const payment_intent = searchParams?.get('payment_intent')

    return (
        <p>{payment_intent}</p>
    )
}