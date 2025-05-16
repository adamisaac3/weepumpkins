import {NextApiRequest, NextApiResponse} from 'next';
import {Fields, Files, IncomingForm} from 'formidable';
import { createAdminClient } from '@/../utils/supabase/server'
import fs from 'fs'
export const config = {
    api: {
      bodyParser: false,  
    },
};

function parseForm(req: NextApiRequest): Promise<{fields:Fields, files:Files}>{
    const form = new IncomingForm({maxFileSize: 10*1024*1024});
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) =>{
            if(err){
                reject(err)
            }
            else{
                resolve({fields, files});
            }
        })
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'Method not allowed'});
    }

    try{
        const {fields, files} = await parseForm(req);
        const db = await createAdminClient();

        
        const name = Array.isArray(fields['event-name']) ? fields['event-name'][0] : fields['event-name'];
        const address = Array.isArray(fields['event-address']) ? fields['event-address'][0] : fields['event-address'];
        const state = Array.isArray(fields['event-state']) ? fields['event-state'][0] : fields['event-state'];
        const start_date = Array.isArray(fields['event-start-date']) ? fields['event-start-date'][0] : fields['event-start-date'];
        const end_date = Array.isArray(fields['event-end-date']) ? fields['event-end-date'][0] : fields['event-end-date'];
        const start_time = Array.isArray(fields['event-start-time']) ? fields['event-start-time'][0] : fields['event-start-time'];
        const end_time = Array.isArray(fields['event-end-time']) ? fields['event-end-time'][0] : fields['event-end-time'];
        const booth = Array.isArray(fields['event-booth-number']) ? fields['event-booth-number'][0] : fields['event-booth-number'];
        const city = Array.isArray(fields['event-city']) ? fields['event-city'][0] : fields['event-city'];
        const event_url = Array.isArray(fields['event-url']) ? fields['event-url'][0] : fields['event-url'];
        const thumbnail = Array.isArray(files['event-thumbnail']) ? files['event-thumbnail'][0] : files['event-thumbnail'];
        const thumbName = thumbnail?.originalFilename || '';

        const { error: insertError } = await db.from('events').insert({
            name,
            address,
            state,
            start_date,
            end_date,
            start_time,
            end_time,
            thumbnail: thumbName,
            booth,
            city,
            event_url
        });

        if(!insertError && thumbnail){
            const buffer = fs.readFileSync(thumbnail.filepath);
            const {error: imageError} = await db.storage.from('files')
            .upload(`Events/${thumbName}`, buffer)

            if(!imageError){
                return res.status(200).json({success: 'Event upload sucess!'})
            }
            else{
                return res.status(400).json({error: imageError.message})
            }
        }
        else{
            return res.status(400).json({error: insertError ? insertError.message : "Error"})
        }

    }
    catch(err){
        return res.status(400).json({error: (err as Error).message})
    }

}