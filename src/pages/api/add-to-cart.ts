import { NextApiRequest, NextApiResponse } from "next";
import { AddItemHandler } from "@/app/components/category-item_dynamic/AddItemToCart";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'Not allowed'});
    }
    const {product_id} = req.body;

    const query_id = Number((product_id as string).replace(/[^0-9]/g, ''))

    await AddItemHandler(query_id);
    return res.status(200).json({status: 'ok'})
}
