import {createAdminClient} from '../../../../utils/supabase/server'
import Header from '../../components/Header'
import CategoryPage from '../../components/CategoryPage'
import { notFound } from 'next/navigation';

export async function generateStaticParams(){
    try{
        const db = await createAdminClient();
        const {data: categories} = await db.from('category').select('name');
        
        if(categories){
            return categories.map((c: any) => ({
                category: c.name.replace(' ', '-'),
            }));
        }
        else{
            return []
        }
    }
    catch(err){
        console.error('Error fetching categories:', err);
    }
}

export default async function Page({params}: {params: {category: string}}){
    const db = await createAdminClient();

    const {data: categories} = await db.from('category').select('name');

    const valid = categories?.map((c: any) => c.name.replace(' ', '-')) || []

    if(!valid.includes(params.category)){
        notFound();
    }

    const category = params.category;

    return (
        <main>
            <Header />
            <CategoryPage category={category} />
            <h1>{category}</h1>
        </main>
    )
}