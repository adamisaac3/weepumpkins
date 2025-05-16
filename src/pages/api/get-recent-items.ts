import { createAdminClient } from "../../../utils/supabase/server";
import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    if(req.method !== "GET"){
        return res.status(405).json({error: "Method not allowed"});
    }

    try{
        const db = await createAdminClient();

        const{data, error} = await db.rpc('get_recent_items');

        if(error){
            throw new Error(error.message);
        }
        
        const ids = data.map((d: {id: number}) => d.id)

        const {data: images, error: imagesError} = await db.from('product_images').select('product_id, image_path, image_type').in('product_id', ids);
        
        if(!imagesError){
            return res.json({items: data, images: images});
        }

        return res.json({error: imagesError});
    }
    catch(err){
        res.json({error: err instanceof Error ? err.message : "An unknown error occurred"}, )
    }
}
