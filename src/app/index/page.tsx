'use client';
import { JSX, useState } from "react";
import {products} from "../lib/products";
import './page.css';

export default function Page(){
    return(
        <>
        <Header />
        <main>
            <div className="front-images">
                <img src="home-right.JPG" className="right-home-image" width={650} height={650}/>
                <img src="home-left.JPG" className="left-home-image" width={650} height={650}/>
            </div>

            <img src="shop-favorites.png" className="shop-favorites-banner"/>
            <div className="favorites-container">
                <FavoriteContainer itemName="Shoulder Totes" imageLink="shoulder-totes.JPG" />
                <FavoriteContainer itemName="Quilt Coats" imageLink="quilt-coats.JPG" />
                <FavoriteContainer itemName="Zipper Pouches" imageLink="zipper-pouches.JPG" />
                <FavoriteContainer itemName="Basket Totes" imageLink="basket-totes.JPG" />
            </div>
        </main>
        </>
    );
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

function Header(){
    <link rel="icon" href="favicon.ico" type="image/x-icon"/>
    const [navDrawerOpen, setnavDrawerOpen] = useState(false);
    const handleNavClicked = () => setnavDrawerOpen(!navDrawerOpen);    
    
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

                <li className="nav-drawer-row-cat" key={rowNum}>
                    <a href="#" className="nav-drawer-row-item">{itemName}</a>
                    <button className="nav-drawer-row-itemName-button" 
                    onClick={() => {getSubcategories({ category: itemName })}}>drop down</button>
                </li>

            }
            
            {subCategoriesMenu}
            </>
            
        )
    }
    

    return(
        <>
        <header className="front-header">
            {!navDrawerOpen &&
                <button className="nav-Button" onClick={handleNavClicked}>Nav Button</button>
            }
            
            
            {navDrawerOpen &&
                <div className="nav-drawer-overlay">
                    <button className="close-nav-drawer" onClick={handleNavClicked}>Close Drawer</button>

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
            <div className="search-cart-div">
                <button className="search-button">search</button>
                <button className="cart-button">cart</button>
            </div>
        </header>
        </>
    );
}
