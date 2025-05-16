'use client'
import {useEffect, useState} from 'react'
import { arrayBuffer } from 'stream/consumers';
import SwappableImage from '../multi-use/SwappableImage'

export default function Component({category, id}: {category: string, id: number}){
    /*Right now it just gets the recent items. Obviously this needs to be changed in the future. */

    const [items, setItems] = useState<any>([]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/get-recent-items');
            const { items, images } = await response.json();

            console.log(items)
            console.log(images)

            if (response.ok) {
                const imageMap: Record<number, { thumbnail: string, altImages: string[] }> = {};

                images.forEach((img: { product_id: number, image_type: string, image_path: string }) => {
                    if (!imageMap[img.product_id]) {
                        imageMap[img.product_id] = { thumbnail: '', altImages: [] };
                    }

                    if (img.image_type === 'front' || img.image_type === 'thumbnail') {
                        imageMap[img.product_id].thumbnail = img.image_path
                    }
                    else {
                        imageMap[img.product_id].altImages.push(img.image_path);
                    }
                })

                console.log(imageMap);

                const updatedItems = items.map((i: {id: number, product_name: string, category_id: number, subcategory_id: number, description: string, price: number, dimensions: string, category_name: string, subcategory_name: string}) => {
                    if (imageMap[i.id]) {
                        return {...i, thumbnail: imageMap[i.id].thumbnail, altImages: imageMap[i.id].altImages};
                    }
                    return i; // Return the original item if no matching image is found
                });
                setItems(updatedItems);
            }
        
        }
        fetchItems();
    }, [])


    console.log('items right now' + items);
    return (
        <div className="recommendations-div">
            <h2 className="recommendations-header">YOU MAY ALSO LOVE THESE</h2>
            <div className="recommendations-items">
                {items && 
                    items.map((item: {id: number, product_name: string, category_id: number, subcategory_id: number, description: string, price: number, dimensions: string, category_name: string, subcategory_name: string, thumbnail: string, altImages: string[]}) => {
                        return (
                            <div key={item.id} className="recommendations-item">
                                <SwappableImage thumbnail={item.thumbnail} alt={item.altImages[0]} category={item.category_id}/>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}