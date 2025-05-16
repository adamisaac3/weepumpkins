'use client'
import {useState, useEffect} from 'react'

export default function Component({filters, setFilters} : {filters: any, setFilters: (filters: any) => void}){

    const [categoryMap, setCategoryMap] = useState<Record<string, any> | null>(null)
    const [categories, setCategories] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [subcategories, setSubcategories] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/get-sidebar-content');
            const data = await response.json();

            if(response.ok){
                let categories: Record<string, any> = {}
                let cats: Array<{categoryname: string, categoryid: number}> = []
                data.forEach((row:any) => {
                    const {categoryname, subcategoryname, categoryid, subcategoryid} = row

                    if(!categories[categoryname]){
                        categories[categoryname] = {
                            categoryid,
                            subcategories: []
                        }

                        if(subcategoryid){
                            categories[categoryname].subcategories.push({
                                subcategoryid,
                                subcategoryname
                            })
                        }

                        cats.push({categoryname, categoryid});
                    }
                    else if(subcategoryid){
                        categories[categoryname].subcategories.push({subcategoryid, subcategoryname});
                    }
                })

                setCategories(cats);
                setCategoryMap(categories);
            }
        }

        fetchData();
    }, [])


    function handleCategoryChange(select: string){
        if(categoryMap)
            setSelectedCategory(select)

        setFilters({...filters, category: select})

        if(categoryMap && categoryMap[select].subcategories){
            setSubcategories(categoryMap[select].subcategories)
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
                    categories.map((c: any) => {
                        return(
                            <option key={c.categoryid} value={c.categoryname}>{c.categoryname}</option>
                        )
                    })
                }
            </select>

            <select onChange={(e) => handleSubcategoryChange(e.target.value)}>
                <option value="">All Subcategories</option>
                {subcategories && 
                    subcategories.map((s: any) => {
                        return (
                            <option key={s.subcategoryid} value={s.subcategoryname}>{s.subcategoryname}</option>
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
