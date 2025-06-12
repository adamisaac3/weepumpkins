import { NextApiRequest, NextApiResponse } from "next";
import { createAdminClient } from "../../../utils/supabase/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(400).json({error: "Error"})
    }

    const {ids, session_id: sessionID} = req.body
    
    const req_ids: number[] = ids.split(',').map((num: string) => parseInt(num))
    
    try{
        const db = await createAdminClient();
        
        const {data, error} = await db.rpc('make_reservation', {product_ids: req_ids, req_session_id: sessionID})

        if(!error){
            if(data){
                return res.status(200).json({reserved: data})
            }
            else{
                return res.status(200)
            }
        }
        
        return res.status(400).json({error: error.message})

    }
    catch(err){
        return res.status(400).json({error: "Error"})
    }
}