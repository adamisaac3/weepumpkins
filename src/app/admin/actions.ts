'use server'
import { createAdminClient } from '../../../utils/supabase/server'

export async function AddItemToDB(formData: FormData){
    const db = await createAdminClient()
    console.log(db.auth.getUserIdentities())
    const form = {
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        subcategory: formData.get('subcategory') as string,
        description: formData.get('description') as string,
        price: formData.get('price') as unknown,
        images: formData.getAll('images') as File[]
    }

    const image_names = form.images.map((img) => {
        return img.name;
    })

    const {data, error} = await db.rpc('insert_product', {
        p_name: form.name,
        p_category: form.category,
        p_subcategory: form.subcategory,
        p_description: form.description,
        p_price: form.price,
        p_image_filenames: image_names
    })
    
    if(!error){
        form.images.forEach(async (img) => {
            const {data, error} = await db.storage.from('files').upload(`${form.category}/${img.name}`, img)
        })
    }

}