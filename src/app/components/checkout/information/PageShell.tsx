'use client'

import InformationForm from "./Information"
import CartSide from "../../multi-use/CheckoutCartSide"
import {useSessionStore} from '../../../stores/useSessionID'
import { useEffect, useState } from "react"
import { useCartStore } from "@/app/stores/useCartStore"
import { CartItem } from "@/app/types/types"
import ConflictsPopup from "./Conflicts"

type ReservedItem= {
    id: number,
    expires_at: string,
    product_sold: boolean
}



export default function PageShell(){

    const [sessionID, setSessionID] = useState<string>()
    const [cart, setCart] = useState<CartItem[]>()
    const [reservedIds, setReservedIds] = useState<ReservedItem[]>();
    const {sessionID: seshID, generateSessionID} = useSessionStore();
    const {items} = useCartStore()


    useEffect(() => {
        if(!seshID){
            generateSessionID()
        }

        if(items && seshID){
            setCart(items)
            setSessionID(seshID)
        }

    }, [seshID, items])

    useEffect(() => {
        if(cart && sessionID){
            const ids = cart.map((item) => item.product_id).join(',')

            const sendReservation = async () => {
                const response = await fetch('/api/make-reservation', {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ids: ids,
                        session_id: sessionID
                    })
                })    
                
                const data = await response.json()

                if(response.ok && data.reserved.reserved_items){
                    setReservedIds(data.reserved.reserved_items)
                }

            }
            
            sendReservation();
        }
    }, [cart, sessionID])
    

    useEffect(() => {
        console.log(reservedIds)
    }, [reservedIds])

    return(
        <>
            <div className="checkout-main">
                <InformationForm />
                <CartSide cart={items}/>
            </div>
            {reservedIds && reservedIds.length > 0 && 
                <>
                    <ConflictsPopup reserved_ids={reservedIds} cart={items}/>
                </>
            }
        </>
    )
}