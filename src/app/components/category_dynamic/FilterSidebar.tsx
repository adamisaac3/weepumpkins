'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import PriceSlider from "../multi-use/PriceSlider"
type Filter = {
    category: string,
    subcategory: string,
    minPrice: string,
    maxPrice: string,
    search: string
}

type Subcategory = {
    subcat_name: string,
    subcat_id: number
}

export default function Component({filters, setFilters, category, maxPrice} : {filters: Filter, setFilters: Dispatch<SetStateAction<Filter>>, category: string, maxPrice: number}){
    const [subcategories, setSubcategories] = useState<Subcategory[]>();

    useEffect(() => {
        const fetchSubcats = async () => {
            const response = await fetch(`/api/get-subcategories?category=${encodeURIComponent(category)}`)
            
            const data: {subcategory: string, subcategory_id: number}[] = await response.json();
            
            if(response.ok){
                setSubcategories(data.map((row) => ({subcat_name: row.subcategory, subcat_id: row.subcategory_id})));
            }
        }

        fetchSubcats();
    }, [category])

    function handleSubcat(select: string){
        setFilters({...filters, subcategory: select})
    }


    return (
        <aside className="filter-sidebar">
            <h2>Filters</h2>
            <select onChange={(e) => handleSubcat(e.target.value)} className="subcat-select">
                <option value="">All Subcategories</option>
                {subcategories && 
                    subcategories.map((row) => {
                        return(
                            <option key={row.subcat_id} value={row.subcat_name}>{row.subcat_name}</option>
                        )
                    })
                }
            </select>
            <PriceSlider maxPrice={maxPrice} />
        </aside>
    )

}