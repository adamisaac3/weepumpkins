'use client'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import BrowseAll from './BrowseAll'
import Image from 'next/image'
import {useState} from 'react'

export default function PageShell(){
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [product_count, setProductCount] = useState<number>(); 
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    return (
        <>
            <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} navOpen={navOpen} setNavOpen={setNavOpen}/>

            <main className={`${(navOpen || cartOpen || searchOpen) ? 'main-content-blurred' : ''}`}>
                <Image className="browse-all-art" src="/browse-all-art.png" width={770} height={137} alt="art image for browse all" />
                <BrowseAll setProductCount={setProductCount}/>
            </main>

            <Footer navOpen={navOpen}/>
        </>
    )
}