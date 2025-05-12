import { createAdminClient } from "../../../utils/supabase/server";
import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    if(req.method !== "GET"){
        return res.status(405).json({error: "Method not allowed"});
    }

    try{
        const db = await createAdminClient();

        const{data, error} = await db.rpc('filter_sidebar');

        if(!error){
            return res.status(200).json(data)
        }
        return res.status(400).json({error:error})
    }
    catch(err){
        res.status(400).json({error: err instanceof Error ? err.message : "An unknown error occurred"}, )
    }
}
