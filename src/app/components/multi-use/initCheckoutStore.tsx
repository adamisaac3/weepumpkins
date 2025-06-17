'use client'
import { useState, useEffect } from "react"
import { useCheckoutStore } from "@/app/stores/useCheckoutStore"

export default function useInitCheckoutStore(){
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const unsub = useCheckoutStore.persist.onHydrate(() => {
            setHydrated(true);
        })
    
        if(useCheckoutStore.persist.hasHydrated()){
            setHydrated(true);
        }

        if(hydrated){
            return
        }

        return unsub?.();
    }, [hydrated]);
}