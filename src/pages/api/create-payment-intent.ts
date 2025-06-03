import { NextApiRequest, NextApiResponse } from "next";
import { createAdminClient } from "../../../utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string)


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST'){
        return res.status(405).json({error: "ERROR"})
    }

    const {items, email, country, first_name, last_name, address, apartment, city, state, zip, phone} = req.body;

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
            metadata: {
                email: email,
                country: country,
                first: first_name,
                last: last_name,
                addr: address,
                apt: apartment,
                city: city,
                state: state,
                zip: zip,
                phone: phone
            }
        })
        
        return res.status(200).json({client_secret: paymentIntent.client_secret})
    }

    return res.status(400).json({error: "ERROR"})
}