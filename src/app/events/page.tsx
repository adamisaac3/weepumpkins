'use client'
import {Header} from '../index/page'
import {useState} from 'react'

export default function EventsPage(){

    const [navDrawerOpen, setnavDrawerOpen] = useState(false);
    const handleNavClicked = () => setnavDrawerOpen(!navDrawerOpen);
    
    
    return(
        <Header navOpen={false} navClicked={handleNavClicked}/>
    )
    
}

function EventsContainer(){
    
}