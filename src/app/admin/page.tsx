import "./page.css"
import NewItemForm from '../components/NewItemForm'
import React from 'react'

export default function AdminPage() {
    return (
        <>
            <main>
                <div>
                <h1 className="admin-header">Admin Page</h1>
                <p>This is the admin page.</p>
                <p>Only accessible to users with the 'admin' role.</p>
                </div>


                <div className="admin-newItem">
                    <h1>Add new item</h1>
                    <NewItemForm />
                </div>
            </main>
        </>

)
}