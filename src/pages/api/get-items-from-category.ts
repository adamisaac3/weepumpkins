import {NextApiRequest, NextApiResponse} from 'next'
import {createAdminClient} from '../../../utils/supabase/server'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json({error: "Method not allowed"});
    }
    try{
        const {category} = req.query;
        let queryable = '';
        
        if(typeof(category) === 'string'){
            queryable = category.replace('-', ' ')
        }

        const cleanCategory = queryable.replace(/[^a-zA-Z0-9\s-]/g, '');
        console.log(cleanCategory);
        const db = await createAdminClient();

        const {data, error} = await db.rpc('get_items_from_category', {req_category: cleanCategory})

        if(!error){
            
            const ids = data.map((row: any) => row.id)
            
            const images = await db.from('product_images').select('product_id, image_path, image_type').in('product_id', ids)

            return res.status(200).json({data: data, images: images});

        }
        return res.status(400).json({error: error});
    }
    catch(err){
        return res.status(400).json({error: (err as Error).message})
    }
}