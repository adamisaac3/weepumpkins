'use client'
import {SetStateAction, useState, Dispatch} from 'react'
import ItemGrid from '../multi-use/ItemGrid'
import FilterSidebar from './FilterSidebar'

export default function Component({setProductCount} : {setProductCount: Dispatch<SetStateAction<number | undefined>>}) {
    const [filters, setFilters] = useState({category: '', subcategory: '', minPrice: '', maxPrice: ''})
    
    return(
        <div className="browse-all-div">
            <FilterSidebar filters={filters} setFilters={setFilters} />
            <ItemGrid filters={filters} />
        </div>
    )
}
