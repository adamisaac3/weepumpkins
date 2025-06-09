'use client'
import { useState } from "react";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import OrderInformation from './OrderInformation'

export default function ConfirmPageShell(){
    const [navOpen, setNavOpen] = useState<boolean>(false);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    return (
        <>
            <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} navOpen={navOpen} setNavOpen={setNavOpen}/>
            <main className={`${(navOpen || cartOpen || searchOpen) ? 'main-content-blurred' : ''}`}>
                <OrderInformation />
            </main>
            <Footer navOpen={navOpen}/>
            
        </>
    )
}