import {useState, useEffect} from 'react'
import { CartItem } from '@/app/types/types';
export default function Component(){
    const [cart, setCart] = useState<CartItem[]>();
    
    useEffect(() => {
        const fetchCart = async () => {
            const response = await fetch('/api/get-cart');
            const data = await response.json()


            if (response.ok) {

                if (!data['noCart'] && Array.isArray(data)) {
                    const cartParam = data.map((row: CartItem) => row);
                    setCart(cartParam);
                }
            }
        }
        fetchCart()
    }, [])

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
}