import { NextRequest, NextResponse } from "next/server";
import { AddItemHandler } from "@/app/components/category-item_dynamic/AddItemToCart";

export async function POST(req: NextRequest){
    
    const body = await req.json();
    console.log(body.product_id);
    const query_id = Number(body.product_id)

    const response = await AddItemHandler(query_id);
    return response ?? NextResponse.json({status: 'ok'});
}
