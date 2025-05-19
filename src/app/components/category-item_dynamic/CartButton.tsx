'use client'

export default function CartButton({product_id} : {product_id: number}){
    const addItem = async () => {
        const res = await fetch('/api/add-to-cart', {
            method: "POST",
            body: JSON.stringify({product_id}),
            headers: {
                'content-type': 'application/json'
            }

        })
    }


    return (
        <button className="cart-button" onClick={addItem}>ADD TO CART</button>
    )
}