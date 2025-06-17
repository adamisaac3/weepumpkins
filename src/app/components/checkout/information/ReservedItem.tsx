'use client'
import { useCartStore } from "@/app/stores/useCartStore"
import { CartItem } from "@/app/types/types"
import { differenceInMinutes, parseISO } from "date-fns"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

type ReservedItem= {
    id: number,
    expires_at: string,
    product_sold: boolean
}

function getReservationTime(timestamp: string){
    const expiresAt = parseISO(timestamp + 'Z');

    const now = new Date()

    const minutesRemaining = differenceInMinutes(expiresAt, now);

    return minutesRemaining;
}

export default function ReservedItem({item: row, cart}: {item: ReservedItem, cart : CartItem[]}){

    const {removeCartItem} = useCartStore();
    const [wait, setWait] = useState(false);
    const router = useRouter()
    
    function onRemoveClick(id: number){
        removeCartItem(id);
    }

    const [minutes, setMinutes] = useState<number>(() => 
        differenceInMinutes(parseISO(row.expires_at), new Date())
    );
    
    useEffect(() => {
        const interval = setInterval(() => {
            const now  = Date.now()
            const minutesLeft = differenceInMinutes(parseISO(row.expires_at), now);

            setMinutes(minutesLeft);

            if(minutesLeft <= 0){
                clearInterval(interval);
            }

            if(wait && minutes <= 0){
                router.push('/checkout/information')
            }
        }, 100)
        
        return () => clearInterval(interval)
    }, [row.expires_at, minutes, wait, router])

    return(
        <div className="reserved-item" key={row.id}>
            <div className="reserved-item-info">
                <p>{'(' + cart.find(item => item.product_id === row.id)?.product_name || 'Product '} - {row.id})</p>
                <svg width="13px" height="13px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {row.product_sold && 
                    <p>product has been sold</p>
                }
                {!row.product_sold && 
                    <p>reserved for {getReservationTime(row.expires_at)} more minutes</p>    
                }
            </div>
            <div className="reserved-item-btns">
                <button className="remove-item" onClick={() => onRemoveClick(row.id)}>Remove</button>
                {!row.product_sold && 
                    <button className="wait" onClick={() => setWait(true)}>Wait</button>
                }
            </div>
        </div>
    )
}