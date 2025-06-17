import Image from 'next/image'
import AnimatedInput from './AnimatedInput'
import { CartItem } from '@/app/types/types';
export default function CartSide({cart}: {cart: CartItem[]}){
    
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
    const subtotal = getSubtotal();
    return(
        <div className="cart-side">
            <Image width={575} height={600} src="/checkout-cart-background.png" className="cart-background" alt="background art" />
            <div className="cart-wrapper">
                <div className="cart-overlay">
                    <div className="cart-items">
                    {cart && 
                        cart.map((row) => {
                            return(
                                <div key={row.product_id} className="cart-item">
                                    <div className="thumbnail-quantity">
                                        <Image width={63} height={63} className="cart-item-thumbnail" alt="Cart item thumbnail" src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${row.category_id}/${row.image_path}`} />
                                        <div className="quantity-circle">
                                            <p className="quantity">{row.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <p>{row.product_name} - {row.product_id}</p>
                                        <p>{row.category_name}</p>
                                    </div>
                                    <p className="item-price">${hasDecimal(row.price) ? row.price : row.price.toFixed(2)}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="discount-input">
                        <AnimatedInput defaultValue={''} isRequired={false} name="discount" label={'Discount code or gift cart'} />
                        <button className="discount-button">Apply</button>
                    </div>
                    <div className="bottom-row">
                        <div className="subtotal">
                            <div className="subtotal-wrapper">
                                <p>Subtotal</p>
                                <svg width="13px" height="13px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                                </svg>
                                <p>{cart.length} {cart.length > 1 ? 'items' : 'item'}</p>
                            </div>
                            <p>{subtotal} USD</p>
                        </div>
                        <div className="shipping">
                            <p>Shipping</p>
                            <p>FREE SHIPPING!!</p>
                        </div>
                
                        <div className="total">
                            <h2>Total</h2>
                            <p>{subtotal} USD</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}