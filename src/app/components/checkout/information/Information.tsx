import { useCheckoutStore } from "@/app/stores/useCheckoutStore";
import Image from "next/image";
import AnimatedLink from "../../multi-use/AnimatedLink";
import AnimatedInput from '../../multi-use/AnimatedInput'
import {useRef} from 'react'
import { useRouter } from "next/navigation";

function continueToPayment(){
    window.location.href = "/checkout/payment"
}


export default function InformationForm(){
    const {first_name, last_name, address, setCheckoutInfo, phone} = useCheckoutStore();

    const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckoutInfo({[e.target.name]: e.target.value})
    }

    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();

        const form = formRef.current!;

        if(!form.reportValidity()){
            return;
        }
    
    
        const data = Object.fromEntries(new FormData(form).entries())

        setCheckoutInfo(data);
        router.push('/checkout/payment')
    }


    return(
        <div className="info-side">
            <header className="checkout-head">
                <Image src="/checkout-art.png" alt="Checkout art" width={205} height={40} />
                <menu className="checkout-flow">
                    <li className="order-item">
                        <a className="list-item-anchor" href="/cart">Cart</a>
                    </li>
                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L15 12L10 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <li className="order-item">
                        Information
                    </li>
                    <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 7L15 12L10 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <li className="order-item">
                        Payment
                    </li>
                </menu>
            </header>
            <section className="contact-info">
                <form ref={formRef} onSubmit={handleSubmit} className="info-form">
                    <div className="initial-contact">
                        <h2>Contact</h2>
                        <AnimatedInput label="Email" isRequired={true} name="email" />
                    </div>
                    <div className="disclaimer">
                        <h2>Delivery Disclaimer</h2>
                        <p>
                            Currently shipping is only available to locations within the United States.
                            If you wish for international shipping please <AnimatedLink href="/contact" linkText="contact me" />
                        </p>
                    </div>
                    <div className="shipping-info">
                        <AnimatedInput label="Country" isRequired={true} name="country" />
                        <div className="first-last">
                            <AnimatedInput label="First name" isRequired={true} name="first_name" />
                            <AnimatedInput label="Last name" isRequired={true} name="last_name" />
                        </div>
                        <AnimatedInput label="Address" isRequired={true} name="address" />
                        <AnimatedInput name="apartment" isRequired={false} label="Apartment" />
                        <div className="city-state-zip">
                            <AnimatedInput name="city" isRequired={true} label="City" />
                            <AnimatedInput name="state" isRequired={true} label="State" />
                            <AnimatedInput name="zipcode" isRequired={true} label="ZIP code" />
                        </div>
                        <AnimatedInput name="phone" isRequired={false} label="Phone Number" />
                    </div>
                    
                    <div className="form-bottom-row">
                        <a href="/cart" className="return-cart">
                            <svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 512.006 512.006" xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M388.419,475.59L168.834,256.005L388.418,36.421c8.341-8.341,8.341-21.824,0-30.165s-21.824-8.341-30.165,0
                                        L123.586,240.923c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251
                                        c5.461,0,10.923-2.091,15.083-6.251C396.76,497.414,396.76,483.931,388.419,475.59z"/>
                                </g>
                            </g>
                            </svg>
                            <p>Return to cart</p>
                        </a>
                        <button className="continue-button" type="submit">Continue to payment</button>
                    </div>
                </form>
            </section>
        </div>
    )

}