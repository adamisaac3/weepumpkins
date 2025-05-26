import { useCartStore } from '@/app/stores/useCartStore';
import Image from 'next/image'
import AnimatedInput from '../../multi-use/AnimatedInput'
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
            <Image width={675} height={645} src="/checkout-cart-background.png" className="cart-background" alt="background art" />
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
                                        <p>{row.product_name}</p>
                                        <p>{row.category_name}</p>
                                    </div>
                                    <p className="item-price">${hasDecimal(row.price) ? row.price : row.price.toFixed(2)}</p>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="discount-input">
                        <AnimatedInput isRequired={false} name="discount" label={'Discount code or gift cart'} />
                        <button>Apply</button>
                    </div>
                    <div className="botton-row">
                        <div className="subtotal">
                            <div className="subtotal-wrapper">
                                <p>Subtotal</p>
                                {/* SVG for small dot */}
                                <p>{cart.length} {cart.length > 1 ? 'items' : 'item'}</p>
                            </div>
                            <p>{getSubtotal()} USD</p>
                        </div>
                        <div className="shipping">
                            <p>Shipping</p>
                            <p>FREE SHIPPING!!</p>
                        </div>
                        <div className="taxes">
                            <p>Estimated taxes</p>
                            <p>taxes here</p>
                        </div>
                        <div className="total">
                            <h2>Total</h2>
                            <p>Calculate total</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}