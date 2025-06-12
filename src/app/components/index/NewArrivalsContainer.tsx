'use client'

import {useState, useEffect} from 'react'
import SwappableImage from '../multi-use/SwappableImage'

type RecentItem = {
    product_id: number,
    product_name: string,
    category_name: string,
    category_id: number,
    subcategory_name: string,
    price: number,
    product_url: string,
    thumbnail: string | null,
    altImage: string | null
}

export default function NewArrivalsContainer(){
    const [products, setProducts] = useState<RecentItem[]>();
    
    useEffect(() => {
        const fetchRecentItems = async () =>{
            try{
                
                const response = await fetch('/api/get-recent-items');
                
                const items  = await response.json()
                console.log(items);                
                if(response.ok){
                    setProducts(items)
                }
            }
            catch(err){
                console.log(err);
            }
        };

        fetchRecentItems();
    }, []);

    return (
        <div className="recent-items-div">
            {products && products.map(p => {
                return(
                    <div key={p.product_id} className="recent-item">
                        <a className="item-anchor" href={p.product_url}>
                            <SwappableImage width={250} height={250} thumbnail={p.thumbnail ? p.thumbnail : ''} alt={p.altImage ? p.altImage : ''} category={p.category_id}/>
                        </a>
                        <div className="arrival-name-category-div">
                            <p className="new-arrival-name">{p.product_name}</p>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                            </svg>
                            <p className="new-arrival-subcategory">{p.subcategory_name ? p.subcategory_name : p.category_name}</p>
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
