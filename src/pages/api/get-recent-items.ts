import { createAdminClient } from "../../../utils/supabase/server";
import {NextApiRequest, NextApiResponse} from 'next';

type QueryItem = {
    product_id: number,
    product_name: string,
    category_name: string,
    category_id: number,
    subcategory_name: string,
    price: number,
    image_path: string,
    image_type: string
}

type RecentItem = {
    product_id: number,
    product_name: string,
    category_name: string,
    category_id: number,
    subcategory_name: string,
    price: number,
    product_url: string,
    thumbnail: string | null,
    altImage: string | null
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    
    if(req.method !== "GET"){
        return res.status(405).json({error: "Method not allowed"});
    }

    try{
        const db = await createAdminClient();

        const{data, error} = await db.rpc('get_recent_items');

        if(!error){
            const itemMap: Record<number, RecentItem> = {}

            data.forEach((row: QueryItem) => {
                if(!itemMap[row.product_id]){
                    const url = `/collections/${row.category_name.replace(' ', '-').toLowerCase()}/${row.product_name.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()}-${row.product_id}`
                    
                    itemMap[row.product_id] = {
                        product_id: row.product_id,
                        product_name: row.product_name,
                        category_name: row.category_name,
                        category_id: row.category_id,
                        subcategory_name: row.subcategory_name,
                        price: row.price,
                        product_url: url,
                        thumbnail: null,
                        altImage: null
                    }
                }
            
                if(row.image_type === 'front' || row.image_type === 'thumbnail'){
                    itemMap[row.product_id].thumbnail = row.image_path
                }
                else if(row.image_type === 'back'){
                    itemMap[row.product_id].altImage = row.image_path
                }
                else if(itemMap[row.product_id].altImage === null) {
                    itemMap[row.product_id].altImage = row.image_path
                }
            })
        
            return res.status(200).json(Object.values(itemMap))
        }
    
        return res.status(400).json({error: "Error"})
    }
    catch(err){
        res.json({error: err instanceof Error ? err.message : "An unknown error occurred"}, )
    }
}
