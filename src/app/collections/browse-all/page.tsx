import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BrowseAll from './BrowseAll'
import Image from 'next/image'
import './page.css'

export default function Page(){
    
    
    return(
        <>
            <Header />
            
            <main>
                <Image className="browse-all-art" src="/browse-all-art.png" width={770} height={137} alt="art image for browse all"/>

                <BrowseAll />
            </main>

            <Footer />
        </>
    )
}