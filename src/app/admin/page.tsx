'use client'
import "./page.css"
import {useState, JSX} from 'react'
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

                <div>
                    <h1>Add new Event</h1>
                    <NewEventForm />
                </div>


            </main>
        </>

)
}

function NewEventForm(){
    const [endDate, setEndDate] = useState<JSX.Element | null>(null);

    function getEndDate(start: string){
        setEndDate(
            <>
                <label htmlFor="event-end-date">End Date: </label>
                <input type="date" name="event-end-date" required defaultValue={start}>{start}</input>
            </>
        )
    }

    return(
        <>
            <form className="event-form" action="/api/add-event" method="POST" encType="multipart/form-data">
                <label htmlFor="event-name">Event Name: </label>
                <input name="event-name" required></input>

                <label htmlFor="event-url">Event Website URL: </label>
                <input name="event-url" type="url"></input>

                <label htmlFor="event-address">Address: </label>
                <input name="event-address" required></input>

                <label htmlFor="event-city">City: </label>
                <input name="event-city" required></input>

                <label htmlFor="event-state">State: </label>
                <input name="event-state" required></input>

                <label htmlFor="event-start-date">Start Date: </label>
                <input type="date" name="event-start-date" required></input>

                <label htmlFor="event-end-date">End Date: </label>
                <input type="date" name="event-end-date" required></input>

                <label htmlFor="event-start-time">Usual Daily Start Time: </label>
                <input type="time" name="event-start-time" required></input>

                <label htmlFor="event-end-time">Usual Daily End Time: </label>
                <input type="time" name="event-end-time" required></input>

                <label htmlFor="event-booth-number">Booth Identifier: </label>
                <input name="event-booth-number"></input>

                <label htmlFor="event-thumbnail">Event Thumbnail: </label>
                <input type="file" name="event-thumbnail"></input>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}