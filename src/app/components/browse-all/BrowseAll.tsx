'use client'
import {useState} from 'react'
import ItemGrid from './ItemGrid'
import FilterSidebar from './FilterSidebar'

export default function Component(){
    const [filters, setFilters] = useState({category: '', subcategory: '', minPrice: '', maxPrice: ''})

    return(
        <div className="browse-all-div">
            <FilterSidebar filters={filters} setFilters={setFilters} />
            <ItemGrid filters={filters} />
        </div>
    )
}
