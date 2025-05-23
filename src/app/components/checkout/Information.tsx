import { useCheckoutStore } from "@/app/stores/useCheckoutStore";
import Image from "next/image";
import AnimatedLink from "../multi-use/AnimatedLink";

export default function InformationForm(){
    const setCheckoutInfo = useCheckoutStore((s) => s.setCheckoutInfo)

    const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckoutInfo({[e.target.name]: e.target.value})
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
                <div className="initial-contact">
                    <h2>Contact</h2>
                    <input type="text"></input>
                </div>
                <div>
                    <h2>Delivery Disclaimer</h2>
                    <p>
                        Currently shipping is only available to locations within the United States.
                         If you wish for international shipping please <AnimatedLink href="/contact" linkText="contact me" />
                    </p>
                </div>
            </section>
        </>
    )

}