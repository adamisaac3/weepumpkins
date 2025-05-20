'use client'
import Footer from '../footer/Footer';
import Header from '../header/Header';
import RecentEventContainer from './RecentEventContainer';
import NewArrivalsContainer from './NewArrivalsContainer';
import FavoriteContainer from './FavoriteContainer';
import Link from 'next/link';
import Image from 'next/image';
import {useState} from 'react'

export default function PageShell(){
    
    const [navOpen, setNavOpen] = useState<boolean>(false)
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    
    return (
        <>
            <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} cartOpen={cartOpen} setCartOpen={setCartOpen} navOpen={navOpen} setNavOpen={setNavOpen}/>
            <main className={`${(navOpen || cartOpen) ? 'main-content-blurred' : ''}`}>


                <div className="front-images">
                    <Link href="/collections/browse-all" className="right-home-anchor">
                        <Image alt="Browse all image" src="/browse-all.png" className="right-home-image" width={600} height={750} />
                    </Link>
                    <a href="/events" className="left-home-anchor">
                        <Image alt="Upcoming event image" src="/upcoming-events.png" className="left-home-image" width={600} height={750} />
                    </a>
                </div>

                <div className="new-arrivals">
                    <Image alt="Shop new arrivals image" src="/shop-new-arrivals.png" className="shop-new-arrivals-banner" width={770} height={137} />
                    <NewArrivalsContainer />
                </div>

                <div className="recent-event">
                    <Image alt="recent event image" src="/next-upcoming-event.png" className="next-upcoming-banner" width={770} height={137} />
                    <RecentEventContainer />
                </div>

                <div className="favorites-container">
                    <Image alt="shop favorites image" src="/shop-favorites.png" className="shop-favorites-banner" width={770} height={137} />
                    <div className="favorites-div">
                        <FavoriteContainer itemName="Shoulder Totes" imageLink="/shoulder-totes.JPG" />
                        <FavoriteContainer itemName="Quilt Coats" imageLink="/quilt-coats.JPG" />
                        <FavoriteContainer itemName="Zipper Pouches" imageLink="/zipper-pouches.JPG" />
                        <FavoriteContainer itemName="Basket Totes" imageLink="/basket-totes.JPG" />
                    </div>
                </div>
            </main>
            <Footer navOpen={navOpen}/>
        </>
    );
}