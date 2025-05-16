import {createAdminClient} from '../../../../utils/supabase/server'
import PageShell from '@/app/components/category_dynamic/PageShell';
import { notFound } from 'next/navigation';

export async function generateStaticParams(){
    try{
        const db = await createAdminClient();
        const {data: categories} = await db.from('category').select('name');
        
        if(categories){
            return categories.map((c: {name: string}) => ({
                params : {category: c.name.replace(' ', '-').toLowerCase()},
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

type CategoryPageProps = Promise<{
    category: string
}>

export default async function Page({params}: {params: CategoryPageProps}){
    const awaited = await params;
    const {category} = awaited
    
    const db = await createAdminClient();

    const {data: categories, error} = await db.from('category').select('name');

    if(!error && categories){
        const valid = categories.map((c: {name: string}) => c.name.replace(' ', '-').toLowerCase()) || []
        
        if(!valid.includes(category)){
            notFound();
        }   

        return (
            <>
                <PageShell category={category}/>
            </>
        )
    }

    notFound();
}