import {GetStaticPaths, GetStaticProps} from 'next'
import {createAdminClient} from '../../../utils/supabase/server'

export const getStaticPaths: GetStaticPaths = async () => {
    try{
        const db = await createAdminClient();
        const categories = await db.from('category').select('*');

        if(categories.data && Array.isArray(categories.data)){
            return {
                paths: categories.data.map((c: any) => ({
                    params: {category: c.name.toLowerCase()}
                })),
                fallback: false,
        };
        }
        return {
            paths: [],
            fallback: false, 
        };
    }
    catch(err){
        console.error('Error fetching categories:', err);
        return {
            paths: [],
            fallback: false, // Return a valid fallback object in case of an error
        };
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const db = await createAdminClient();

    const category = context.params?.category as string;
    return {
        props: {category}
    };
}

export default function Page({category}: {category: string}){
    return <h1>{category}</h1>
}