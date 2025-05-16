'use client'
import {useState, useEffect} from 'react'
import {format, parse} from 'date-fns'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Event from './Event'


export default function EventPageShell() {


    const [navOpen, setNavOpen] = useState(false);
    const [past, setPast] = useState<any[] | null>(null);
    const [future, setFuture] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('/api/get-all-events');
            const events: {id: number, name: string, address: string, state: string, start_date: string, end_date: string, start_time: string, end_time: string, thumbnail: string, booth: string, city: string, event_url: string}[] = await response.json();
            console.log(events);

            if (response.ok) {
                setPast(
                    events.filter((e) => Date.parse(e.end_date) < Date.now())
                        .map((e) => ({
                            ...e,
                            start_date: format(e.start_date, 'MMMM do'),
                            end_date: format(e.end_date, 'MMMM do yyyy'),
                            start_time: formatTime(e.start_time),
                            end_time: formatTime(e.end_time),
                        }))
                );

                setFuture(
                    events.filter((e) => Date.parse(e.end_date) >= Date.now())
                        .map((e) => ({
                            ...e,
                            start_date: format(e.start_date, 'MMMM do'),
                            end_date: format(e.end_date, 'MMMM do yyyy'),
                            start_time: formatTime(e.start_time),
                            end_time: formatTime(e.end_time),
                        }))
                );

            }
        };

        fetchEvents();
    }, [])

    return (
        <>
            <Header navOpen={navOpen} setNavOpen={setNavOpen}/>
            <main className={`${navOpen ? "main-content-blurred" : ""}`}>
                <div className="future-events-div">
                    <h2 className="event-headers">Future Events</h2>
                    {future &&
                        future.map((e) => {
                            return (
                                <Event key={e.id} thumbnail={e.thumbnail} name={e.name} address={e.address} city={e.city} state={e.state} event_url={e.event_url} start_date={e.start_date} end_date={e.end_date} start_time={e.start_time} end_time={e.end_time} booth={e.booth} />
                            )
                        })
                    }
                </div>
                <div className="past-events-div">
                    <h2 className="event-headers">Past Events</h2>
                    {past &&
                        past.map((e) => {
                            return (
                                <Event key={e.id} thumbnail={e.thumbnail} name={e.name} address={e.address} city={e.city} state={e.state} event_url={e.event_url} start_date={e.start_date} end_date={e.end_date} start_time={e.start_time} end_time={e.end_time} booth={e.booth} />
                            )
                        })
                    }
                </div>
            </main>
            <Footer navOpen={navOpen}/>
        </>
    )

}

function formatTime(timeString: string) {
    const parsed = parse(timeString, 'HH:mm', new Date());
    return format(parsed, 'h:mm a')
}
