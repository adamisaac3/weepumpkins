'use client'
import React, {JSX, useState} from 'react'
import { AddItemToDB } from '../admin/actions';
import {products} from '../lib/products'

export default function NewItemForm(){
    
    const [subcategories, setSubcategories] = useState<JSX.Element | null>(null);
    console.log('form rendered');

    function getSubcategories(category: string){
        
        console.log(category);
        const subcategories = products.map((c) =>{ 
            if(c.category == category ){
                return <option key={c.subcategory} value={c.subcategory}>{c.subcategory}</option>
            }
        })
        
        
        if(subcategories.length > 0){
            setSubcategories(
            <>
                <label htmlFor="subcategories">Choose subcategory</label>
                <select name="subcategory" required>
                    {subcategories}
                </select>
            </> 
            );
        }
        else{
            setSubcategories(null);
        }
    }

    
    return(
        <>
            <form encType="multipart/form-data" className="admin-addItem-form">
                <label htmlFor="name">Product Name(Color Scheme/Unique identifier): </label>
                <input name="name" required></input>

                <label htmlFor="category">Choose category: </label>
                <select name="category" required onChange={(e) => console.log("onChange triggered", e.target.value)}>
                    <option value="Bags">Bags</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Banner">Banner</option>
                    <option value="Pouch">Pouch</option>
                    <option value="Makeup Bag">Makeup Bag</option>
                </select>
                {subcategories}
                

                <label htmlFor="description">Description: </label>
                <input name="description" className="description-input" required></input>   

                <label htmlFor="price">Custom price: </label>
                <input name="price" type="number" step="0.01" required></input>

                <label htmlFor="images">Choose images: </label>
                <input name="images" type="file" multiple required></input>    

                <button formAction={AddItemToDB}>Submits</button>         
            </form>
        </>
    )
}