'use client'
import './page.css';

import {useState, useEffect} from 'react';

export default function Page(){

    const [categories, setCategories] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/get-categories')
            
            const categories = await response.json();

            if(response.ok){
                setCategories(categories);
            }
        }
        
        fetchCategories();
    }, [])

    console.log(categories);

    return (
        <>
            <main>
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
                            {categories && 
                                categories.map((cat) => {
                                    return(
                                        <option key={cat.id}>{cat.name}</option>
                                    )
                                })
                            }
                        </select>
                        
                        <label htmlFor="subcategory">Subcategory Name: </label>
                        <input name="subcategory" className="subcategory-input"></input>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </main>
        </>
    )
}
