import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { createAdminClient } from "../../../utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const config = {
    api:{
        bodyParser: false,
    }
}

export default async function StripeHandler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== "POST"){
        return res.status(405).json({error: "Error"})
    }

    const sig = req.headers['stripe-signature']

    const buf = await buffer(req);

    let event: Stripe.Event;

    try{
        event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_KEY!)
        
    }
    catch(error){
        console.log(error);
        return res.status(400).json({error: "Error"})
    }

    if(event.type === 'payment_intent.succeeded'){
        const db = await createAdminClient();

        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const {error} = await db.rpc('insert_order', {
            order_payment_intent: paymentIntent.id,
            order_price: paymentIntent.metadata.price,
            customer_name: `${paymentIntent.metadata.first} ${paymentIntent.metadata.last}`,
            customer_email: paymentIntent.metadata.email,
            customer_country: paymentIntent.metadata.country,
            customer_address: paymentIntent.metadata.addr,
            customer_apartment: paymentIntent.metadata.apt,
            customer_city: paymentIntent.metadata.city,
            customer_state: paymentIntent.metadata.state,
            customer_zipcode: paymentIntent.metadata.zip,
            customer_phone: paymentIntent.metadata.phone,
            customer_items: paymentIntent.metadata.item_ids.split(',') 
        })
    
        if(error){
            console.log(error);
            return res.status(400).json({error: "Error"})
        }
    }

    return res.status(200).json({success: "Webhook succeeded"})
}   