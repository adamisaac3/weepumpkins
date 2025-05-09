'use client'
import React, {JSX, useState, useEffect} from 'react'
import './page.css'

export default function NewItemForm(){

    const [categoryMap, setCategoryMap] = useState<Record<number, any> | null>(null);
    const [subcategories, setSubcategories] = useState<any[]>([]); 
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [defaultDescription, setDefaultDescription] = useState('');
    const [defaultDimensions, setDefaultDimenensions] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch('/api/get-cats-subcats');

            const query = await response.json();
            if(response.ok){

                const categoryMap: Record<number, any> = {};
                let cats: Array<{categoryname: string, category_id: number}> = []
                
                query.forEach((row: any) => {
                    const {categoryname, category_desc, category_dimensions, category_id, 
                        subcategory_desc, subcategory_dimensions, subcategory_id, subcategoryname} = row;
                    
                    if(!categoryMap[category_id]){
                        categoryMap[category_id] = {
                            category_id,
                            categoryname, 
                            category_desc,
                            category_dimensions,
                            subcategories: []
                        }
                        cats.push({categoryname, category_id});
                    }
                    
                    if(subcategory_id){
                        categoryMap[category_id].subcategories.push({
                            subcategory_id,
                            subcategoryname,
                            subcategory_desc,
                            subcategory_dimensions
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
            
            let subcats = categoryMap[categoryId].subcategories
            
            if(subcats && subcats.length == 0){
                setDefaultDescription(categoryMap[categoryId].category_desc || "");
                setDefaultDimenensions(categoryMap[categoryId].category_dimensions || "");
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
            const subcat = categoryMap[selectedCategory].subcategories.find((sc: any) => sc.subcategory_id === subcategoryId);
            setDefaultDescription(subcat?.subcategory_desc || "");
            setDefaultDimenensions(subcat?.subcategory_dimensions || "");
        }
        else{
            setDefaultDescription("");
            setDefaultDimenensions("");
        }
    }

    return (
        <main>
            <h1>Add New Item</h1>
            <form className="item-form" method="POST" action="/api/add-item" encType="multipart/form-data">
                <label htmlFor="name">Enter Item Name: </label>
                <input name="name" required></input>

                <select name="category" onChange={(e) => handleCategoryChange(parseInt(e.target.value))} required>
                    <option value="" hidden>Select Category</option>
                    {categories &&
                        categories.map((c) => {
                            return (
                                <option key={c.category_id} value={c.category_id}>
                                    {c.categoryname}
                                </option>)
                        })
                    }
                </select>

                <select name="subcategory" onChange={(e) => {
                    handleSubcategoryChange(parseInt(e.target.value))
                }} required>
                    <option value="" hidden>Select Subcategory</option>
                    {subcategories &&
                        subcategories.map(s => {
                            return (
                                <option key={s.subcategory_id} value={s.subcategory_id}>
                                    {s.subcategoryname}
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
        </main>
    )
}
   