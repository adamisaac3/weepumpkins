'use client'
import {useState} from 'react'
import Image from 'next/image'

export default function Component({thumbnail, alt, category,width=250, height=250} : {thumbnail: string, alt: string, category: string | number, width: number, height:number}){
    const [isAltImage, setAltImage] = useState(false);

    const handleMouseOver = () => {
        if(alt){
            setAltImage(true);
        }
    };

    const handleMouseOut = () => {
        setAltImage(false);
    }

    return(
        <Image
            width={width}
            height={height}
            src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${isAltImage && alt ? `${category}/${alt}` : `${category}/${thumbnail}`}`}
            alt="Product Image"
            className="image-transition"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        />
    )
}

