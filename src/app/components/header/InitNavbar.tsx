'use client'
import {useEffect, useState} from 'react'
import { useNavbarStore } from '@/app/stores/useNavbarStore'
export default function useInitNavbar(){
    const {fetched, fetchNavState} = useNavbarStore();
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        const unsub = useNavbarStore.persist.onHydrate(() => {
            setHydrated(true)
        })
    
        if(useNavbarStore.persist.hasHydrated()){
            setHydrated(true);
        }
    
        
        return () => unsub?.();
    }, [])

    useEffect(() => {
        if(hydrated && !fetched){
            fetchNavState();
        }
    }, [fetched, hydrated, fetchNavState])
}