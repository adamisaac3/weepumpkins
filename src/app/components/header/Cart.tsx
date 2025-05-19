'use client'
import {useState, useEffect, Dispatch} from 'react'
import Image from 'next/image'

type CartItem = {
                    product_name: string;
                    price: number;
                    quantity: number;
                    category_name: string;
                    image_path: string;
                    category_id: number;
                };

export default function Component({cart, cartOpen, handleCartClicked} : {cart: CartItem[] | undefined, cartOpen: boolean, handleCartClicked: () => void}){
    
    function getSubtotal(){
        let subtotal = 0;
        if(cart){
            for(const row of cart){
                subtotal += row.price;
            }
        }
        
        return hasDecimal(subtotal) ? `$ ${subtotal}` : `$ ${subtotal.toFixed(2)}`;
    }
    
    function hasDecimal(num: number){
        return num % 1 !== 0;
    }

    console.log(cart);

    return (
        
        <div className={`cart-overlay ${cartOpen ? 'open' : 'closed'}`}>
            <div className="cart-overlay-top-row">
                <h1 className="cart-header">CART</h1>
                <button className="close-cart-overlay" onClick={handleCartClicked}>
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Menu / Close_LG">
                            <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
            </div>
            {cart &&
                <>
                    <div className="cart-items">
                        {cart.map((row, i) => {
                            return(
                                <div key={i} className="cart-item">
                                    <Image className="cart-item-image" alt="cart item image" width={100} height={100} src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${row.category_id}/${row.image_path}`} />
                                    <div className="cart-item-info">
                                        <h2 className="cart-item-name">{row.product_name}</h2>
                                        <p className="cart-item-cat-name">{row.category_name}</p>
                                        <div className="quantity-and-price">
                                            <div className="quantity">
                                                <button className="minus-quantity">
                                                    <svg className="minus-quantity-icon" width="12px" height="12px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 12L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                                <p>{row.quantity}</p>
                                                <button className="plus-quantity">
                                                    <svg className="plus-quantity-icon" width="12px" height="12px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 12H20M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <p>$ {hasDecimal(row.price) ? row.price : row.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="cart-overlay-bottom-row">
                        <div className="subtotal">
                            <p className="subtotal-header">SUBTOTAL</p>
                            <p className="subtotal-amount">{getSubtotal()} USD</p>
                        </div>
                        <p className="subtotal-additional">Shipping, taxes, and discount codes calculated at checkout.</p>
                        <button className="cart-checkout-button">CHECK OUT</button>
                    </div>
                </>
            }
            {(!cart || cart.length === 0)&&  
                <div className="empty-cart">
                    <p>Your cart is currently empty.</p>
                </div>
            }
        </div>
    )
}
