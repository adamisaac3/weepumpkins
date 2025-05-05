'use client';
import { JSX, useState, useEffect } from "react";
import {products} from "../lib/products";
import './page.css';
import {format, parse} from 'date-fns'
<link rel="icon" href="favicon.ico" type="image/x-icon"/>


export default function Page(){
    
    const [navDrawerOpen, setnavDrawerOpen] = useState(false);
    const handleNavClicked = () => setnavDrawerOpen(!navDrawerOpen);
    
    return(
        <>
        <Header navOpen={navDrawerOpen} navClicked={handleNavClicked}/>
        <main className={navDrawerOpen ? "main-content-blurred" : "main-content"}>

            
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
                            <p>{start_date} - {end_date}</p>
                            
                        </div>
                        <div className="recent-info-bottom">
                            <p>{event?.address}</p>
                            <p>{event?.city}</p>
                            <p>{event?.state}</p>
                        </div>
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
                            <img width={250} height={250} src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${p.category}/${p.thumbnail}`}/>
                            <p className="new-arrival-name">{p.name}</p>
                            <p className="new-arrival-subcategory">{p.subcategory}</p>
                            <p className="new-arrival-price">{p.price}</p>
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

function Header({navOpen, navClicked} : {navOpen: boolean, navClicked: React.MouseEventHandler<HTMLButtonElement>}){ 
    
    function NavDrawerRow({itemName, rowNum, hasCategories}: {itemName: string, rowNum: number, hasCategories: boolean}){
        
        const [showSubCategories, setSubCategories] = useState(true);
        const [subCategoriesMenu, setSubCategoriesMenu] = useState<JSX.Element | null>(null);
        
        function getSubcategories({category}: {category:string}){
            setSubCategories(!showSubCategories);
            
            const lower = category.toLowerCase();
    
            if(showSubCategories){
                const subcats = products.filter((p) => {
                    console.log(p);
                    if (lower === p.category) {
                        return p.subcategory;
                    }
                    
                }).map((s) => {
                    return( 
                    <li key={s.subcategory} className="subcat-list-item">
                        <a className="subcat-anchor" href="#">{s.subcategory}</a>
                    </li>
                    )
                });
                
                setSubCategoriesMenu(
                    <>
                    <div>
                        <menu className="subcategory-menu">
                            {subcats}
                        </menu>
                    </div>
                    </>
                );
            }
            else{
                setSubCategoriesMenu(null);
            }
        }
        
        
        return(
            <>
    
            {!hasCategories && 
            <li className="nav-drawer-row-noc" key={rowNum}>
                <a href="#" className="nav-drawer-row-item">{itemName}</a>
            </li>  
            }
    
            {hasCategories && 

                <li className={`nav-drawer-row-cat ${!showSubCategories ? "nav-drawer-row-cat-transition" : ""}`} key={rowNum}>
                    <a href="#" className="nav-drawer-row-item">{itemName}</a>
                    <button className="nav-drawer-row-itemName-button" 
                        onClick={() => {getSubcategories({ category: itemName })}}>
                        <svg className="nav-drawer-row-itemName-button-icon"  width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </li>

            }
            
            {subCategoriesMenu}
            </>
            
        )
    }
    

    return(
        <>
        <header className="front-header">
            <button className="nav-button" onClick={navClicked}>
                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Menu / Menu_Alt_04">
                        <path id="Vector" d="M5 17H19M5 12H19M5 7H13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
            </button>

            {navOpen &&
            
                <div className="nav-drawer-overlay">
                    <button className="close-nav-drawer" onClick={navClicked}>Close Drawer</button>

                    <nav className="nav-drawer">
                        <menu className="nav-menu">
                            <NavDrawerRow itemName="Bags" rowNum={1} hasCategories={true}/>
                            <NavDrawerRow itemName="Clothing" rowNum={2} hasCategories={true}/>
                            <NavDrawerRow itemName="Pouches" rowNum={3} hasCategories={false} />
                            <NavDrawerRow itemName="Makeup Bags" rowNum={4} hasCategories={false} />
                            <NavDrawerRow itemName="Banners" rowNum={5} hasCategories={false} />
                        </menu>
                    </nav>
                </div>
            }

            <div className="nav-banner">
                <a href="/index">
                    <img src="resized-banner.png" width={200} height={62}/>
                </a>
            </div>
            
            <div className="search-cart-div">
                <button className="search-button">
                    <svg width="28px" height="28px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.029 16.5295L19.5 19.0005" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className="cart-button">
                    <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.864 16.4552C4.40967 18.6379 4.68251 19.7292 5.49629 20.3646C6.31008 21 7.435 21 9.68486 21H14.3155C16.5654 21 17.6903 21 18.5041 20.3646C19.3179 19.7292 19.5907 18.6379 20.1364 16.4552C20.9943 13.0234 21.4233 11.3075 20.5225 10.1538C19.6217 9 17.853 9 14.3155 9H9.68486C6.14745 9 4.37875 9 3.47791 10.1538C2.94912 10.831 2.87855 11.702 3.08398 13" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4" stroke="#1C274C" strokeWidth="1.5"/>
                        <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z" stroke="#1C274C" strokeWidth="1.5"/>
                    </svg>
                </button>
            </div>
        </header>
        </>
    );
}
