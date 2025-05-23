import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

function fetchClientSecret(){

}

export default function Page(){
    return(
        <main>
            <CheckoutProvider stripe={stripePromise} options={{fetchClientSecret: () => new Promise((res, rev) => console.log('promise'))}}/>
        </main>
    )
}   
