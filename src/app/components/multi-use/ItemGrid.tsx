'use client'
import {useState, useEffect, Dispatch, SetStateAction} from 'react'
import SwappableImage from './SwappableImage'


export default function Component({filters, setProductCount} : {filters: { category: string, subcategory: string, minPrice: string, maxPrice: string }, setProductCount: Dispatch<SetStateAction<number | undefined>>}){

    const [items, setItems] = useState<{id: number, product_name: string, category_id: number, subcategory_id: number, description: string, price: number, dimensions: string, category_name: string, subcategory_name: string, item_count: number}[]>()
    const [images, setImages] = useState<{product_id: number, image_path: string, image_type: string}[]>()
    const [displayProducts, setDisplayProducts] = useState<{id: number, product_name: string, category_id: number, subcategory_id: number, description: string, price: number, dimensions: string, category_name: string, subcategory_name: string, thumbnail: string, secondary: string, url: string}[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try{

                const queryParams = new URLSearchParams({
                    category: filters.category !== "" ? filters.category : "",
                    subcategory: filters.subcategory !== "" ? filters.subcategory : "",
                    minPrice: filters.minPrice !== "" ? filters.minPrice : "",
                    maxPrice: filters.maxPrice !== "" ? filters.maxPrice : "",
                })

                const response = await fetch(`/api/items?${queryParams}`)
                const {items, images} = await response.json()

                if(response.ok){
                    setItems(items)
                    setImages(images)
                }
            }
            catch(error){
                console.log((error as Error).message)
            }
        }

        fetchItems();
    }, [filters])

    useEffect(() => {
        if(items && images){

            if(items.length > 0){
                setProductCount(items[0].item_count)
            }

            const productData = items.map((i) => {
                const thumbnail = images.find((img) => 
                    img.product_id === i.id && 
                    (img.image_type === 'thumbnail' || img.image_type === 'front')
                )?.image_path;

                const secondary = images.find((img) => 
                    img.product_id === i.id && 
                    (img.image_type === 'back' || !img.image_type)
                )?.image_path;
               
                const sanitizedProductName = i.product_name.replace(/[:\/_<>\s]/g, '-').toLowerCase();
                const urlCategory = i.category_name.replace(' ', '-').toLowerCase();

                return {
                    id: i.id,
                    thumbnail,
                    secondary,
                    url: `/collections/${urlCategory}/${sanitizedProductName}-${i.id}`,
                };
            });

            const thumbnails = productData.map((p) => [p.id, p.thumbnail]);
            const secondary = productData.map((p) => [p.id, p.secondary]);
            const urlsArr = productData.map((p) => [p.id, p.url]);

            const display = items.map((i) => {
                const thumbnail = thumbnails.find((t) => t[0] === i.id)
                const second = secondary.find((img) => img[0] === i.id)
                const url = urlsArr.find((u) => u[0] === i.id)
                return {
                    ...i,
                    thumbnail: thumbnail ? thumbnail[1] : "",
                    secondary: second ? second[1] : "",
                    url: url ? url[1] : "",
                };
            });
        
            setDisplayProducts((display || []).map((item) => ({
                id: item.id,
                product_name: item.product_name,
                category_id: item.category_id,
                subcategory_id: item.subcategory_id,
                description: String(item.description ?? ""),
                price: Number(item.price ?? 0),
                dimensions: String(item.dimensions ?? ""),
                category_name: String(item.category_name ?? ""),
                subcategory_name: String(item.subcategory_name ?? ""),
                thumbnail: String(item.thumbnail ?? ""),
                secondary: String(item.secondary ?? ""),
                url: String(item.url ?? ""),
            })));
        };
    }, [items, images])
    
    
    return(
        <div className="item-grid">
            {displayProducts && 
                displayProducts.map((p) => {

                    return (
                        <div key={p.id} className="item">
                            <a href={p.url}>
                                <SwappableImage thumbnail={p.thumbnail} alt={p.secondary} category={p.category_id} />
                            </a>
                            <div className="category-div">
                                <p className="item-name">{p.product_name}</p>
                                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                                </svg>
                                <p className="item-subcategory">{p.subcategory_name}</p>
                            </div>
                            <div className="item-price-div">
                                <p className="item-price">$ {p.price} USD</p>
                            </div>
                            
                        </div>
                    )
                })

            }

        </div>
    )

}