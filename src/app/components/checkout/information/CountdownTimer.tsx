'use client'
import { differenceInSeconds, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Countdown({timestamp} : {timestamp: string}){
    const [seconds, setSeconds] = useState<number>(() => 
        differenceInSeconds(parseISO(timestamp), new Date())
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const now  = Date.now()
            const secondsLeft = differenceInSeconds(parseISO(timestamp), now);

            setSeconds(secondsLeft);

            if(secondsLeft <= 0){
                clearInterval(interval);
            }
        }, 100)
        
        return () => clearInterval(interval)
    }, [timestamp])

    if(seconds <= 0){
        const router = useRouter()
        router.push('/checkout/information')
    }
    
    const minutes = Math.floor(seconds/ 60);
    const secs = minutes % 60;

    return(
        <div className="time-remaining">
            <p>Items reserved for: {minutes}:{secs.toString().padStart(2, '0')}</p>
        </div>
    )
}