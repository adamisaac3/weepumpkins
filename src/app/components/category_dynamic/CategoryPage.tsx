'use client'
import {useEffect, useState} from 'react'

export default function Component({category} : {category: string}){
    type Item = Record<number, {product_name: string, price: number, category_name: string, subcategory_name: string, thumbnail: string, alts: string[], item_count: number}>
    
    const [items, setItems] = useState<Item>();

    useEffect(() => {
        const getItems = async () => {
            try{
                const response = await fetch(`/api/get-items-from-category?category=${category}`)

                const {data, images} = await response.json();

                if(response.ok){
                    


                }
            }
            catch(err){
                console.log((err as Error).message);
            }
        }

        getItems();
    }, [])
    
   
    return (
        <h1>Shop All {category}</h1>
    )
}