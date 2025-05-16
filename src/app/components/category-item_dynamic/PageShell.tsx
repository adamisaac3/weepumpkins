'use client'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import ImageDiv from './ImageDiv'
import ItemDescriptionDiv from './ItemDescriptionDiv'
import Recommendations from './Recommendations'
import {useState} from 'react'

export default function PageShell({item, thumbnail, alts} : {item: any, thumbnail: string, alts: string[]}){

    const [navOpen, setNavOpen] = useState<boolean>(false)

    return (
            <>
                <Header navOpen={navOpen} setNavOpen={setNavOpen}/>
                <main className={`${navOpen ? "main-content-blurred" : ''}`}>
                    <ImageDiv thumbnail={thumbnail} altImages={alts} category={item.categoryid}/>
                    <ItemDescriptionDiv item={item} />
                </main>
                <aside className={`${navOpen ? "main-content-blurred" : ''}`}>
                    <Recommendations category={item.category_id} id={item.id} />
                </aside >
                <Footer navOpen={navOpen}/>
            </>
        )
}