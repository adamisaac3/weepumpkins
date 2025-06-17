import { NextApiRequest, NextApiResponse } from "next";
import {createAdminClient} from '../../../utils/supabase/server'
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json({error: "Not allowed"});
    }
    try {
        
        const category = req.query['category']

        if (category) {
            const queryableCat = (category as string).replace(/[^a-zA-Z0-9\s-]/g, '')

            const db = await createAdminClient();

            const { data, error } = await db.rpc('get_subcategories', { param_category: queryableCat });

            if (!error) {
                return res.status(200).json(data);
            }
        }
        
        return res.status(400).json({error: "Error"});
    }
    catch(err){
        console.log(err)
        return res.status(400).json({error: 'Error'});
    }
}