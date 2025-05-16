import {createAdminClient} from '../../../../../utils/supabase/server'
import { notFound } from 'next/navigation';

import './page.css'
import PageShell from '@/app/components/category-item_dynamic/PageShell';

type MySafePageProps = {params: {category: string, item: string}}

export async function generateStaticParams(){
    
    try {
        
        const db = await createAdminClient();

        const {data: items, error} = await db.rpc('get_all_items')

        if (!error && items) {
            return items.map((i: {id: number, product_name: string, category_name: string}) => {
                const sanitizedProductName = i.product_name.replace(/[:\/_<>\s]/g, '-').toLowerCase();
                const urlCategory = i.category_name.replace(' ', '-').toLowerCase();

                const item = sanitizedProductName + `-${i.id}`
                
                return {category: urlCategory, item: item}
            })
        }
        return [];
    }
    catch(err){
        console.log(err);
        return [];
    }

    
}

export default async function Page( {params}: MySafePageProps){

    const cleanItem = params.item && typeof (params.item) === 'string' ? params.item.replace(/[^a-zA-Z0-9\s-]/g, '') : null
    const cleanCat = params.category && typeof (params.category) === 'string' ? params.category.replace(/[^a-zA-Z0-9\s-]/g, '') : null
    
    if(!cleanCat || !cleanItem) notFound();

    const queryCat = cleanCat.split('-').map((row) => row.charAt(0).toUpperCase() + row.slice(1)).join(' ');

    const productArr = cleanItem?.split('-')
    
    let itemData, imageData
    const id  = productArr.pop();

    const compare = productArr.join('-');

    if (productArr) {
        const db = await createAdminClient();
        
        const { data: item, error } = await db.rpc('get_item', {
            req_id: Number(id),
            req_product: null,
            req_category: queryCat
        });

        if(!item || error || item.length === 0 || (item[0].productname as string).replace(/[:\/_<>\s]/g, '-').toLowerCase() !== compare){
            console.log(error)
            notFound();
        }

        const {data: images, error: imagesError} = await db.from('product_images').select('product_id, image_path, image_type').eq('product_id',item[0].productid)


        if(imagesError || !images){
            console.log(error);
            notFound();
        }

        itemData = item[0];
        imageData = images;
    }

    let thumbnail = '';
    const alts: string[] = [];

    imageData?.forEach((img) => {
        if(img.image_type === 'front' || img.image_type === 'thumbnail'){
            thumbnail = img.image_path;
        }
        else{
            alts.push(img.image_path);
        }
    })

    
    return (
        <>
            <PageShell item={itemData} alts={alts} thumbnail={thumbnail} />
        </>
    )

}