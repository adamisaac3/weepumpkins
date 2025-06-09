'use client'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ImageDiv from './ImageDiv'
import ItemDescriptionDiv from './ItemDescriptionDiv'
import Recommendations from './Recommendations'
import {useState} from 'react'
import { useRecentStore } from '@/app/stores/useRecentlyViewed'
import { RecentItem } from '@/app/stores/useRecentlyViewed'

type RecentImage = {
    image_path: string,
    image_type: string
}

export default function PageShell({item, thumbnail, alts} : {item: {productid: number, productname: string, categoryid: number, subcategoryid: number, description: string, price: number, dimensions: string, categoryname: string, subcategoryname: string, itemcount: number}, thumbnail: string, alts: string[]}){

    const [navOpen, setNavOpen] = useState<boolean>(false)
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const {addRecentItem} = useRecentStore();


    const recent_images = alts.map((alt) => ({
        image_path: alt,
        image_type: 'alt'
    }))

    recent_images.push({image_path: thumbnail, image_type: 'thumbnail'})
    const recentItem: RecentItem = {
        product_name: item.productname,
        product_id: item.productid,
        price: item.price,
        category_name: item.categoryname,
        images: recent_images,
        category_id: item.categoryid,
        subcategory: item.subcategoryname
    }

    addRecentItem(recentItem);

    return (
            <>
                <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} navOpen={navOpen} setNavOpen={setNavOpen}/>
                <main className={`${navOpen ? "main-content-blurred" : ''}`}>
                    <ImageDiv thumbnail={thumbnail} altImages={alts} category={item.categoryid}/>
                    <ItemDescriptionDiv cartOpen={cartOpen} setCartOpen={setCartOpen} item={item} thumbnail={thumbnail}/>
                </main>
                <aside className={`${navOpen ? "main-content-blurred" : ''}`}>
                    <Recommendations category={item.categoryid} id={item.productid} />
                </aside >
                <Footer navOpen={navOpen}/>
            </>
        )
}