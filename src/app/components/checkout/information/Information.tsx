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
        <>
            <header className="checkout-head">
                <Image src="/checkout-art.png" alt="Checkout art" width={185} height={33} />
                <menu>
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
            <section>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="initial-contact">
                        <h2>Contact</h2>
                        <input name="email" type="email" placeholder="Email" required />
                    </div>
                    <div>
                        <h2>Delivery Disclaimer</h2>
                        <p>
                            Currently shipping is only available to locations within the United States.
                            If you wish for international shipping please <AnimatedLink href="/contact" linkText="contact me" />
                        </p>
                    </div>
                    <div className="shipping-info">
                        <AnimatedInput label="Country" value="value" name="country" />
                        <input name="first_name" placeholder="First name" defaultValue={first_name} required></input>
                        <input name="last_name" placeholder="Last name"required/>
                        <input name="address" placeholder="Address" required/>
                        <input name="apartment" placeholder="Apartment" />
                        <input name="city" placeholder="City"  required/>
                        <input name="state" placeholder="State" required/>
                        <input name="zipcode" placeholder="Zip Code" required/>
                        <input name="phone" type="tel" placeholder="Phone Number" defaultValue={phone} />
                    </div>
                    
                    <div className="form-bottom-row">
                        <a href="/cart">
                            <p>Return to cart</p>
                        </a>
                        <button type="submit">Continue to payment</button>
                    </div>
                </form>
            </section>
        </>
    )

}