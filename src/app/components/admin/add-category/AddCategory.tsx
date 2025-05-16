'use client'
import {useState, useEffect} from 'react';


export default function Component(){

    type Item = {cat_id: number, cat_name: string, default_desc: string, default_dim: string}
    const [categories, setCategories] = useState<Item[]>();

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/get-categories')
            
            const data = await response.json();
    
            if(response.ok){
                const category = data.map((item: {id: number, name: string, default_description: string, default_dimensions: string}) => {
                    return {cat_id: item.id, 
                            cat_name: item.name, 
                            default_desc: item.default_description, 
                            default_dim: item.default_dimensions
                        }
                })

                setCategories(category);
            }
        }
        
        fetchCategories();
    }, [])

    console.log(categories);

    return (
        <>
            <div className="add-category">
                <h1>Add new category</h1>
                <form className="category-form" method="POST" action="/api/add-category">
                    <label htmlFor="category">Enter Category Name: </label>
                    <input name="category"></input>
                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className="add-subcategory">
                <h1>Add new subcategory</h1>
                <form className="subcategory-form" method="POST" action="/api/add-subcategory">
                    <label htmlFor="category">Choose category: </label>
                    <select name="category">
                        <option value="" hidden>Choose category:</option>
                        {categories &&
                            categories.map((cat) => {
                                return (
                                    <option key={cat.cat_id}>{cat.cat_name}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor="subcategory">Subcategory Name: </label>
                    <input name="subcategory" className="subcategory-input"></input>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}
