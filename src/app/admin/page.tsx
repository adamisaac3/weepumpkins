'use client'
import "./page.css"
import {useState, JSX} from 'react'
import React from 'react'

export default function AdminPage() {
    return (
        <main> 
            <h1 className="admin-header">Admin Page</h1>
            <p>This is the admin page.</p>
            <p>Only accessible to users with the 'admin' role.</p>
            <a href="/admin/add-category">Add category/subcategory</a>
            <a href="/admin/add-event">Add Event</a>
            <a href="/admin/add-item">Add Item</a>
        </main>
    )
}
