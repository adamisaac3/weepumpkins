'use client'
import {useEffect, useRef} from 'react'
import Image from 'next/image'
import {motion, AnimatePresence} from 'framer-motion'
import { useCartStore } from '@/app/stores/useCartStore'
import { useRouter } from 'next/navigation'

export default function Component({cartOpen, handleCartClicked} : {cartOpen: boolean, handleCartClicked: () => void}){
    
    const {items: cart} = useCartStore();

    const cartRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {

        function handleCartClickedOutside(event: MouseEvent){
            if(cartOpen && cartRef.current && !cartRef.current.contains(event.target as Node)){
                handleCartClicked();
            }
        }

        if (cartOpen) {
            document.addEventListener('mousedown', handleCartClickedOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleCartClickedOutside)
        };
        

    }, [handleCartClicked, cartOpen]);

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


    return (
        <AnimatePresence>
            <div ref={cartRef} className={`cart-overlay ${cartOpen ? 'open' : 'closed'}`}>
                {cartOpen &&
                <div className="cart-overlay-top-row">
                    <motion.h1 
                        className="cart-header"
                        initial={{opacity:0, x: 40}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.35, ease: 'easeIn', delay: 0.25}}
                        
                        >CART
                    </motion.h1>
                    <button className="close-cart-overlay" onClick={handleCartClicked}>
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Menu / Close_LG">
                                <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        </svg>
                    </button>
                </div>
                }
                {cartOpen && cart && cart.length > 0 &&
                    <>
                        <motion.div 
                            className="cart-items"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.35, delay: 0.2, ease:'easeIn'}}
                            key="cart-content"
                        >
                            {cart.map((row, i) => {
                                return(
                                    <motion.div 
                                        key={i} 
                                        className="cart-item"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{duration: 0.35, ease:'easeIn', delay: 0.4 + i * 0.2}}
                                    >
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
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                        <motion.div 
                            className="cart-overlay-bottom-row"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.35, delay: 1, ease:'easeIn'}}
                        >
                            <div className="subtotal">
                                <p className="subtotal-header">SUBTOTAL</p>
                                <p className="subtotal-amount">{getSubtotal()} USD</p>
                            </div>
                            <p className="subtotal-additional">Shipping, taxes, and discount codes calculated at checkout.</p>
                            <button onClick={() => router.push('/checkout/information')} className="cart-checkout-button">CHECK OUT</button>
                        </motion.div>
                    </>
                }
                {(((cart && cart.length === 0) || !cart))&&  
                    <motion.div 
                        className="empty-cart"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.35, delay: 0.25}} 
                        key="empty-cart"   
                    >
                        <p>Your cart is currently empty.</p>
                    </motion.div>
                }
                
            </div>
        </AnimatePresence>
    )
}
