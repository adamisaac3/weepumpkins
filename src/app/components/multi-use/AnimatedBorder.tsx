'use client'
import {motion, useAnimation} from 'framer-motion'
import { useEffect } from 'react'

import { ReactNode } from 'react';

export default function AnimatedBorderBox({child}: {child: ReactNode}){
    const controls = useAnimation();

    useEffect(() => {
        const loopAnimation = async () => {
            while(true){
                await controls.start({
                    height: '100%',
                    top: '0%',
                    opacity: 0.8,
                    transition: {duration: 1.5}
                })

                await controls.start({
                    opacity: 1,
                    backgroundColor: '#f1fbff',
                    transition: {duration: 0.25}
                })

                await controls.start({
                    opacity: 0.8,
                    backgroundColor: '#000',
                    transition: {duration: .25}
                })

                await controls.start({
                    height: '0%',
                    top: '50%',
                    opacity: 0.8,
                    transition: {duration: 1}
                })
            }
        }
        loopAnimation()
    }, [controls])

    return(
        <div className="four-oh-four-container">
            {child}
            <motion.div
                className="border-anim"
                style={{height: '0%', top: '50%'}}
                animate={controls}
            />
             <style>{`
                .four-oh-four-container {
                position: relative;
                display: flex;
                align-items: center;
                }

                .four-oh-four {
                padding-right: 1rem;
                padding-top: 0.5rem;
                padding-bottom: 0.5rem;
                border-right: 1.5px solid transparent;
                color: black;
                }

                .border-anim {
                position: absolute;
                right: 0;
                width: 1.5px;
                background-color: black;
                opacity: 0.8;
                }
            `}</style>

        
        </div>
    )
}