import { useCartStore } from '@/app/stores/useCartStore';
import Image from 'next/image'
export default function CartSide(){
    
    const {items: cart} = useCartStore();

    function hasDecimal(num: number){
        return num % 1 !== 0;
    }

    function getSubtotal(){
        let subtotal = 0;
        if(cart){
            for(const row of cart){
                subtotal += row.price;
            }
        }
        
        return hasDecimal(subtotal) ? `$ ${subtotal}` : `$ ${subtotal.toFixed(2)}`;
    }

    return(
        <div className="cart-side">
            <Image width={675} height={665} src="/checkout-cart-background.png" className="cart-background" alt="background art" />
            <div className="cart-overlay">
                <p>Overlay</p>
            </div>
        </div>
    )
}