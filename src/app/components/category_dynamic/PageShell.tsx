'use client'
import {useState} from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ItemGrid from '../multi-use/ItemGrid'
import FilterSidebar from './FilterSidebar'
import Image from 'next/image'


export default function PageShell({category} : {category: string}){

    const queryableCat = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [filters, setFilters] = useState({category: queryableCat, subcategory: '', minPrice: '', maxPrice: '', search: ''});
    const [maxPrice, setMaxPrice] = useState(0);

    return (
        <>
            <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} navOpen={navOpen} setNavOpen={setNavOpen} />
            <main className={`${(navOpen || cartOpen || searchOpen) ? "main-content-blurred" : ""}`}>
                <Image className="browse-all-art" src="/browse-all-art.png" width={770} height={137} alt="art image for browse all" />
                <div className="items-main">
                    <FilterSidebar maxPrice={maxPrice} filters={filters} setFilters={setFilters} category={queryableCat} />
                    <ItemGrid  filters={filters} setMaxPrice={setMaxPrice}/>
                </div>
            </main>
            <Footer navOpen={navOpen} />
        </>
    )
}