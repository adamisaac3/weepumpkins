'use client'
import { format, parse } from 'date-fns';
import {useState, useEffect} from 'react'

export default function RecentEventContainer(){
    
    function formatTime(timeString: string){
        const parsed = parse(timeString, 'HH:mm', new Date());
        return format(parsed, 'h:mm a')
    }
    
    const [error, setError] = useState<string | null>(null);
    const [event, setEvent] = useState<any | null>(null);
    
    useEffect(() => {
        const fetchRecentEvent = async () => {
            try{
                const response = await fetch('/api/get-recent-event');
                
                const {event} = await response.json();

                if(response.ok){
                    setEvent(event[0]);
                }
                else{
                    setError(response.text.toString || "Something went wrong");
                }
            }
            catch(err){
                setError((err as Error).message);
            }
        }
        
        fetchRecentEvent();
    }, [])
    
    if(event){
        let start_date = format(event?.start_date, 'MMMM do');
        let end_date = format(event?.end_date, 'MMMM do yyyy')
        let start_time = formatTime(event?.start_time)
        let end_time = formatTime(event?.end_time)
        return (
            <>
                <div className="recent-event-div">
                    <img width={100} height={100} src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/Events/${event?.thumbnail}`} alt="Recent Event Thumbnail" />
                    <div className="recent-event-info">
                        <div className="recent-info-top">
                            <a href={event?.event_url}>
                                <h2>{event?.name}</h2>
                            </a>
                            <p>Booth: {event?.booth}</p>
                        </div>
                        <div className="recent-info-middle">
                            <p>{start_time} - {end_time}</p>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                            </svg>
                            <p>{start_date} - {end_date}</p>
                            
                        </div>
                        <div className="recent-info-bottom">
                            <p>{event?.address}</p>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                            </svg>
                            <p>{event?.city}</p>
                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z" fill="#000000"/>
                            </svg>
                            <p>{event?.state}</p>
                        </div>
                        <a href="/events" className="view-all-events-button">View All Events</a>
                    </div>
                </div>
            </>
        );
    }
    
}