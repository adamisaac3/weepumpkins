'use client'
import React, {useState, useEffect} from 'react'

export default function AddItemShell(){
    type Item = {cat_name: string, cat_desc: string, cat_dim: string, cat_id: number, subcategories: {subcat_desc: string, subcat_dimensions: string, subcat_id: number, subcat_name: string}[]}
    const [categoryMap, setCategoryMap] = useState<Record<number, Item>>();
    const [subcategories, setSubcategories] = useState<{subcat_desc: string, subcat_dimensions: string, subcat_id: number, subcat_name: string}[]>(); 
    const [categories, setCategories] = useState<{cat_name: string, cat_id: number}[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [defaultDescription, setDefaultDescription] = useState<string>('');
    const [defaultDimensions, setDefaultDimenensions] = useState<string>('');

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/get-cats-subcats');

            const query = await response.json();
            if(response.ok){

                const categoryMap: Record<number, Item> = {};
                const cats: Array<{cat_name: string, cat_id: number}> = []
                
                query.forEach((row: {categoryname: string, category_desc: string, category_dimensions: string, category_id: number, subcategory_desc: string, subcategory_dimensions: string, subcategory_id: number, subcategoryname: string}) => {
                    
                    if(!categoryMap[row.category_id]){
                        categoryMap[row.category_id] = {
                            cat_id: row.category_id,
                            cat_name: row.categoryname, 
                            cat_desc: row.category_desc,
                            cat_dim: row.category_dimensions,
                            subcategories: []
                        }
                        cats.push({cat_name: row.categoryname, cat_id: row.category_id});
                    }
                    
                    if(row.subcategory_id){
                        categoryMap[row.category_id].subcategories.push({
                            subcat_id: row.subcategory_id,
                            subcat_name: row.subcategoryname,
                            subcat_desc: row.subcategory_desc,
                            subcat_dimensions: row.subcategory_dimensions
                        })
                    }
                })
                setCategories(cats);
                setCategoryMap(categoryMap);
            }
        }

        fetchItems();
    }, [])

    function handleCategoryChange(categoryId: number): void {
        
        setSelectedCategory(categoryId);
        
        if (categoryMap && categoryMap[categoryId]) {
            setSubcategories(categoryMap[categoryId].subcategories || []);
            
            const subcats = categoryMap[categoryId].subcategories
            
            if(subcats && subcats.length == 0){
                setDefaultDescription(categoryMap[categoryId].cat_desc || "");
                setDefaultDimenensions(categoryMap[categoryId].cat_dim || "");
            }
            else{
                setDefaultDescription('');
                setDefaultDimenensions('');
            }
                
        } else {
            setSubcategories([]);
        }
    }

    function handleSubcategoryChange(subcategoryId: number){
        if(selectedCategory && categoryMap){
            const subcat = categoryMap[selectedCategory].subcategories.find((sc) => sc.subcat_id === subcategoryId);
            setDefaultDescription(subcat?.subcat_desc || "");
            setDefaultDimenensions(subcat?.subcat_dimensions || "");
        }
        else{
            setDefaultDescription("");
            setDefaultDimenensions("");
        }
    }

    return (
         
        <form className="item-form" method="POST" action="/api/add-item" encType="multipart/form-data">
            <label htmlFor="name">Enter Item Name: </label>
            <input name="name" required></input>

            <select name="category" onChange={(e) => handleCategoryChange(parseInt(e.target.value))} required>
                <option value="" hidden>Select Category</option>
                {categories &&
                    categories.map((c) => {
                        return (
                            <option key={c.cat_id} value={c.cat_id}>
                                {c.cat_name}
                            </option>)
                    })
                }
            </select>

            <select name="subcategory" onChange={(e) => {
                handleSubcategoryChange(parseInt(e.target.value))
            }}>
                <option value="" hidden>Select Subcategory</option>
                {subcategories &&
                    subcategories.map(s => {
                        return (
                            <option key={s.subcat_id} value={s.subcat_id}>
                                {s.subcat_name}
                            </option>
                        )
                    })
                }
            </select>

            <label htmlFor="description">Description: </label>
            <textarea name="description" value={defaultDescription} onChange={(e) => setDefaultDescription(e.target.value)}required></textarea>

            <label htmlFor="dimensions">Dimensions: </label>
            <textarea name="dimensions" value={defaultDimensions} onChange={(e) => setDefaultDimenensions(e.target.value)} required></textarea>

            <label htmlFor="price">Price: </label>
            <input name="price" type="number" required></input>

            <label htmlFor="thumbnail">Thumbnail:  (Front image of clothing, display image for other items)</label>
            <input name="thumbnail" type="file" required></input>

            <label htmlFor="additional">Additional Images (back image of clothing, other images of products)</label>
            <input name="additional" type="file" multiple></input>

            <button type="submit">Submit</button>
        </form>
        
    )
}