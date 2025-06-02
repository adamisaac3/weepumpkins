'use client'
import { useState, useEffect } from "react"
import { useCheckoutStore } from "@/app/stores/useCheckoutStore"

export default function initCheckoutStore(){
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const unsub = useCheckoutStore.persist.onHydrate(() => {
            setHydrated(true);
        })
    
        if(useCheckoutStore.persist.hasHydrated()){
            setHydrated(true);
        }

        return unsub?.();
    }, []);
}