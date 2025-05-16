import {NextApiRequest, NextApiResponse} from 'next';
import {Fields, Files, IncomingForm} from 'formidable';
import { createAdminClient } from '@/../utils/supabase/server'

import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,  
  },
};

function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
    const form = new IncomingForm({ multiples: true, maxFileSize: 10 * 1024 * 1024 * 1024, allowEmptyFiles: true, minFileSize: 0 });
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
    let images: Array<import('formidable').File> = [];

    const getField = (field: string | string[] | undefined) => Array.isArray(field) ? field[0] : field;

    const category = getField(fields.category);
    const subcategory = getField(fields.subcategory);
    const name = getField(fields.name);
    const description = getField(fields.description);
    const dimensions = getField(fields.dimensions);
    const price = Number(getField(fields.price));

    if (category === '2') {
      images = [
        ...(Array.isArray(files.thumbnail) ? [files.thumbnail[0]] : []),
        ...(Array.isArray(files.additional) ? [files.additional[0]] : [])
      ];
      const imageNames = images.map((img) => img.originalFilename);

      ({ data, error } = await db.rpc('insert_clothing', {
        p_name: name,
        p_category: Number(category),
        p_subcategory: subcategory === '' ? null : Number(subcategory),
        p_description: description,
        p_dimensions: dimensions,
        p_price: price,
        p_images: imageNames,
      }));
    } else {
      // Other categories
      images = Array.isArray(files.additional) ? files.additional : [];
      const thumbnail = Array.isArray(files.thumbnail) ? files.thumbnail[0] : files.thumbnail;
      const thumbnailName = thumbnail?.originalFilename;
      const imageNames = images.map((img) => img.originalFilename);

      ({ data, error } = await db.rpc('insert_product', {
        p_name: name,
        p_category: category,
        p_subcategory: subcategory === '' ? null : Number(subcategory),
        p_description: description,
        p_dimensions: dimensions,
        p_price: price,
        p_thumbnail: thumbnailName,
        p_images: imageNames,
      }));

      if (thumbnail) images.push(thumbnail);
    }

    if (!error) {
      for (const img of images) {
        const buffer = fs.readFileSync(img.filepath);
        await db.storage.from('files').upload(`${fields.category}/${img.originalFilename}`, buffer);
      }
    }

    return res.status(200).json({ success: !error, data, error });
  } catch (err) {
    return res.status(500).json({ error: 'Upload failed', detail: (err as Error).message, stack: (err as Error).stack});
  }
}