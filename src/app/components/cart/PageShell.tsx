'use client'
import Header from "../header/Header"
import Footer from "../footer/Footer"
import {useState, useEffect} from 'react'
import { CartItem } from "@/app/types/types"
import AnimatedLink from "../multi-use/AnimatedLink"
import { useCartStore } from "@/app/stores/useCartStore"
import {motion} from 'framer-motion'
import { useRouter } from "next/navigation"
import Image from "next/image"


export default function PageShell(){
    const [navOpen, setNavOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [cart, setCart] = useState<CartItem[]>()
    const {items, removeCartItem} = useCartStore();
    const router = useRouter();


    useEffect(() => {
        setCart(items)
    }, [items])

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
        <>  
            <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} navOpen={navOpen} setNavOpen={setNavOpen}/>
            <main>
                <div className="cart-header">
                    <h1>CART</h1>
                    <AnimatedLink href={'/collections/browse-all'} linkText="Continue Shopping" />
                </div>  
                <div className="cart-info">
                    <div className="cart-item-side">
                        {(!cart || cart.length <= 0) &&
                            <p className="empty-cart">Your cart is currently empty.</p>
                        }
                        {cart && cart.length > 0 && 
                            cart.map((row, i) => {
                                return (
                                    <motion.div
                                        key={i}
                                        className="cart-item"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.35, ease: 'easeIn', delay: 0.4 + i * 0.2 }}
                                    >
                                        <Image className="cart-item-image" alt="cart item image" width={150} height={150} src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${row.category_id}/${row.image_path}`} />
                                        <div className="cart-item-info">
                                            <h2 className="cart-item-name">{row.product_name}</h2>
                                            <p className="cart-item-cat-name">{row.category_name}</p>
                                            <div className="quantity-and-price">
                                                <div className="quantity">
                                                    <button className="minus-quantity">
                                                        <svg className="minus-quantity-icon" width="12px" height="12px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 12L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                    <p>{row.quantity}</p>
                                                    <button className="plus-quantity">
                                                        <svg className="plus-quantity-icon" width="12px" height="12px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M4 12H20M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p>$ {hasDecimal(row.price) ? row.price : row.price.toFixed(2)}</p>
                                            </div>
                                            <button className="remove-item" onClick={() => removeCartItem(row.product_id)}>Remove</button>
                                        </div>
                                    </motion.div>
                                )
                            })
                        }
                        </div>
                        {cart && cart.length > 0 && 
                            <motion.div 
                                    className="cart-checkout-side"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{duration: 0.35, delay: 1, ease:'easeIn'}}
                                >
                                    <div className="subtotal">
                                        <p className="subtotal-header">SUBTOTAL</p>
                                        <p className="subtotal-amount">{getSubtotal()} USD</p>
                                    </div>
                                    <p className="subtotal-additional">Shipping, taxes, and discount codes calculated at checkout.</p>
                                    <button className="cart-checkout-button" onClick={() => router.push('/checkout/information')}>CHECK OUT</button>
                            </motion.div>
                        }
                </div>
            </main>
            <Footer navOpen={navOpen} />
        </>
    )
}