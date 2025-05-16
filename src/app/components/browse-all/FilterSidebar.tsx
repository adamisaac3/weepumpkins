'use client'
import {useState, useEffect, Dispatch} from 'react'

export default function Component({filters, setFilters} : {filters: {category: string, subcategory: string, minPrice: string, maxPrice: string}, setFilters: Dispatch<React.SetStateAction<{category: string, subcategory: string, minPrice: string, maxPrice: string}>>}){

    type Category = {cat_id: number, subcats: {subcat_id: number, subcat_name: string}[]}

    const [categoryMap, setCategoryMap] = useState<Record<string, Category>>()
    const [categories, setCategories] = useState<{cat_name: string, cat_id: number}[]>([]);
    const [subcategories, setSubcategories] = useState<{subcat_id: number, subcat_name: string}[]>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/get-sidebar-content');
            const data = await response.json();

            if(response.ok){
                const categories: Record<string, Category> = {}
                const cats: Array<{cat_name: string, cat_id: number}> = []
                data.forEach((row: {categoryname: string, subcategoryname: string, categoryid: number, subcategoryid: number}) => {

                    if(!categories[row.categoryname]){
                        categories[row.categoryname] = {
                            cat_id: row.categoryid,
                            subcats: []
                        }

                        if(row.subcategoryid){
                            categories[row.categoryname].subcats.push({
                                subcat_id: row.subcategoryid,
                                subcat_name: row.subcategoryname
                            })
                        }

                        cats.push({cat_name: row.categoryname, cat_id: row.categoryid});
                    }
                    else if(row.subcategoryid){
                        categories[row.categoryname].subcats.push({subcat_id: row.subcategoryid, subcat_name: row.subcategoryname});
                    }
                })

                setCategories(cats);
                setCategoryMap(categories);
            }
        }

        fetchData();
    }, [])


    function handleCategoryChange(select: string){
        
        setFilters({...filters, category: select})

        if(categoryMap && categoryMap[select].subcats){
            setSubcategories(categoryMap[select].subcats)
        }
        else{
            setSubcategories([]);
        }
    }

    function handleSubcategoryChange(select: string){
        setFilters({...filters, subcategory: select})
    }

    return (
        <aside className="filter-sidebar">

            <h2>Filters</h2>

            <select onChange={(e) => handleCategoryChange(e.target.value)}>
                <option value="">All Categories</option>
                {categories && 
                    categories.map((c) => {
                        return(
                            <option key={c.cat_id} value={c.cat_name}>{c.cat_name}</option>
                        )
                    })
                }
            </select>

            <select onChange={(e) => handleSubcategoryChange(e.target.value)}>
                <option value="">All Subcategories</option>
                {subcategories && 
                    subcategories.map((s) => {
                        return (
                            <option key={s.subcat_id} value={s.subcat_name}>{s.subcat_name}</option>
                        )
                    })
                }
            </select>

            <label htmlFor="minPrice">MinPrice: </label>
            <input type="number" name="minPrice" min='0' max="1000000" defaultValue="0"></input>

            <label htmlFor="maxPrice">MaxPrice: </label>
            <input type="number" name="maxPrice" min="0" max="1000000" defaultValue="100000"></input>

        </aside>
    )
}
