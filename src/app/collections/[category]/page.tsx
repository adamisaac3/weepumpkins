import {createAdminClient} from '../../../../utils/supabase/server'
import PageShell from '@/app/components/category_dynamic/PageShell';
import { notFound } from 'next/navigation';

export async function generateStaticParams(){
    try{
        const db = await createAdminClient();
        const {data: categories} = await db.from('category').select('name');
        
        if(categories){
            return categories.map((c: {name: string}) => ({
                category: c.name.replace(' ', '-').toLowerCase(),
            }));
        }
        else{
            return []
        }
    }
    catch(err){
        console.error('Error fetching categories:', err);
        return [];
    }
}

export default async function Page({params}: {params: {category: string}}){
    const db = await createAdminClient();

    const {data: categories, error} = await db.from('category').select('name');

    if(!error && categories){
        const valid = categories.map((c: {name: string}) => c.name.replace(' ', '-').toLowerCase()) || []
        
        if(!valid.includes(params.category)){
            notFound();
        }   

        const category = params.category;

        return (
            <>
                <PageShell category={category}/>
            </>
        )
    }

    notFound();
}