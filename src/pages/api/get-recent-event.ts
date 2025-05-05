import { createAdminClient } from '@/../utils/supabase/server'
import {NextApiRequest, NextApiResponse} from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json({error: 'Method not allowed'})
    }
    try{
        const db = await createAdminClient();
        const {data: event, error}  = await db.rpc('get_recent_event')

        if(!error){
            return res.json({event: event})
        }

        return res.json({error: error});
    }
    catch(err){
        return res.json({error: (err as Error).message});
    }

    

    
}