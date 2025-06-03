import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const config = {
    api:{
        bodyParser: false,
    }
}

export default function StripeHandler(req: NextApiRequest, res: NextApiResponse){

    const sig = req.headers['stripe-signature']
    const buf = await arrayBuffer(req);
    let event: Stripe.Event;
    try{
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    }

    console.log('webhook recieved')
}   