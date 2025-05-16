'use client'
import {useState, useEffect} from 'react'
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion'


export default function Component({thumbnail, altImages, category} : {thumbnail: string, altImages: string[], category: number}){
    //374 by 500 image size 
    //thumbnails are 76 by 101 
    const [image, setImage] = useState<string>(thumbnail)
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(-1);

    useEffect(() => {
        const imageArr: string[] = [thumbnail, ...altImages]
    
        setImages(imageArr);
    }, [thumbnail, altImages])

    function handleThumbnailClicked(img: string, i: number){
        if(i !== currentIndex){
            setDirection(i > currentIndex ? 1 : -1)
            setCurrentIndex(i)
        }
        
        
        setImage(img);
    }

    return (
        <div className="image-div">
            <div className="current-display-image">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        className="motion-div"
                        key={currentIndex}
                        custom={direction}
                        initial={{x: direction * 400}}
                        animate={{x: 0}}
                        exit={{x: direction * 400}}
                        transition={{duration: 0.5}}
                    >
                        <Image width={600} className={`motion-image`} height={800} src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${category}/${image}`} alt="Image of clothing item" />
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="thumbnail-bar">
                {images &&
                    images.map((img, i) => {
                        return (
                            <Image 
                                onClick={() => handleThumbnailClicked(img, i)} 
                                key={i} 
                                className={`thumbnail ${img === image ? "selected" : "not-selected"}`} 
                                width={76} 
                                height={101} 
                                src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/${category}/${img}`} 
                                alt="Thumbnail of clothing item" 
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
