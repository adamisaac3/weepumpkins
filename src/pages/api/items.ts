import { NextApiRequest, NextApiResponse } from "next";
import {createAdminClient} from '../../../utils/supabase/server'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json({error: 'Method not allowed'});
    }

    try{
        
        const db = await createAdminClient();
        
        const values = {
            req_category: req.query.category && typeof req.query.category === 'string' ? req.query.category.replace(/[^a-zA-Z0-9\s-]/g, '') : null,
            req_subcategory: req.query.subcategory && typeof req.query.subcategory === 'string' ? req.query.subcategory.replace(/[^a-zA-Z0-9\s-]/g, '') : null,
            req_minprice: req.query.minPrice && req.query.priceMin ? !isNaN(Number(req.query.priceMin)) : null,
            req_maxprice: req.query.maxPrice && req.query.priceMax ? !isNaN(Number(req.query.priceMax)) : null
        }

        const {data, error} = await db.rpc('get_items', values)


        if(!error){
            const ids = data.map((row: any) => row.id)
            const {data: images, error: imagesError} = await db.from('product_images').select('product_id, image_path, image_type').in('product_id', ids)

            if(!imagesError){
                return res.status(200).json({items: data, images: images})
            }
            return res.status(400).json({error: imagesError})
        }

        return res.status(400).json({error: error})
    }
    catch(err){
        return res.status(400).json({error: (err as Error).message});
    }
}
