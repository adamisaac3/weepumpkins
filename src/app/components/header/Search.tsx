'use client'
import { SetStateAction, Dispatch } from "react";


export default function Component({searchOpen, setSearchOpen} : {searchOpen: boolean, setSearchOpen: Dispatch<SetStateAction<boolean>>}){

    const handleSearchClicked = () => setSearchOpen(!searchOpen);


    return(
        
        <div className="search-div">
            <form method="get" action="/search" role="search" className="search-form">
                <div className="input-wrapper">
                    <input type="search" autoCapitalize="off" autoComplete="off" className="search-input" placeholder="Search" />
                    <button type="submit" className="search-submit-button">
                        <svg width="36px" height="36px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.029 16.5295L19.5 19.0005" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <button onClick={handleSearchClicked} className="close-search">
                    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Menu / Close_LG">
                            <path id="Vector" d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                    </svg>
                </button>
            </form>

            
        </div>
    )
}