'use client'
import React, {JSX, useState} from 'react'
import {products} from '../lib/products'

export default function NewItemForm(){
    
    const [subcategories, setSubcategories] = useState<JSX.Element | null>(null);
    const [description, setDescription] = useState<JSX.Element | null>(null);
    const [disclaimers, setDisclaimers] = useState<JSX.Element | null>(null);
    const [dimensions, setDimensions] = useState<JSX.Element | null>(null);
    const [price, setPrice] = useState<JSX.Element | null>(null);


    function getDimensions(subcategory: string){
        const product = products.find((p) => p.subcategory === subcategory)

        if(product !== undefined){
            setDimensions(
                <>
                    <label htmlFor="dimensions">Dimensions: </label>
                    <input name="dimensions" className="description-input" defaultValue={product.dimensions} required></input> 
                </>
            )
        }
    }

    function getDisclaimers(subcategory: string){
        const product = products.find((p) => p.subcategory === subcategory)

        if(product !== undefined){
            setDisclaimers(
                <>
                    <label htmlFor="disclaimers">Disclaimers: </label>
                    <input name="disclaimers" className="description-input" defaultValue={product.disclaimers} required></input> 
                </>
            )
        }
    }

    function getPrice(subcategory: string){
        const product = products.find((p) => p.subcategory === subcategory)

        if(product !== undefined){
            setPrice(
                <>
                    <label htmlFor="price">Custom price: </label>
                    <input name="price" type="number" step="0.01" defaultValue={product.price} required></input>
                </>
            )
        }
    }

    function getDescription(subcategory: string){
        const product = products.find((p) => p.subcategory === subcategory)

        if(product !== undefined){
            setDescription(
                <>
                    <label htmlFor="description">Description: </label>
                    <input name="description" className="description-input" defaultValue={product.description} required></input> 
                </>
            )
        }
    }

    function getSubcategories(category: string){
        
        console.log(category);
        let i = 0

        let seen = new Set();
        
        const subcategories = products.filter((c) =>{ 
            if(c.category == category && !seen.has(c.subcategory)){
                seen.add(c.subcategory);
                return c.subcategory
            }
        }).map((v) => {
            i++;
            return <option key={i} value={v.subcategory}>{v.subcategory}</option>
        })
        
        console.log(subcategories)
        if(subcategories.length > 0){
            setSubcategories(
            <>
                <label htmlFor="subcategories">Choose subcategory</label>
                <select name="subcategory" defaultValue="" required onChange={(e) => {
                    getDescription(e.target.value)
                    getPrice(e.target.value);
                    getDisclaimers(e.target.value);
                    getDimensions(e.target.value);
                }}>
                    <option value="" disabled hidden></option>
                    {subcategories}
                </select>
            </> 
            );
        }
        else{
            console.log('inside else statement')
            setSubcategories(
            <>
                <label htmlFor="subcategories">Choose subcategory</label>
                <select name="subcategory" defaultValue={category} required>
                    <option value={category} disabled hidden>{category}</option>
                </select>
            </>
            )
        }
    }

    
    return(
        <>
            <form action="/api/add-item" method="POST" encType="multipart/form-data" className="admin-addItem-form">
                <label htmlFor="name">Product Name(Color Scheme/Unique identifier): </label>
                <input name="name" required></input>

                <label htmlFor="category">Choose category: </label>
                <select name="category" defaultValue="" required onChange={(e) => getSubcategories(e.target.value)}>
                    <option value="" disabled hidden></option>
                    <option value="Bags">Bags</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Banner">Banner</option>
                    <option value="Pouch">Pouch</option>
                    <option value="Makeup Bag">Makeup Bag</option>
                </select>

                {subcategories} 
                {description} 
                {disclaimers}
                {dimensions}
                {price}

                <label htmlFor="images">Choose images: </label>
                <input name="images" type="file" multiple required></input>    

                <button type="submit">Submits</button>         
            </form>
        </>
    )
}