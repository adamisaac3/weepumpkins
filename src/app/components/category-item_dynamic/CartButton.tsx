'use client'
import { useCartStore } from "@/app/stores/useCartStore";
import { CartItem } from "@/app/types/types";

export default function CartButton({product, setCartOpen, cartOpen} : {cartOpen: boolean,setCartOpen: React.Dispatch<React.SetStateAction<boolean>>,product: CartItem}){
    const {addCartItem} = useCartStore();


    return (
        <button className="cart-button" onClick={() => {
            addCartItem(product)
            setCartOpen(!cartOpen)
        }
        
        }>ADD TO CART</button>
    )
}