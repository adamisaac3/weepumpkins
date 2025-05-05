import {NextApiRequest, NextApiResponse} from 'next';
import {IncomingForm} from 'formidable';
import { createAdminClient } from '@/../utils/supabase/server'

import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,  
  },
};

function parseForm(req: NextApiRequest): Promise<{ fields: any; files: any }> {
  const form = new IncomingForm({ multiples: true, maxFileSize: 10 * 1024 * 1024 });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fields, files } = await parseForm(req);
    const db = await createAdminClient();

    const images = Array.isArray(files.images) ? files.images : [files.images];
    const imageNames = images.map((img: any) => img.originalFilename);

    let data, error;

    if (fields.category[0] === 'Clothing') {
      ({ data, error } = await db.rpc('insert_clothing', {
        p_name: fields.name[0],
        p_category: fields.category[0],
        p_subcategory: fields.subcategory[0],
        p_description: fields.description[0],
        p_dimensions: fields.dimensions[0],
        p_disclaimers: fields.disclaimers[0],
        p_price: Number(fields.price),
        p_images: imageNames,
      }));
    } else {
      ({ data, error } = await db.rpc('insert_product', {
        p_name: fields.name,
        p_category: fields.category,
        p_subcategory: fields.subcategory,
        p_description: fields.description,
        p_price: Number(fields.price),
        p_image_filenames: imageNames,
      }));
    }

    if (!error) {
      for (const img of images) {
        const buffer = fs.readFileSync(img.filepath);
        await db.storage.from('files').upload(`${fields.category}/${img.originalFilename}`, buffer);
      }
    }

    return res.status(200).json({ success: !error, data, error });
  } catch (err) {
    return res.status(500).json({ error: 'Upload failed', detail: (err as Error).message });
  }
}