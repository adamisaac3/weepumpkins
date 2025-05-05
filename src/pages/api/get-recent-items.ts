import { createAdminClient } from "../../../utils/supabase/server";
import {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    if(req.method !== "GET"){
        return res.status(405).json({error: "Method not allowed"});
    }

    try{
        const db = await createAdminClient();

        const{data, error} = await db.from('products').select('*').order('created_at', {ascending: false}).limit(4);

        if(error){
            throw new Error(error.message);
        }

        const ids = data.map((d) => d.id)

        const {data: images, error: imagesError} = await db.from('product_images').select('product_id, image_path, image_type').in('product_id', ids);

        return res.json({items: data, images: images});
    }
    catch(err){
        res.json({error: err instanceof Error ? err.message : "An unknown error occurred"}, )
    }
}
