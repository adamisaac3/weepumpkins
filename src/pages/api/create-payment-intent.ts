import { NextApiRequest, NextApiResponse } from "next";
import { createAdminClient } from "../../../utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string)


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST'){
        return res.status(405).json({error: "ERROR"})
    }
    console.log('secret key ' + process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string)
    const {items} = req.body;

    const db = await createAdminClient();

    const { data: prices, error } = await db
        .from('products')
        .select('price')
        .in('id', items) as { data: { price: number }[] | null; error: Error | null };
    
    if(!error && prices){
        const totalPrice = prices.reduce((acc, row) => acc + row.price, 0)
    
        const finalPrice = Math.round(totalPrice * 100)
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: finalPrice,
            currency: 'usd',
            automatic_payment_methods: {enabled: true},
        })
        
        return res.status(200).json({client_secret: paymentIntent.client_secret})
    }

    return res.status(400).json({error: "ERROR"})
}