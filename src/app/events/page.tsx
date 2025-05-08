'use client'
import {Header} from '../index/page'
import Footer from '../components/Footer'
import {useState, useEffect} from 'react'
import {format, parse} from 'date-fns'
import './page.css'


export default function EventsPage(){

    const [navDrawerOpen, setnavDrawerOpen] = useState(false);
    const handleNavClicked = () => setnavDrawerOpen(!navDrawerOpen);
    const [past, setPast] = useState<any[] | null>(null);
    const [future, setFuture] = useState<any[] | null>(null);
    
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('/api/get-all-events');
            const events = await response.json();
            console.log(events);

            if (response.ok) {
                setPast(
                    events.filter((e: any) => Date.parse(e.start_date) < Date.now())
                    .map((e: any) => ({
                        ...e,
                        start_date: format(e.start_date, 'MMMM do'),
                        end_date: format(e.end_date, 'MMMM do yyyy'),
                        start_time: formatTime(e.start_time),
                        end_time: formatTime(e.end_time),
                      }))
                  );
                
                setFuture(
                    events.filter((e: any) => Date.parse(e.start_date) >= Date.now())
                    .map((e: any) => ({
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

    return(
        <>
            <Header navOpen={navDrawerOpen} navClicked={handleNavClicked}/>
            <main>
                <div className="future-events-div">
                    <h2 className="event-headers">Future Events</h2>
                    {future &&
                        future.map((e) => {
                            return(
                                <Event key={e.id} thumbnail={e.thumbnail} name={e.name} address={e.address} city={e.city} state={e.state} event_url={e.event_url} start_date={e.start_date} end_date={e.end_date} start_time={e.start_time} end_time={e.end_time} booth={e.booth} />
                        )})
                    }
                </div>
                <div className="past-events-div">
                    <h2 className="event-headers">Past Events</h2>
                    {past &&
                        past.map((e) => {
                            return(
                                <Event key={e.id} thumbnail={e.thumbnail} name={e.name} address={e.address} city={e.city} state={e.state} event_url={e.event_url} start_date={e.start_date} end_date={e.end_date} start_time={e.start_time} end_time={e.end_time} booth={e.booth} />
                            )
                        })
                    }
                </div>
            </main>
            <Footer />
        </>
    )
    
}

function Event({name, address, city, state, event_url, start_date, end_date, start_time, end_time, booth, thumbnail} 
    :          {name: string, address: string, city: string, state: string, event_url: string, start_date: string, end_date: string, start_time: string, end_time: string, booth: string, thumbnail: string})
    {
        return (
            <div className="event-div">
                <img className="event-thumbnail" width={100} height={100} src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/Events/${thumbnail}`} alt="Recent Event Thumbnail" />
                <div className="event-info">
                    <div className="event-info-top">
                        <a href={event_url}>
                            <h2>{name}</h2>
                        </a>
                        <p>Booth: {booth}</p>
                    </div>
                    <div className="event-info-middle">
                        <p>{start_time} - {end_time}</p>
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000" />
                        </svg>
                        <p>{start_date} - {end_date}</p>

                    </div>
                    <div className="event-info-bottom">
                        <p>{address}</p>
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000" />
                        </svg>
                        <p>{city}</p>
                        <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000" />
                        </svg>
                        <p>{state}</p>
                    </div>
                </div>
            </div>
        )
    }

function formatTime(timeString: string){
    const parsed = parse(timeString, 'HH:mm', new Date());
    return format(parsed, 'h:mm a')
}