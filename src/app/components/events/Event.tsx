import Image from "next/image"


export default function Event({name, address, city, state, event_url, start_date, end_date, start_time, end_time, booth, thumbnail} 
    :          {name: string, address: string, city: string, state: string, event_url: string, start_date: string, end_date: string, start_time: string, end_time: string, booth: string, thumbnail: string})
    {
        return (
            <div className="event-div">
                <Image className="event-thumbnail" width={100} height={100} src={`https://jejfpctlmwnzbjejiljo.supabase.co/storage/v1/object/public/files/Events/${thumbnail}`} alt="Recent Event Thumbnail" />
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
