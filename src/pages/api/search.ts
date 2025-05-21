import { NextApiRequest, NextApiResponse } from "next";
import { createAdminClient } from "../../../utils/supabase/server";

type QueryItem = {
    result_type: string,
    product_name: string,
    product_id: number,
    product_thumbnail: string,
    product_category_id: number,
    subcategory: string,
    category: string
}

type Product = {
    product_name: string,
    product_thumbnail: string,
    product_category_id: number,
    product_url: string
}

type Collection = {
    collection_name: string,
    collection_url: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json({error: "Not allowed"});
    }

    try{
        const db = await createAdminClient();

        const query: string = req.query.q as string;

        const {data, error} = await db.rpc('search', {searchterm: query});
        
        if(!error){
            const products: Product[] = []
            const collections: Collection[] = []
            
            data.forEach((row: QueryItem) => {
                if(row.product_name){
                    const url = `/collections/${row.product_name.replace(' ', '-').toLowerCase()}-${row.product_id}`
                    products.push({product_url: url, product_name: row.product_name, product_thumbnail: row.product_thumbnail, product_category_id: row.product_category_id})
                }
                else if(row.category){
                    const url = `/collections/${row.category.replace(' ', '-').toLowerCase()}`
                    collections.push({collection_url: url, collection_name: row.category})
                }
                else if(row.subcategory){
                    const url = `/collections/${row.subcategory.replace(' ', '-').toLowerCase()}`
                    collections.push({collection_url: url, collection_name: row.subcategory})
                }
                
            })

            return res.status(200).json({products: products, collections: collections});
        }
        
        return res.status(400).json({error: error});
    }
    catch(err){
        console.log((err as Error).message)
        return res.status(400).json({error: "Error"})
    }

}