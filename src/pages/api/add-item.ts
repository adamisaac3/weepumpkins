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
  const form = new IncomingForm({ multiples: true, maxFileSize: 10 * 1024 * 1024, allowEmptyFiles: true, minFileSize: 0 });
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

    let data, error;
    let images;

    if (fields.category[0] === 'Clothing') {

      images = [files.thumbnail[0], files.additional[0]];
      const imageNames = images.map((img: any) => img.originalFilename);

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

      images = Array.isArray(files.additional) ? files.additional : [];
      const thumbnailName = files.thumbnail[0].originalFilename;
      const imageNames = images.map((img: any) => img.originalFilename);

      ({ data, error } = await db.rpc('insert_product', {
        p_name: fields.name[0],
        p_category: fields.category[0],
        p_subcategory: fields.subcategory[0],
        p_description: fields.description[0],
        p_dimensions: fields.dimensions[0],
        p_disclaimers: fields.disclaimers[0],
        p_price: Number(fields.price),
        p_thumbnail: thumbnailName,
        p_images: imageNames,
      }));

      images.push(files.thumbnail[0]);
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