import AnimatedBorderBox from "./components/multi-use/AnimatedBorder"
export default function NotFound(){
    
    const four = <><h1 style={{paddingRight: '1rem'}}>404</h1></>
    

    return(
        <div className="not-found">
                <AnimatedBorderBox child={four}/>
                <p className="message">This page could not be found.</p>
        </div>
    )
}