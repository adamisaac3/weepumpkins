import {NextApiRequest, NextApiResponse} from 'next'
import { createAdminClient } from '../../../utils/supabase/server'

type Order = {
    payment_intent: string,
    price: number,
    name: string,
    email: string,
    country: string,
    address: string,
    apartment: string,
    city: string,
    state: string,
    zipcode: string,
    phone: string,
    ordered_at: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET' || !req.query['payment_intent']){
        return res.status(400).json({error: "Error"})
    }

    try{
        const db = await createAdminClient();
        
        const payment_intent = Array.isArray(req.query['payment_intent']) ? req.query['payment_intent'][0] : req.query['payment_intent'];

        const isValidPaymentIntent = typeof payment_intent === 'string' && /^pi_[a-zA-Z0-9]{10,}$/.test(payment_intent);

        if(!isValidPaymentIntent){
            return res.status(400).json({error: "invalid payment intent"})
        }

        const {data, error} = await db.rpc('get_order', {req_payment: payment_intent})
        
        if(!error){
            return res.status(200).json(data)
        }

        return res.status(400).json({error: 'Error'})
    }
    catch(err){
        return res.status(400).json({error: "Error"})
    }
}