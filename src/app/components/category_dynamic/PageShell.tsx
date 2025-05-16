'use client'
import {useState} from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import CategoryPage from '../../components/category_dynamic/CategoryPage'

export default function PageShell({category} : {category: string}){
    const [navOpen, setNavOpen] = useState<boolean>(false);

    return (
        <>
            <Header navOpen={navOpen} setNavOpen={setNavOpen} />
            <main className={`${navOpen ? "main-content-blurred" : ""}`}>
                <CategoryPage category={category} />
            </main>
            <Footer navOpen={navOpen} />
        </>
    )
}