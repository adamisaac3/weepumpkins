'use client';
import { JSX, useState, useEffect } from "react";
import Footer from '../components/Footer'
import {products} from "../lib/products";
import Header from '../components/Header'
import './page.css';
import {format, parse} from 'date-fns'


export default function Page(){
    
    return(
        <>
        <Header />
        <main>

            
            <div className="front-images">
                <a href="/collections/browse-all" className="right-home-anchor">
                    <img src="browse-all.png" className="right-home-image" width={600} height={750}/>
                </a>
                <a href="/events" className="left-home-anchor">
                    <img src="upcoming-events.png" className="left-home-image" width={600} height={750}/>
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
                <img src="shop-favorites.png" className="shop-favorites-banner" width={770} height={137}/>
                <div className="favorites-div">
                    <FavoriteContainer itemName="Shoulder Totes" imageLink="shoulder-totes.JPG" />
                    <FavoriteContainer itemName="Quilt Coats" imageLink="quilt-coats.JPG" />
                    <FavoriteContainer itemName="Zipper Pouches" imageLink="zipper-pouches.JPG" />
                    <FavoriteContainer itemName="Basket Totes" imageLink="basket-totes.JPG" />
                </div>
            </div>
        </main>
        <Footer />
        </>
    );
}

function RecentEventContainer(){
    
    function formatTime(timeString: string){
        const parsed = parse(timeString, 'HH:mm', new Date());
        return format(parsed, 'h:mm a')
    }
    
    const [error, setError] = useState<string | null>(null);
    const [event, setEvent] = useState<any | null>(null);
    
    useEffect(() => {
        const fetchRecentEvent = async () => {
            try{
                const response = await fetch('/api/get-recent-event');
                
                const {event} = await response.json();

                if(response.ok){
                    setEvent(event[0]);
                }
                else{
                    setError(response.text.toString || "Something went wrong");
                }
            }
            catch(err){
                setError((err as Error).message);
            }
        }
        
        fetchRecentEvent();
    }, [])
    
    if(event){
        let start_date = format(event?.start_date, 'MMMM do');
        let end_date = format(event?.end_date, 'MMMM do yyyy')
        let start_time = formatTime(event?.start_time)
        let end_time = formatTime(event?.end_time)
        return (
            <>
                <div className="recent-event-div">
                    <img width={100} height={100} src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/Events/${event?.thumbnail}`} alt="Recent Event Thumbnail" />
                    <div className="recent-event-info">
                        <div className="recent-info-top">
                            <a href={event?.event_url}>
                                <h2>{event?.name}</h2>
                            </a>
                            <p>Booth: {event?.booth}</p>
                        </div>
                        <div className="recent-info-middle">
                            <p>{start_time} - {end_time}</p>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                            </svg>
                            <p>{start_date} - {end_date}</p>
                            
                        </div>
                        <div className="recent-info-bottom">
                            <p>{event?.address}</p>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                            </svg>
                            <p>{event?.city}</p>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                            </svg>
                            <p>{event?.state}</p>
                        </div>
                        <a href="/events" className="view-all-events-button">View All Events</a>
                    </div>
                </div>
            </>
        );
    }
    
}

function NewArrivalsContainer(){
    const [products, setProducts] = useState<any[] | null>(null);
    const [images, setImages] = useState<any[] | null>(null);
    const [errors, setErrors] = useState<string | null>(null);
    const [displayProducts, setDisplayProducts] = useState<any[] | null>(null);


    
    
    useEffect(() => {
        const fetchRecentItems = async () =>{
            try{
                const response = await fetch('/api/get-recent-items');
            
                const {items, images}  = await response.json()
                
                if(response.ok){
                    setProducts(items)
                    setImages(images);
                }
                else{
                    setErrors(response.text.toString || "Failed to fetch recent items");
                } 
            }
            catch(err){
                setErrors("Something went wrong");
            }
        };

        fetchRecentItems();
    }, []);

    useEffect(() => {
        if (products && images) {
            const thumbnails = images
                .filter((p) => p.image_type === 'front' || p.image_type === 'thumbnail')
                .map((t) => [t.product_id, t.image_path]);

            const recents = products.map((item) => {
                const thumb = thumbnails.find((img) => img[0] === item.id);

                return {
                    ...item,
                    thumbnail: thumb ? thumb[1] : null,
                };
            });

            setDisplayProducts(recents || []);
        }
    }, [products, images]);

    if(errors){
        return(
            <>
            <div className="recent-items-div">
                {errors && <h2>{errors}</h2>}
            </div>
            </>
        )
    }
    else{
        return (
            <div className="recent-items-div">
                {displayProducts && displayProducts.map(p => {
                    return(
                        <div key={p.id} className="recent-item">
                            <img width={250} height={250} className="recent-item-image" src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${p.category_id}/${p.thumbnail}`}/>
                            <div className="arrival-name-category-div">
                                <p className="new-arrival-name">{p.product_name}</p>
                                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                                </svg>
                                <p className="new-arrival-subcategory">{p.subcategory_name}</p>
                            </div>
                            <div className="new-arrival-price-div">
                                <p className="new-arrival-price">$ {p.price} USD</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function FavoriteContainer({itemName, imageLink} : {itemName: string, imageLink: string}){
    const url = itemName.replace(' ', '-').toLowerCase();
    
    return (
        <>
            <div className="favorite-div">
                <a href={`/collections/${url}`} className="favorite-anchor">
                    <img src={imageLink} width={250} height={250} className="favorite-image"/>
                    <span className="favorite-item">{itemName}</span>
                </a>
            </div>
        </>
    )
}
