'use client'

import InformationForm from "./Information"
import CartSide from "../../multi-use/CheckoutCartSide"
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