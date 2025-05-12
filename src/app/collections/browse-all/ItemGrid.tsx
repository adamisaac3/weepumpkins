'use client'
import {useState, useEffect} from 'react'


export default function Component({filters} : {filters: { category: string, subcategory: string, minPrice: string, maxPrice: string }}){

    const [items, setItems] = useState([])
    const [images, setImages] = useState([])

    console.log(filters);
    useEffect(() => {
        const fetchItems = async () => {
            try{
                const response = await fetch('/api/items', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        category: filters.category !== "" ? filters.category : null,
                        subcategory: filters.subcategory !== "" ? filters.subcategory : null,
                        minPrice: filters.minPrice !== "" ? filters.minPrice : null,
                        maxPrice: filters.maxPrice !== "" ? filters.maxPrice : null,
                    }),
                })
                const {items, images} = await response.json()

                if(response.ok){
                    setItems(items)
                    setImages(images)
                }
            }
            catch(error){
                console.log((error as Error).message)
            }
        }

        fetchItems();
    }, [filters])

    return(
        <h1>hello</h1>
    )

}