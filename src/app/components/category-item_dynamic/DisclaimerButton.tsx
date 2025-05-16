'use client'
import { useState } from "react"
import {motion, AnimatePresence} from 'framer-motion'

export default function Component({innerContent, outerContent, rowNum} : {innerContent: string, outerContent: string, rowNum: string}){
    const [drop, setDrop] = useState(false);
    const handleClick = () => setDrop(!drop);

    return(
        <div className="disclaimer-collapsable">
            <button className={`disclaimer-button ${rowNum}`} onClick={handleClick}>
                <p className="disclaimer-name">{outerContent}</p>
                <svg className="disclaimer-drop" width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <AnimatePresence initial={false}>
            {drop &&
                
                    <motion.div 
                        className={`disclaimer-drop-content ${rowNum}`}
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                        >
                        <p>{innerContent}</p>
                    </motion.div>
                
                }
            </AnimatePresence>
        </div>
    
    )

}