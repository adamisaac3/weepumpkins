'use client'
import { useCartStore } from "@/app/stores/useCartStore";
import { CartItem } from "@/app/types/types";

export default function CartButton({product} : {product: CartItem}){
    const {addCartItem} = useCartStore();


    return (
        <button className="cart-button" onClick={() => addCartItem(product)}>ADD TO CART</button>
    )
}