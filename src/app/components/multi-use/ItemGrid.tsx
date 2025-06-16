'use client'
import {useState, useEffect, Dispatch} from 'react'
import SwappableImage from './SwappableImage'

export default function Component({filters, setMaxPrice} : {filters: { category: string, subcategory: string, minPrice: string, maxPrice: string, search: string }, setMaxPrice: Dispatch<React.SetStateAction<number>>}){

    const [items, setItems] = useState<{id: number, product_name: string, category_id: number, subcategory_id: number, description: string, price: number, dimensions: string, category_name: string, subcategory_name: string, item_count: number}[]>()
    const [images, setImages] = useState<{product_id: number, image_path: string, image_type: string}[]>()
    const [displayProducts, setDisplayProducts] = useState<{id: number, product_name: string, category_id: number, subcategory_id: number, description: string, price: number, dimensions: string, category_name: string, subcategory_name: string, thumbnail: string, secondary: string, url: string}[]>([]);
    const [productDisplay, setProductDisplay] = useState<number>();
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState<number>();
    
    const limit = 1;
    const offset = (page - 1) * limit;

    useEffect(() => {
        const fetchItems = async () => {
            try{

                const queryParams = new URLSearchParams({
                    category: filters.category !== "" ? filters.category : "",
                    subcategory: filters.subcategory !== "" ? filters.subcategory : "",
                    minPrice: filters.minPrice !== "" ? filters.minPrice : "",
                    maxPrice: filters.maxPrice !== "" ? filters.maxPrice : "",
                    search: filters.search !== "" ? filters.search : '',
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

            if(items.length > 0 && (!productDisplay || !maxPage)){
                setProductDisplay(items[0].item_count)

                setMaxPage(Math.ceil(items[0].item_count / limit))
            }
            let maxPrice = 0
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
                
                maxPrice = Math.max(maxPrice, i.price);
                
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
            
            setMaxPrice(maxPrice);

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
    
    const hasDecimal = (num: number) => {
        if(num % 1 !== 0){
            return true;
        }
        
        return false;
    }

    return(
        <div className="item-grid-overlay">
            <div className="item-grid">
                <div className="product-wrapper">
                    {productDisplay && 
                        <p>Products: {productDisplay}</p>
                    }
                </div>
                <div className="items-wrapper">
                    {displayProducts && 
                        displayProducts.map((p) => {

                            return (
                                <div key={p.id} className="item">
                                    <a href={p.url}>
                                        <SwappableImage width={250} height={250} thumbnail={p.thumbnail} alt={p.secondary} category={p.category_id} />
                                    </a>
                                    <div className="category-div">
                                        <p className="item-name">{p.product_name}</p>
                                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                                        </svg>
                                        <p className="item-subcategory">{p.subcategory_name}</p>
                                    </div>
                                    <div className="item-price-div">
                                        <p className="item-price">$ {hasDecimal(p.price) ? p.price : p.price.toFixed(2)} USD</p>
                                    </div>
                                    
                                </div>
                            )
                        })

                    }
                </div>
            </div>
            <div className="pagination">
                    <div className="pagination-go-back">
                        <button className="page-one" onClick={() => setPage(1)} disabled={page - 1 < 1}>
                            <svg fill="#000000" height="14px" width="14px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                                viewBox="0 0 512.006 512.006" xmlSpace="preserve">
                                <g>
                                    <g>
                                        <path d="M388.419,475.59L168.834,256.005L388.418,36.421c8.341-8.341,8.341-21.824,0-30.165s-21.824-8.341-30.165,0
                                            L123.586,240.923c-8.341,8.341-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251
                                            c5.461,0,10.923-2.091,15.083-6.251C396.76,497.414,396.76,483.931,388.419,475.59z"/>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <button className="minus-one-btn" onClick={() => setPage(page - 1)} disabled={page-1 < 1}>
                            {`${page - 1 > 0 ? page - 1 : '...'} `}
                        </button>
                    </div>
                    <div className="current-page">
                        <p>{page}</p>
                    </div>
                    
                     {maxPage && 
                        <div className="pagination-go-forward">
                            <button disabled={page + 1 > maxPage} className="plus-one-btn" onClick={() => setPage(page + 1)}>{`${page + 1 <= maxPage ? page + 1 : '...'}`}</button>
                            <button disabled={page + 1 > maxPage} className="page-end" onClick={() => setPage(maxPage)}>
                                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 7L15 12L10 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    }
            </div>
        </div>
    )

}