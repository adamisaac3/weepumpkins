import {NextApiRequest, NextApiResponse} from 'next'
import {createAdminClient} from '../../../utils/supabase/server'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).json({error: 'Method not allowed'});
    }

    const db = await createAdminClient();

    const{data, error} = await db.rpc('get_events')

    if(!error){
        return res.status(200).json(data)
    }
    return res.status(405).json({error: error});
}