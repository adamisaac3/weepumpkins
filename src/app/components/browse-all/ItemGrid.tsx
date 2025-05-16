'use client'
import {useState, useEffect} from 'react'
import SwappableImage from '../multi-use/SwappableImage'


export default function Component({filters} : {filters: { category: string, subcategory: string, minPrice: string, maxPrice: string }}){

    const [items, setItems] = useState([])
    const [images, setImages] = useState<any>([])
    const [displayProducts, setDisplayProducts] = useState<any>([]);

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
            const productData = items.map((i: any) => {
                const thumbnail = images.find((img: any) => 
                    img.product_id === i.id && 
                    (img.image_type === 'thumbnail' || img.image_type === 'front')
                )?.image_path;

                const secondary = images.find((img: any) => 
                    img.product_id === i.id && 
                    (img.image_type === 'back' || !img.image_type)
                )?.image_path;
               
                const sanitizedProductName = (i.product_name as string).replace(/[:\/_<>\s]/g, '-').toLowerCase();
                const urlCategory = (i.category_name as string).replace(' ', '-').toLowerCase();

                return {
                    id: i.id,
                    thumbnail,
                    secondary,
                    url: `/collections/${urlCategory}/${sanitizedProductName}-${i.id}`,
                };
            });

            const thumbnails = productData.map((p: any) => [p.id, p.thumbnail]);
            const secondary = productData.map((p: any) => [p.id, p.secondary]);
            const urlsArr = productData.map((p: any) => [p.id, p.url]);

            const display = items.map((i:any) => {
                const thumbnail = thumbnails.find((t: any) => t[0] === i.id)
                const second = secondary.find((img: any) => img[0] === i.id)
                const url = urlsArr.find((u: any) => u[0] === i.id)
                return {
                    ...i,
                    thumbnail: thumbnail ? thumbnail[1] : null,
                    secondary: second ? second[1] : null,
                    url: url ? url[1] : null,
                };
            });
        
            setDisplayProducts(display || []);
        }
    }, [items, images])
    
    
    console.log(displayProducts)
    return(
        <div className="item-grid">
            {displayProducts && 
                displayProducts.map((p: any) => {

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