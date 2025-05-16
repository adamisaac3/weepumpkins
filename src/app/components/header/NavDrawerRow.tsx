'use client'
import {useState, useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'

export default function NavDrawerRow({itemName, rowNum, hasCategories, subcategories, category_url}: {itemName: string, rowNum: number, hasCategories: boolean, subcategories: string[], category_url: string}){
        
        const [showSubCategories, setSubCategories] = useState(false);
        const [subcats, setSubcats] = useState<{subcategory: string, subcat_url: string}[]>()
    

        useEffect(() => {
            const properCats: {subcategory: string, subcat_url: string}[] = subcategories.map((sc: string) => {
                const url = sc.replace(' ', '-').toLowerCase();

                return {subcategory: sc, subcat_url: `/collections/${url}`}
            })

            setSubcats(properCats);
        }, [subcategories])    
        
        
        return(
            <>
            <AnimatePresence>
                {!hasCategories && 
                    <motion.div 
                        initial={{opacity: 0, x:-40}}
                        animate={{opacity: 1, x:0}}
                        transition={{duration: 0.35, ease: "easeIn", delay: 0.2+rowNum*0.1}}
                        className="nav-drawer-row">
                        <a href={`${category_url}`} className="nav-drawer-row-item">{itemName}</a>
                    </motion.div>
                }
        
                {hasCategories && 
                    <motion.div className="nav-drawer-row" 
                        initial={{opacity: 0, x: -40}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.35, ease: "easeIn", delay: 0.2+rowNum*0.1}}>

                        <a href={`${category_url}`} className="nav-drawer-row-item">{itemName}</a>
                        <button className="nav-drawer-row-itemName-button" onClick={() => {setSubCategories(!showSubCategories)}}>
                            <svg className={`nav-drawer-row-itemName-button-icon ${showSubCategories ? "button-clicked" : ''}`}  width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </motion.div>
                }
            </AnimatePresence>
            
            {showSubCategories && hasCategories &&
                <AnimatePresence>
                    <motion.menu 
                        className="subcategory-menu"
                        initial={{height: 0}}
                        animate={{height:"auto"}}
                        exit={{height:0}}
                        transition={{duration: 0.3, ease:"easeInOut"}}
                        >
                        {subcats && subcats.map((sc: {subcategory: string, subcat_url: string}, id:number) => (
                            <motion.li 
                                key={id} 
                                className="subcategory-item" 
                                initial={{opacity:0}} 
                                animate={{opacity: 1}} 
                                transition={{duration: 0.35, ease: 'easeIn', delay: 0.2 + id * 0.1}}
                                >
                                <a href={sc.subcat_url} className="subcategory-name">{sc.subcategory}</a>
                            </motion.li>
                        ))}
                    </motion.menu>
                </AnimatePresence>
            }
            </>
            
        )
    }