import "./page.css"

export default function AdminPage() {
    return (
        <main> 
            <h1 className="admin-header">Admin Page</h1>
            <p>This is the admin page.</p>
            <a href="/admin/add-category">Add category/subcategory</a>
            <a href="/admin/add-event">Add Event</a>
            <a href="/admin/add-item">Add Item</a>
        </main>
    )
}
