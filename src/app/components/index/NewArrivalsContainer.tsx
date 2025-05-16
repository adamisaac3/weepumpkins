'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image';

export default function NewArrivalsContainer(){
    const [products, setProducts] = useState<{id: number, product_name: string, category_id: number, subcategory_id: number, description: string, price: number, dimensions: string, category_name: string, subcategory_name: string}[]>();
    const [images, setImages] = useState<{product_id: number, image_path: string, image_type: string}[] | null>(null);
    const [errors, setErrors] = useState<string>();
    const [displayProducts, setDisplayProducts] = useState<{id: number, product_name: string, category_id: number, subcategory_id: number, description: string, price: number, dimensions: string, category_name: string, subcategory_name: string, thumbnail: string}[]>();


    
    
    useEffect(() => {
        const fetchRecentItems = async () =>{
            try{
                const response = await fetch('/api/get-recent-items');
            
                const {items, images}  = await response.json()
                
                if(response.ok){
                    setProducts(items)
                    setImages(images);
                }
                else{
                    setErrors(response.text.toString || "Failed to fetch recent items");
                } 
            }
            catch(err){
                console.log(err);
                setErrors("Something went wrong");
            }
        };

        fetchRecentItems();
    }, []);

    useEffect(() => {
        if (products && images) {
            const thumbnails = images
                .filter((p) => p.image_type === 'front' || p.image_type === 'thumbnail')
                .map((t) => [t.product_id, t.image_path]);

            const recents = products.map((item) => {
                const thumb = thumbnails.find((img) => img[0] === item.id);

                return {
                    ...item,
                    thumbnail: String(thumb ? thumb[1] : ""),
                };
            });

            setDisplayProducts(recents || []);
        }
    }, [products, images]);

    if(errors){
        return(
            <>
            <div className="recent-items-div">
                {errors && <h2>{errors}</h2>}
            </div>
            </>
        )
    }
    else{
        return (
            <div className="recent-items-div">
                {displayProducts && displayProducts.map(p => {
                    return(
                        <div key={p.id} className="recent-item">
                            <Image alt="recent item image" width={250} height={250} className="recent-item-image" src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${p.category_id}/${p.thumbnail}`}/>
                            <div className="arrival-name-category-div">
                                <p className="new-arrival-name">{p.product_name}</p>
                                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                                </svg>
                                <p className="new-arrival-subcategory">{p.subcategory_name}</p>
                            </div>
                            <div className="new-arrival-price-div">
                                <p className="new-arrival-price">$ {p.price} USD</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}