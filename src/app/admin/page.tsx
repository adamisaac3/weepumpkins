import { AddItemToDB } from "./actions"

export default function AdminPage() {
    return (
        <>
        
            <div>
            <h1>Admin Page</h1>
            <p>This is the admin page.</p>
            <p>Only accessible to users with the 'admin' role.</p>
            </div>


            <div>
                <h1>Add new item</h1>
                <NewItemForm />
            </div>
        </>

)
}


function NewItemForm(){
    
    
    return(
        <>
            <form encType="multipart/form-data">
                <label htmlFor="name">Product Name(Color Scheme/Unique identifier): </label>
                <input name="name" required></input>

                <label htmlFor="category">Choose category: </label>
                <select name="category" required>
                    <option value="Bags">Bags</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Banner">Banner</option>
                    <option value="Pouch">Pouch</option>
                    <option value="Makeup Bag">Makeup Bag</option>
                </select>

                <label htmlFor="subcategory">Choose subcategory: </label>
                <input name="subcategory" required></input>

                <label htmlFor="description">Description: </label>
                <input name="description" required></input>   

                <label htmlFor="price">Custom price: </label>
                <input name="price" type="number" step="0.01" required></input>

                <label htmlFor="images">Choose images: </label>
                <input name="images" type="file" multiple required></input>    

                <button formAction={AddItemToDB}>Submits</button>         
            </form>
        </>
    )
}