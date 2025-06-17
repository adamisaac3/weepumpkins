'use client'
import {useState} from 'react'
import ItemGrid from '../multi-use/ItemGrid'
import FilterSidebar from './FilterSidebar'

export default function Component() {
    const [filters, setFilters] = useState({category: '', subcategory: '', minPrice: '', maxPrice: '', search: ''})
    const [maxPrice, setMaxPrice] = useState(0)
    return(
        <div className="browse-all-div">
            <FilterSidebar maxPrice={maxPrice} filters={filters} setFilters={setFilters} />
            <ItemGrid setMaxPrice={setMaxPrice} filters={filters} />
        </div>
    )
}
