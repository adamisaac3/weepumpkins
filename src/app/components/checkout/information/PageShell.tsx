'use client'

import InformationForm from "./Information"
import CartSide from "./CartSide"
export default function PageShell(){
    return(
        <>
            <div className="checkout-main">
                <InformationForm />
                <CartSide />
            </div>
        </>
    )
}