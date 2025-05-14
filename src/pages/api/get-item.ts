import { NextApiRequest, NextApiResponse } from "next";
import { createAdminClient } from "../../../utils/supabase/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    if(req.method !== 'GET'){
        return res.status(405).json({error: "Method now allowed"})
    }

    try {
        let cleanCat = req.query.category && typeof (req.query.category) === 'string' ? req.query.category.replace(/[^a-zA-Z0-9\s-]/g, '') : null
        let cleanItem = req.query.item && typeof (req.query.item) === 'string' ? req.query.item.replace(/[^a-zA-Z0-9\s-]/g, '') : null


        if (cleanCat && cleanItem) {
            const queryCat = cleanCat.split('-').map((row) => row.charAt(0).toUpperCase() + row.slice(1)).join(' ');

            const fullProduct = cleanItem.split('-');

            const id = Number(fullProduct.pop());

            const product = fullProduct.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


            const db = await createAdminClient();

            const {data: item, error} = await db.rpc('get_item', {
                req_id: id,
                req_product: product,
                req_category: queryCat
            })

            if(!error){
                const { data: images, error: imagesError } = await db.from("product_images").select('product_id, image_path, image_type').eq('product_id', id);
            
                if(!imagesError){
                    return res.status(200).json({item: item, images: images});
                }
            }

            return res.status(400).json({ error: error })
        }

        return res.status(200).json({ error: 'Error' });
    }
    catch(error){
        return res.status(400).json({error: (error as Error).message})
    }
}