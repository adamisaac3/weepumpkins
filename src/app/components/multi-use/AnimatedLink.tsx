'use client'
import {motion} from 'framer-motion'
import { useState } from 'react'

export default function AnimatedLink({href, linkText}: {href: string, linkText: string}){
    const [hovered, setHovered] = useState(false)

    return(
        <a 
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ 
                    position: 'relative', 
                    display: 'inline-block', 
                    textDecoration: 'none', 
                    color: 'inherit', 
                    paddingBottom: '7px',
                    flexShrink: 0,
                    flexGrow: 0
                }}
        >
        <span style={{whiteSpace: 'nowrap'}}>{linkText}</span>
        <span
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 2,
                width: '100%',
                backgroundColor: 'grey',
                opacity: 0.3,
            }}
        />

        <motion.span
            layoutId="underline"
            initial={{width: 0}}
            animate={{width: hovered ? '100%' : 0}}
            transition={{duration: 0.4, ease: 'easeInOut'}}
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: 2,
                backgroundColor: 'currentcolor',
            }}
        />
        </a>
    )
}