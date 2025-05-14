'use client'
import {useState} from 'react'

export default function Component({thumbnail, alt, category} : {thumbnail: string, alt: string, category: string}){
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
        <img 
            width={250}
            height={250}
            src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${isAltImage && alt ? `${category}/${alt}` : `${category}/${thumbnail}`}`}
            alt="Product Image"
            className="image-transition"
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        />
    )
}

