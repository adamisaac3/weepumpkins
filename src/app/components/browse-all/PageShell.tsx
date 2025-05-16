import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import BrowseAll from './BrowseAll'
import Image from 'next/image'
import {useState} from 'react'

export default function PageShell(){
    const [navOpen, setNavOpen] = useState<boolean>(false);
    
    return (
        <>
            <Header navOpen={navOpen} setNavOpen={setNavOpen}/>

            <main className={`${navOpen ? 'main-content-blurred' : ''}`}>
                <Image className="browse-all-art" src="/browse-all-art.png" width={770} height={137} alt="art image for browse all" />

                <BrowseAll />
            </main>

            <Footer navOpen={navOpen}/>
        </>
    )
}