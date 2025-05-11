'use client'
import {useEffect, useState} from 'react'

export default function Component({category} : {category: string}){
    const [items, setItems] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        const getItems = async () => {
            try{
                const response = await fetch(`/api/get-items-from-category?category=${category}`)

                const {data, images} = await response.json();

                if(response.ok){
                    setItems(data);
                    setImages(images);
                }
            }
            catch(err){
                console.log((err as Error).message);
            }
        }

        getItems();
    }, [])
    
    return (
        <h1>Shop All {category}</h1>


    )
}