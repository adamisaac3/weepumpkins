import {NextApiRequest, NextApiResponse} from 'next'
import { createAdminClient } from '../../../utils/supabase/server'
import { IncomingForm } from 'formidable'
import type { Fields, Files } from 'formidable';

function parseForm(req: NextApiRequest): Promise<{fields: Fields, files: Files}> {
    const form = new IncomingForm();
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                resolve({ fields, files });
            }
        });
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'Method not allowed'});
    }
    
    try{
        const db = await createAdminClient();
    
        const {fields} = await parseForm(req);
        
        const categoryField = fields['category'];
        const categoryName = Array.isArray(categoryField) ? categoryField[0] : categoryField;
        if (!categoryName) {
            return res.status(400).json({ error: 'Category name is required.' });
        }
        const { data, error } = await db.from('category').insert({
            name: categoryName
        })

        if(!error){
            return res.status(200).json(data);
        }
        return res.status(400).json({error: error});
    }
    catch(error){
        return res.status(400).json({error: (error as Error).message});
    }
   
}