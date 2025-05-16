'use client'
import Footer from '../footer/Footer';
import Header from '../header/Header';
import RecentEventContainer from './RecentEventContainer';
import NewArrivalsContainer from './NewArrivalsContainer';
import FavoriteContainer from './FavoriteContainer';
import {useState, useEffect} from 'react'

export default function PageShell(){
    
    const [navOpen, setNavOpen] = useState<boolean>(false)
    
    return (
        <>
            <Header navOpen={navOpen} setNavOpen={setNavOpen}/>
            <main className={`${navOpen ? 'main-content-blurred' : ''}`}>


                <div className="front-images">
                    <a href="/collections/browse-all" className="right-home-anchor">
                        <img src="browse-all.png" className="right-home-image" width={600} height={750} />
                    </a>
                    <a href="/events" className="left-home-anchor">
                        <img src="upcoming-events.png" className="left-home-image" width={600} height={750} />
                    </a>
                </div>

                <div className="new-arrivals">
                    <img src="shop-new-arrivals.png" className="shop-new-arrivals-banner" width={770} height={137} />
                    <NewArrivalsContainer />
                </div>

                <div className="recent-event">
                    <img src="next-upcoming-event.png" className="next-upcoming-banner" width={770} height={137} />
                    <RecentEventContainer />
                </div>

                <div className="favorites-container">
                    <img src="shop-favorites.png" className="shop-favorites-banner" width={770} height={137} />
                    <div className="favorites-div">
                        <FavoriteContainer itemName="Shoulder Totes" imageLink="shoulder-totes.JPG" />
                        <FavoriteContainer itemName="Quilt Coats" imageLink="quilt-coats.JPG" />
                        <FavoriteContainer itemName="Zipper Pouches" imageLink="zipper-pouches.JPG" />
                        <FavoriteContainer itemName="Basket Totes" imageLink="basket-totes.JPG" />
                    </div>
                </div>
            </main>
            <Footer navOpen={navOpen}/>
        </>
    );
}