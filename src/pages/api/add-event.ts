import {NextApiRequest, NextApiResponse} from 'next';
import {IncomingForm} from 'formidable';
import { createAdminClient } from '@/../utils/supabase/server'
import fs from 'fs'
export const config = {
    api: {
      bodyParser: false,  
    },
};

function parseForm(req: NextApiRequest): Promise<{fields:any, files:any}>{
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

        const thumbnail = files['event-thumbnail'][0]
        console.log(thumbnail);
        
        const thumbName = thumbnail.originalFilename;
        console.log(thumbName);
        
        const { data, error } = await db.from('events')
        .insert({
            name: fields['event-name'][0],
            address: fields['event-address'][0],
            state: fields['event-state'][0],
            start_date: fields['event-start-date'][0],
            end_date: fields['event-end-date'][0],
            start_time: fields['event-start-time'][0],
            end_time: fields['event-end-time'][0],
            thumbnail: thumbName,
            booth: fields['event-booth-number'][0],
            city: fields['event-city'][0],
            event_url: fields['event-url'][0]
        });

        if(!error){
            const buffer = fs.readFileSync(thumbnail.filepath);
            const {data: imageUpload, error: imageError} = await db.storage.from('files')
            .upload(`Events/${thumbName}`, buffer)

            if(!imageError){
                return res.status(200).json({success: 'Event upload sucess!'})
            }
            else{
                return res.status(405).json({error: imageError.message})
            }
        }
        else{
            return res.status(405).json({error: error.message})
        }

    }
    catch(err){
        return res.status(405).json({error: (err as Error).message})
    }

}