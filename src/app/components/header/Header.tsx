'use client'
import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";
import NavDrawerRow from './NavDrawerRow'
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image'

export default function Header({navOpen, setNavOpen} : {navOpen: boolean, setNavOpen: Dispatch<SetStateAction<boolean>>}){ 
    

    type Items = Record<number, {category_name: string, category_url: string, subcategories: string[]}>
    const [items, setItems] = useState<Items>();
    const [socialsDelay, setSocialsDelay] = useState<number>(1);
    const handleNavClicked = () => setNavOpen(!navOpen);
    const drawerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if(navOpen){
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = ''
        }
        return () => {document.body.style.overflow = '';};
    }, [navOpen])

    useEffect(() => {

        function handleClickOutside(event: MouseEvent){
            if(drawerRef.current && !drawerRef.current.contains(event.target as Node)){
                handleNavClicked();
            }
        }


        if(navOpen){
            document.addEventListener('mousedown', handleClickOutside)
        }


        return () => {document.removeEventListener('mousedown', handleClickOutside)};
    
    }, [handleNavClicked, navOpen])


    useEffect(() => {
        const fetchCats = async () => {
            const response = await fetch('/api/get-cats-subcats')
            const data = await response.json();
            const categoryMap: Record<number, {category_name: string, category_url: string, subcategories: string[]}> = {};
            
            if(response.ok){        
                data.forEach((i: {categoryname: string, subcategoryname: string, category_id: number, subcategory_id: number, category_desc: string, subcategory_desc: string, category_dimensions: string, subcategory_dimensions: string}) => {
                    if(!categoryMap[i.category_id]){
                        const cat_url = '/collections/' + i.categoryname.replace(' ', '-').toLowerCase();
                        
                        categoryMap[i.category_id] = {category_name: i.categoryname, category_url: cat_url, subcategories: []}
                    }
                
                    if(i.subcategory_id){
                        categoryMap[i.category_id].subcategories.push(i.subcategoryname);
                    }
                })
            
                setItems(categoryMap);
                setSocialsDelay(Object.keys(categoryMap).length);
            }
        }
        fetchCats();
    }, [])

    return(
        <>
        <header className={`front-header`}>
            <button className="nav-button" onClick={handleNavClicked}>
                <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Menu / Menu_Alt_04">
                        <path id="Vector" d="M5 17H19M5 12H19M5 7H13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                </svg>
            </button>

            
            
            <div ref={drawerRef} className={`nav-drawer-overlay ${navOpen ? "open" : "closed" }`}>
                <button className="close-nav-drawer" onClick={handleNavClicked}>
                    <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Menu / Close_LG">
                            <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
                <AnimatePresence>
                    {navOpen &&
                        <nav className="nav-drawer">
                            <NavDrawerRow itemName={'Browse All'} hasCategories={false} rowNum={0} subcategories={[]} category_url={'/collections/browse-all'} />
                            <NavDrawerRow itemName={'Events'} hasCategories={false} rowNum={1} subcategories={[]} category_url={'/events'} />
                            {items &&
                                Object.entries(items).map(([key, value], i) => {
                                    return (
                                        <NavDrawerRow
                                            key={key}
                                            itemName={value.category_name}
                                            hasCategories={!!value.subcategories && value.subcategories.length > 0}
                                            rowNum={i + 2}
                                            subcategories={value.subcategories}
                                            category_url={value.category_url}
                                        />
                                    );
                                })
                            }
                        </nav>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {navOpen && 
                        <motion.div 
                            initial={{opacity: 0, x:-40}}
                            animate={{opacity:1, x: 0}}
                            transition={{duration: 0.35, ease: 'easeIn', delay: 0.2 + socialsDelay * 0.1}}
                            className="nav-overlay-socials"
                            >
                            <div className="nav-overlay-instagram">
                                <svg fill="#000000" width="39px" height="39px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z"/><path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z"/></svg>
                            </div>
                            <div className="nav-overlay-facebook">
                                <svg  width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H15V13.9999H17.0762C17.5066 13.9999 17.8887 13.7245 18.0249 13.3161L18.4679 11.9871C18.6298 11.5014 18.2683 10.9999 17.7564 10.9999H15V8.99992C15 8.49992 15.5 7.99992 16 7.99992H18C18.5523 7.99992 19 7.5522 19 6.99992V6.31393C19 5.99091 18.7937 5.7013 18.4813 5.61887C17.1705 5.27295 16 5.27295 16 5.27295C13.5 5.27295 12 6.99992 12 8.49992V10.9999H10C9.44772 10.9999 9 11.4476 9 11.9999V12.9999C9 13.5522 9.44771 13.9999 10 13.9999H12V21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" fill="#0F0F0F"/>
                                </svg>
                            </div>
                            <div className="nav-overlay-email">
                                <svg  fill="#000000" width="31px" height="31px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 1694.235h1920V226H0v1468.235ZM112.941 376.664V338.94H1807.06v37.723L960 1111.233l-847.059-734.57ZM1807.06 526.198v950.513l-351.134-438.89-88.32 70.475 378.353 472.998H174.042l378.353-472.998-88.32-70.475-351.134 438.89V526.198L960 1260.768l847.059-734.57Z" fillRule="evenodd"/>
                                </svg>
                            </div> 
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        

            <div className={`nav-banner ${navOpen ? 'main-content-blurred' : ''}`}>
                <a href="/index">
                    <Image src="/resized-banner.png" width={200} height={62} alt="banner image"/>
                </a>
            </div>
            
            <div className={`search-cart-div ${navOpen ? 'main-content-blurred' : ''}`}>
                <button className="search-button">
                    <svg width="36px" height="36px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.029 16.5295L19.5 19.0005" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className={`cart-button ${navOpen ? 'main-content-blurred' : ''}`}>
                    <svg width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
