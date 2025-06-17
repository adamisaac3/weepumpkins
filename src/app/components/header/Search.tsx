'use client'
import { SetStateAction, Dispatch, useRef, useEffect, useState } from "react";
import Image from "next/image";
type Product = {
    product_name: string,
    product_thumbnail: string,
    product_category_id: number,
    product_url: string
}

type Collection = {
    collection_name: string,
    collection_url: string
}


export default function Component({searchOpen, setSearchOpen} : {searchOpen: boolean, setSearchOpen: Dispatch<SetStateAction<boolean>>}){

    const [query, setQuery] = useState<string>();
    const [debouncedQuery, setDebouncedQuery] = useState<string>();
    const [products, setProducts] = useState<Product[]>()
    const [collections, setCollections] = useState<Collection[]>();
    //const [loading, setLoading] = useState<boolean>();

    const handleSearchClicked = () => setSearchOpen(!searchOpen);

    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        function handleOutsideSearch(event: MouseEvent){
            if(searchOpen && searchRef.current && !searchRef.current.contains(event.target as Node)){
                handleSearchClicked();
            }
        }
    
        if(searchOpen){
            document.addEventListener('mousedown', handleOutsideSearch);
        }
    
        return () => {document.removeEventListener('mousedown', handleOutsideSearch)}
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query)
        }, 300);

        return () => clearTimeout(timer);
    }, [query])

    useEffect(() => {
        if(!debouncedQuery){
            setCollections([])
            setProducts([])
            return;
        }
        
        const fetchItems = async () => {
            //setLoading(true);
            const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
            const {products, collections} = await response.json();

            if(response.ok){
                setProducts(products)
                setCollections(collections)
            }
        }
        
        fetchItems();
    }, [debouncedQuery])


    return(
        
        <div className="search-div">
            <form method="get" action="/search" role="search" className="search-form">
                <div className="main-search">
                    <div className="input-wrapper">
                        <div className="query-input">
                            <input value={query} onChange={(e) => setQuery(e.target.value)} ref={searchRef} type="search" autoCapitalize="off" autoComplete="off" className="search-input" placeholder="Search" />
                            <button type="submit" className="search-submit-button">
                                <svg width="36px" height="36px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.029 16.5295L19.5 19.0005" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        {debouncedQuery &&
                            <div className="query-div">
                                {((products && products.length > 0) || (collections && collections.length > 0)) &&
                                    <>
                                    <div className="query-results">
                                        {collections && collections.length > 0 &&
                                            <div className="query-collections-div">
                                                <h3 className="collection-header">Collections</h3>
                                                <menu className="collections-menu">
                                                    {collections.map((col, i) => {
                                                        return (
                                                            <a key={i} className="collection-item" href={col.collection_url}>
                                                                <li>{col.collection_name}</li>
                                                            </a>
                                                        )
                                                    })}
                                                </menu>
                                            </div>
                                        }

                                        {products && products.length > 0 &&
                                        <div className="query-products-div">
                                            <h3 className="products-header">Products</h3>
                                            <menu className="products-menu">
                                                {products.map((prod, i) => {
                                                    return (
                                                        <a key={i} className="product-item-anchor" href={prod.product_url}>
                                                            <li className="product-item">
                                                                <Image className="product-image" width={80} height={80} alt='Product search image' src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${prod.product_category_id}/${prod.product_thumbnail}`} />
                                                                <p>{prod.product_name}</p>
                                                            </li>
                                                        </a>
                                                    )
                                                })}
                                            </menu>
                                        </div>
                                        }
                                    </div>
                                    <button className="search-results-button">
                                        <p>Search all results for &quot;{debouncedQuery}&quot;</p>
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    </>
                                }
                                {((products && products.length <= 0) && (collections && collections.length <= 0)) &&
                                    <p className={'no-results'}>Search for &quot;{debouncedQuery}&quot;</p>
                                }
                                </div>
                        }
                    </div>
                    <button onClick={handleSearchClicked} className="close-search">
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Menu / Close_LG">
                                <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}